#!/usr/bin/env node
/**
 * Imports Aquavia Spa products (spas, swim spas, professional spas, accessories)
 * from https://aquaviaspa.com into src/data/imported/aquavia.json and
 * downloads resized photos into public/products/aquavia/<slug>/.
 *
 * Polite by design:
 *  - follows robots.txt (product pages and images only; no PDF attachments)
 *  - waits CRAWL_DELAY seconds between every request (their robots.txt asks 10 s)
 *  - caches HTML in .cache/ so re-runs don't re-fetch
 *  - skips images that already exist, so it can be stopped and resumed
 *
 * Usage:  node scripts/import-aquavia.mjs            (all products)
 *         node scripts/import-aquavia.mjs --limit 3  (first 3, for testing)
 *         node scripts/import-aquavia.mjs --offline  (rebuild JSON from cache only)
 *
 * Only use with the supplier's permission to reuse their content.
 */
import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = "https://aquaviaspa.com";
const SITEMAP = `${BASE}/en/sitemap/product/1.xml`;
const CRAWL_DELAY = 10_000;
const UA = "Mozilla/5.0 (compatible; catalogue-import)";
const CACHE = path.join(ROOT, ".cache/aquavia");
const IMG_DIR = path.join(ROOT, "public/products/aquavia");
const OUT = path.join(ROOT, "src/data/imported/aquavia.json");
const MAX_IMAGES = 6;

// Site section on aquaviaspa.com -> our collection name.
const SECTIONS = {
  "hot-tubs": "hot-tubs",
  "aurora-line": "hot-tubs",
  "mosaic-hot-tub": "hot-tubs",
  "city-line": "hot-tubs",
  swimspa: "swim-spas",
  "professional-spas": "professional-spas",
  accessories: "accessories",
};

// Aquavia's collections ("lines"), as listed on /content/todas-las-colecciones.
// Their page path -> our collection key (names live in dict.collections).
const LINES = {
  "exclusive-line": "exclusive-line",
  "premium-line": "premium-line",
  "spas-jacuzzis-aurora-line": "aurora-line",
  "aqualife-line": "aqualife-line",
  "city-line": "city-line",
  "built-in-line": "built-in-line",
  "cold-plunge-line": "cold-plunge",
  swimspa: "swim-spas",
  "infinity-line": "infinity-line",
  "spa-inox": "steel-line",
  "spa-mosaico": "mosaic-line",
};

const args = process.argv.slice(2);
const limit = args.includes("--limit") ? Number(args[args.indexOf("--limit") + 1]) : Infinity;
const offline = args.includes("--offline");

let lastRequest = 0;
async function politeFetch(url) {
  const wait = lastRequest + CRAWL_DELAY - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequest = Date.now();
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

async function cached(url, file) {
  const p = path.join(CACHE, file);
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    if (offline) return null;
    const text = await (await politeFetch(url)).text();
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, text);
    return text;
  }
}

const clean = (s) => s.replace(/\s+/g, " ").trim();
const abs = (u) => (u.startsWith("//") ? `https:${u}` : u.startsWith("/") ? BASE + u : u);

// Text of a cell; when it holds several child elements (finish lists etc.) join them with ", ".
function cellText($, el) {
  const parts = $(el)
    .find("*")
    .addBack()
    .contents()
    .filter((_, n) => n.type === "text")
    .map((_, n) => clean($(n).text()))
    .get()
    .filter(Boolean);
  return parts.length > 1 ? parts.join(", ") : clean($(el).text());
}

// Words too generic to identify a product's own photo folder.
const GENERIC = new Set(["hot", "tub", "tubs", "spa", "spas", "jacuzzi", "seats", "hydromassage", "hydrotherapy", "outdoor", "luxury", "efficiency", "pro", "line", "the", "with", "for", "and"]);

function parseProduct(html, url, collection) {
  const $ = cheerio.load(html);
  const slug = new URL(url).pathname.split("/").filter(Boolean).pop();
  const id = ($("body").attr("class") || "").match(/product-id-(\d+)/)?.[1];

  let ld = {};
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const j = JSON.parse($(el).text());
      if (j["@type"] === "Product") ld = j;
    } catch {}
  });

  // The visible H1 is in English; the structured-data name is sometimes Spanish.
  const name = clean($("h1").first().text()) || clean(ld.name || "");
  const description = clean(ld.description || $('meta[name="description"]').attr("content") || "");

  // Specs, layout 1: PrestaShop data sheets (technical, equipment, options).
  const specs = [];
  const sheetGroups = ["General specifications", "Equipment", "Finishes & options"];
  $(".product-features .data-sheet").each((i, sheet) => {
    $(sheet)
      .find("dt")
      .each((_, dt) => {
        const label = clean($(dt).text());
        const value = cellText($, $(dt).next("dd"));
        if (label && value) specs.push({ group: sheetGroups[i] ?? sheetGroups.at(-1), label, value });
      });
  });
  // Specs, layout 2: tables inside titled accordions (newer pages).
  if (!specs.length) {
    $("table").each((_, table) => {
      const group =
        clean($(table).closest(".elementor-accordion-item").find(".elementor-accordion-title").first().text()) ||
        "Specifications";
      $(table)
        .find("tr")
        .each((_, tr) => {
          const cells = $(tr).children("td,th");
          if (cells.length < 2) return;
          const label = clean($(cells[0]).text());
          const value = cellText($, cells[1]);
          if (label && value && !/^code$/i.test(label)) specs.push({ group, label, value });
        });
    });
  }

  // Images: product photos first, then this product's own gallery photos.
  const images = [];
  const seen = new Set();
  const add = (u) => {
    if (!u) return;
    u = abs(u);
    const key = u.replace(/-\d{3,4}(\.\w+)$/, "$1"); // kora-02-1280 / kora-02-1600 -> same photo
    if (seen.has(key)) return;
    seen.add(key);
    images.push(u);
  };
  $("[data-image-large-src]").each((_, el) => add($(el).attr("data-image-large-src")));
  if (!images.length) add($('meta[property="og:image"]').attr("content"));

  const tokens = slug.split("-").filter((t) => t.length > 2 && !GENERIC.has(t) && !/^\d+$/.test(t));
  // Prefer the largest variant of each gallery photo.
  const gallery = [];
  $("img, source").each((_, el) => {
    for (const s of [$(el).attr("data-src"), $(el).attr("src"), ...($(el).attr("srcset") || "").split(",").map((x) => x.trim().split(" ")[0])]) {
      if (!s || !/\/img\/cms\//.test(s) || !/\.(jpe?g|png|webp)$/i.test(s) || /\/(blog|servicios|jets)\//.test(s) || /\/mobile-/.test(s)) continue;
      const folder = s.split("/").slice(-2, -1)[0] || "";
      if (tokens.some((t) => folder.includes(t))) gallery.push(s);
    }
  });
  const size = (u) => Number((u.match(/-(\d{3,4})\.\w+$/) || [])[1] || 0);
  gallery.sort((a, b) => size(b) - size(a)).forEach(add);

  return { id, slug, name, collection, description, specs, sourceImages: images.slice(0, MAX_IMAGES), sourceUrl: url };
}

