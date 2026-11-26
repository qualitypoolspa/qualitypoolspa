#!/usr/bin/env node
/**
 * Imports Harvia sauna cabins from harvia.com into src/data/imported/harvia.json and
 * downloads resized photos into public/products/harvia/<slug>/.
 *
 * harvia.com sits behind a browser check, so pages are loaded with Playwright (headless
 * Chromium). Everything we need is in the page's embedded product data (Harvia's PIM):
 * texts, key features, measurements, photos and public documents.
 *
 * Polite by design:
 *  - only the product pages listed below (or given on the command line), no crawling
 *  - waits DELAY ms between page loads and between image downloads
 *  - caches HTML in .cache/harvia/ so re-runs don't re-fetch
 *  - skips images that already exist, so it can be stopped and resumed
 *  - links only documents Harvia marks as public (dealer-only data sheets are left out)
 *
 * Usage:  node scripts/import-harvia.mjs                    (the products below)
 *         node scripts/import-harvia.mjs <harvia url> ...   (these as well)
 *         node scripts/import-harvia.mjs --offline          (rebuild JSON from cache only)
 *
 * Needs Playwright with Chromium (npx playwright install chromium) unless --offline.
 * Only use with Harvia's permission to reuse their content (e.g. as an authorised dealer).
 */
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, ".cache/harvia");
const IMG_DIR = path.join(ROOT, "public/products/harvia");
const OUT = path.join(ROOT, "src/data/imported/harvia.json");
const DELAY = 4000;
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const MAX_IMAGES = 8;
// Harvia's PIM asset store (the id is their catalogue, the same for every asset).
const PIM = "https://pim.harvia.com/rockon-images/CIP";
const CATALOG = "3c5b6375-efcf-42bf-86ea-4ff1ab4796a9";

const PRODUCTS = [
  "https://www.harvia.com/en/products/ALASKA-MN/alaska-mini",
  "https://www.harvia.com/en/products/ALASKA-C/alaska-corner",
  "https://www.harvia.com/en/products/ALASKA-V/alaska-view",
  "https://www.harvia.com/en/products/KOMFORT-C/komfort-corner",
  "https://www.harvia.com/en/products/KOMFORT-L/komfort-large",
  "https://www.harvia.com/en/products/PANORAMA-S/panorama-small",
  "https://www.harvia.com/en/products/PANORAMA-L/panorama-large",
  "https://www.harvia.com/en/products/FAMILY-S/family-small",
  "https://www.harvia.com/en/products/FAMILY-M/family-medium",
  "https://www.harvia.com/en/products/FAMILY-L/family-large",
  "https://www.harvia.com/en/products/HIMALAYA-S-IR+/himalaya-small-infra+",
  "https://www.harvia.com/en/products/HIMALAYA-C-IR+/himalaya-corner-infra+",
  "https://www.harvia.com/en/products/S1212/sauna-cabin-variant-1150x1150",
  "https://www.harvia.com/en/products/S1212SV/sauna-cabin-variant-view-s1212sv",
  "https://www.harvia.com/en/products/S1515/sauna-cabin-variant-1505x1505",
  "https://www.harvia.com/en/products/S1515L/sauna-cabin-variant-1505x1505-left",
  "https://www.harvia.com/en/products/S1515R/sauna-cabin-variant-1505x1505-right",
  "https://www.harvia.com/en/products/S1616CV/sauna-cabin-variant-view-s1616cv",
  "https://www.harvia.com/en/products/S1616SV/sauna-cabin-variant-view-s1616sv",
  "https://www.harvia.com/en/products/S1620SV/sauna-cabin-variant-view-s1620sv",
  "https://www.harvia.com/en/products/S2015/sauna-cabin-variant-1945x1505",
  "https://www.harvia.com/en/products/S2015L/sauna-cabin-variant-1945x1505-left",
  "https://www.harvia.com/en/products/S2015R/sauna-cabin-variant-1945x1505-right",
  "https://www.harvia.com/en/products/S2020/sauna-cabin-variant-1945x1945",
  "https://www.harvia.com/en/products/S2020CV/sauna-cabin-variant-view-s2020cv",
  "https://www.harvia.com/en/products/S2020L/variant",
  "https://www.harvia.com/en/products/S2020R/sauna-cabin-variant-1945x1945-right",
  "https://www.harvia.com/en/products/S2020SV/sauna-cabin-variant-view-s2020sv",
  "https://www.harvia.com/en/products/S2520/sauna-cabin-variant-2380x1945",
  "https://www.harvia.com/en/products/S2520L/sauna-cabin-variant-2380x1945-left",
  "https://www.harvia.com/en/products/S2520R/sauna-cabin-variant-2380x1945-right",
  "https://www.harvia.com/en/products/SHB1620ALD/block-right-medium",
  "https://www.harvia.com/en/products/SHB2020ALD/block-right-large",
  "https://www.harvia.com/en/products/SHF1620S/sauna-cabin-fenix-1620s",
  "https://www.harvia.com/en/products/SHF2020S/sauna-cabin-fenix-2020s",
  "https://www.harvia.com/en/products/SHU0909/utu-mini",
  "https://www.harvia.com/en/products/SHU1212/utu-small",
  "https://www.harvia.com/en/products/SHU1616/utu-medium",
  "https://www.harvia.com/en/products/SHV2020/ventura-large",
  "https://www.harvia.com/en/products/SHU1616V/utu-vision-medium",
  "https://www.harvia.com/en/products/URB1616FG/urban-black-medium",
  "https://www.harvia.com/en/products/URW1212FG/urban-white-small",
  "https://www.harvia.com/en/products/URW1616FG/urban-white-medium",
  "https://www.harvia.com/en/products/FAMILY-L-S/family-large-set-fin",
  "https://www.harvia.com/en/products/KOMFORT-C-L/komfort-corner-large",
  "https://www.harvia.com/en/products/POLARIS-L/polaris-large",
  "https://www.harvia.com/en/products/FAMILY-S-S/family-small-set-fin",
  "https://www.harvia.com/en/products/URB1212FG/urban-black-small",
  "https://www.harvia.com/en/products/PANORAMA-MN/panorama-mini",
  "https://www.harvia.com/en/products/OLYMPUS-L/olympus-large",
  "https://www.harvia.com/en/products/FAMILY-M-S/family-medium-set-fin",
  "https://www.harvia.com/en/products/KOMFORT-S/komfort-small",
];