async function downloadImage(src, slug, i) {
  const dir = path.join(IMG_DIR, slug);
  const file = path.join(dir, `${i + 1}.webp`);
  try {
    await fs.access(file);
  } catch {
    if (offline) return null;
    const buf = Buffer.from(await (await politeFetch(src)).arrayBuffer());
    await fs.mkdir(dir, { recursive: true });
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file);
  }
  const meta = await sharp(file).metadata();
  return { src: `/products/aquavia/${slug}/${i + 1}.webp`, width: meta.width, height: meta.height };
}

// Map sitemap entries "product URL -> main image id". The image id is shared
// between languages, which lets us pair Spanish and English product URLs.
function urlToImageId(xml) {
  const map = new Map();
  for (const block of xml.split("<url>").slice(1)) {
    const loc = block.match(/<loc><!\[CDATA\[([^\]]+)\]\]><\/loc>/)?.[1];
    const img = block.match(/<image:loc><!\[CDATA\[[^\]]*?\/(\d+)-[a-z_]+\/[^\]]+\]\]>/)?.[1];
    if (loc && img) map.set(loc.split("#")[0], img);
  }
  return map;
}

/** Returns Map(English product slug -> collection key) from Aquavia's collection pages. */
async function fetchLines(enXml) {
  const esXml = await cached(`${BASE}/es/sitemap/product/1.xml`, "sitemap-es.xml");
  const esToImg = urlToImageId(esXml || "");
  const imgToEnSlug = new Map([...urlToImageId(enXml)].map(([u, img]) => [img, u.split("/").pop()]));

  const lineOf = new Map();
  for (const [pathName, key] of Object.entries(LINES)) {
    const html = await cached(`${BASE}/${pathName}`, `lines/${pathName}-1.html`);
    if (!html) continue;
    const $ = cheerio.load(html);
    $("a[href]").each((_, a) => {
      const esUrl = $(a).attr("href").split("#")[0].split("?")[0];
      const img = esToImg.get(esUrl);
      const enSlug = img && imgToEnSlug.get(img);
      if (enSlug && !lineOf.has(enSlug)) lineOf.set(enSlug, key);
    });
  }
  return lineOf;
}

async function main() {
  const xml = await cached(SITEMAP, "sitemap.xml");
  const urls = [...xml.matchAll(/<loc><!\[CDATA\[([^\]]+)\]\]><\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => SECTIONS[new URL(u).pathname.split("/")[2]])
    .slice(0, limit);

  const lineOf = await fetchLines(xml);
  console.log(`${lineOf.size} products mapped to ${Object.keys(LINES).length} collections`);
  console.log(`${urls.length} products to import`);
  const products = [];
  for (const [n, url] of urls.entries()) {
    const section = new URL(url).pathname.split("/")[2];
    const slug = new URL(url).pathname.split("/").pop();
    try {
      const html = await cached(url, `${slug}.html`);
      if (!html) continue;
      const p = parseProduct(html, url, SECTIONS[section]);
      // Spas get their Aquavia line; professional spas and accessories keep their section.
      if (p.collection === "hot-tubs" || p.collection === "swim-spas") p.collection = lineOf.get(slug) ?? p.collection;
      if (slug === "cold-plunge") p.collection = "cold-plunge";
      const images = [];
      for (const [i, src] of p.sourceImages.entries()) {
        try {
          const img = await downloadImage(src, p.slug, i);
          if (img) images.push(img);
        } catch (e) {
          console.warn(`  image failed: ${src} (${e.message})`);
        }
      }
      delete p.sourceImages;
      products.push({ ...p, images });
      console.log(`[${n + 1}/${urls.length}] ${p.name} — ${p.specs.length} specs, ${images.length} images`);
    } catch (e) {
      console.warn(`[${n + 1}/${urls.length}] failed ${url}: ${e.message}`);
    }
    // Write progress after every product so a stopped run keeps what it has.
    await fs.mkdir(path.dirname(OUT), { recursive: true });
    await fs.writeFile(OUT, JSON.stringify(products, null, 2) + "\n");
  }
  console.log(`Done: ${products.length} products written to ${path.relative(ROOT, OUT)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