const args = process.argv.slice(2);
const offline = args.includes("--offline");
const urls = [...new Set([...PRODUCTS, ...args.filter((a) => a.startsWith("http"))])];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** "…/products/HIMALAYA-S-IR+/himalaya-small-infra+" -> { code: "HIMALAYA-S-IR+", slug: "himalaya-small-infra-plus" } */
function parseUrl(url) {
  const [, code, name] = new URL(url).pathname.match(/\/products\/([^/]+)\/([^/]+)/) ?? [];
  const slug = decodeURIComponent(name).toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return { code: decodeURIComponent(code), slug };
}

// ---------- fetching ----------

let browser;
async function page(url, code) {
  const file = path.join(CACHE, `${code}.html`);
  try {
    return await fs.readFile(file, "utf8");
  } catch {}
  if (offline) throw new Error(`not cached: ${url}`);
  if (!browser) {
    // import() ignores NODE_PATH, so fall back to require() for a globally installed Playwright.
    const { chromium } = await import("playwright").catch(() => createRequire(import.meta.url)("playwright"));
    browser = await chromium.launch();
  }
  // A normal desktop user agent: the site's browser check turns away "HeadlessChrome".
  // (Used with the permission of the client, an authorised Harvia dealer.)
  const tab = await browser.newPage({ userAgent: UA });
  await tab.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
  // The check page reloads itself into the product page once it has passed.
  await tab.waitForFunction(() => document.documentElement.innerHTML.includes("self.__next_f"), null, { timeout: 60_000 }).catch(() => {});
  await tab.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
  const html = await tab.content();
  await tab.close();
  if (!html.includes("self.__next_f")) throw new Error(`no product data on ${url} (browser check not passed?)`);
  await fs.mkdir(CACHE, { recursive: true });
  await fs.writeFile(file, html);
  await sleep(DELAY);
  return html;
}

// ---------- parsing the embedded Next.js (RSC) data ----------

/** Joins the self.__next_f.push([1,"…"]) chunks into the RSC payload text. */
function payload(html) {
  const parts = [...html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)];
  return parts.map((m) => JSON.parse(m[1])).join("");
}

/** Reads one JSON value starting at text[start] (like Python's raw_decode). */
function readJson(text, start) {
  let depth = 0;
  let inStr = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") {
      if (--depth === 0) return JSON.parse(text.slice(start, i + 1));
    }
  }
  throw new Error("unterminated JSON");
}

/** Long texts are sent as separate rows ("2b:T<hex byte length>,<text>") and referenced as "$2b". */
function resolveRef(rsc, value) {
  const id = typeof value === "string" && value.match(/^\$([0-9a-f]+)$/)?.[1];
  if (!id) return value;
  const m = rsc.match(new RegExp(`(?:^|\\n)${id}:T([0-9a-f]+),`));
  if (!m) return undefined;
  const bytes = Buffer.from(rsc.slice(m.index + m[0].length));
  return bytes.subarray(0, parseInt(m[1], 16)).toString("utf8");
}

/** PIM attributes: { key: [{ valueType, data, locale, attributeLabel, optionLabel }] } */
function attributes(rsc) {
  const out = {};
  for (const m of rsc.matchAll(/"([a-zA-Z0-9_]+)":\[\{"valueType"/g)) {
    if (!(m[1] in out)) out[m[1]] = readJson(rsc, m.index + m[1].length + 3);
  }
  const get = (key) => {
    const v = (out[key] ?? []).find((e) => e.locale === null || e.locale === "en_US");
    if (!v || v.data === null || v.data === undefined) return undefined;
    if (v.valueType === "ProductMetric") return { amount: v.data.amount, unit: v.data.unit };
    return v.optionLabel ?? resolveRef(rsc, v.data);
  };
  return get;
}

/** Product assets (photos and documents) with their PIM properties. */
function assets(rsc) {
  const seen = new Map();
  for (const m of rsc.matchAll(/\{"id":"(\d+)","name":/g)) {
    try {
      const a = readJson(rsc, m.index);
      if (a.properties?.assetType && !seen.has(a.id)) seen.set(a.id, a);
    } catch {}
  }
  return [...seen.values()];
}

const mm = (v) => (v?.unit === "MILLIMETER" ? v.amount : v?.unit === "METER" ? v.amount * 1000 : undefined);
const num = (v) => v?.amount;

function parse(html, url) {
  const { code, slug } = parseUrl(url);
  const rsc = payload(html);
  const get = attributes(rsc);
  const list = assets(rsc);

  const highlights = [1, 2, 3, 4, 5, 6, 7, 8]
    .flatMap((i) => (get(`usp_${i}`) ?? "").split("\n"))
    .map((s) => s.trim())
    .filter(Boolean);

  const description = (get("marketing_text_long") ?? "")
    .split(/\n\s*\n|\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Photos: the main studio shot first (Harvia's master image, else the first studio shot),
  // then room photos, the other studio shots, and finally drawings.
  const kind = { "Feeling image": 1, "Product image": 2, "Technical image": 3 };
  const pics = list.filter((a) => a.properties.assetType in kind).sort((a, b) => Number(a.id) - Number(b.id));
  // (Some products have several "master" images, room photos included, so studio shots win.)
  const isMaster = (a) => a.properties.MasterImage === "true";
  const isStudio = (a) => a.properties.assetType === "Product image";
  const cover = pics.find((a) => isMaster(a) && isStudio(a)) ?? pics.find(isStudio) ?? pics.find(isMaster) ?? pics[0];
  const photos = [cover, ...pics.filter((a) => a !== cover).sort((a, b) => kind[a.properties.assetType] - kind[b.properties.assetType])]
    .filter(Boolean)
    .slice(0, MAX_IMAGES)
    .map((a) => ({ id: a.id }));

  const downloads = list
    .filter((a) => a.properties.assetType === "User manual" && /\bPublic\b/.test(a.properties.AccessLevel ?? ""))
    .map((a) => ({ label: a.name.replace(/^Harvia\s+/, ""), url: `${PIM}/asset/download/${CATALOG}/${a.id}` }));

  return {
    slug,
    code,
    url,
    name: get("product_marketing_name_short") ?? get("name"),
    family: get("product_family"),
    slogan: get("marketing_slogan"),
    description,
    highlights,
    specs: {
      width: mm(get("product_width")),
      depth: mm(get("product_depth")),
      height: mm(get("product_height")),
      saunaVolume: num(get("calculatory_sauna_volume")),
      roomMaxVolume: num(get("room_max_volume")),
      netWeight: num(get("net_weight")),
      itemNumber: get("item_code_harvia_finland"),
      ean: get("gtin"),
    },
    photos,
    downloads,
  };
}

// ---------- images ----------

/** Studio shots and drawings sit on white: show them whole. Photos with a scene behind fill the frame. */
async function onWhite(file) {
  const { data, info } = await sharp(file).resize(40, 40, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => data.subarray((y * 40 + x) * info.channels, (y * 40 + x) * info.channels + 3);
  const corners = [px(0, 0), px(39, 0), px(0, 39), px(39, 39), px(20, 0), px(0, 20), px(39, 20)];
  return corners.every((c) => Math.min(...c) > 240);
}

async function image(slug, id, i) {
  const dir = path.join(IMG_DIR, slug);
  const file = path.join(dir, `${i + 1}.webp`);
  try {
    await fs.access(file);
  } catch {
    if (offline) return undefined;
    // format=jpeg flattens the transparent studio shots onto white.
    const res = await fetch(`${PIM}/preview/image/${CATALOG}/${id}?maxsize=1600&format=jpeg&quality=8`);
    if (!res.ok) {
      console.warn(`  image ${id}: HTTP ${res.status}`);
      return undefined;
    }
    await fs.mkdir(dir, { recursive: true });
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).flatten({ background: "#ffffff" }).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file);
    await sleep(DELAY / 4);
  }
  const meta = await sharp(file).metadata();
  const contain = await onWhite(file);
  return { src: `/products/harvia/${slug}/${i + 1}.webp`, width: meta.width, height: meta.height, ...(contain ? { contain: true } : {}) };
}

// ---------- main ----------

const products = [];
for (const url of urls) {
  const { code } = parseUrl(url);
  try {
    const p = parse(await page(url, code), url);
    const images = [];
    for (const [i, ph] of p.photos.entries()) {
      const img = await image(p.slug, ph.id, i);
      if (img) images.push(img);
    }
    delete p.photos;
    products.push({ ...p, images });
    console.log(`${p.code.padEnd(16)} ${p.name} – ${images.length} photos, ${p.downloads.length} downloads`);
  } catch (e) {
    console.error(`${code}: ${e.message}`);
  }
}
await browser?.close();
await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(products, null, 2) + "\n");
console.log(`\n${products.length} products -> ${path.relative(ROOT, OUT)}`);
