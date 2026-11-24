#!/usr/bin/env node
/**
 * Imports the glass-fibre pool models from the supplier's site (baslux.pl, Polish)
 * into src/data/imported/fibreglass.json, with the technical drawing of each model
 * as its photo in public/products/fibreglass/<slug>/.
 *
 * The client does not want the supplier's name shown, so nothing here is branded:
 * the supplier's renders carry their logo and are NOT used (only the drawings).
 *
 * Polite: waits DELAY between requests, caches pages in .cache/, resumable.
 * Usage: node scripts/import-fibreglass.mjs [--limit N]
 */
import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = "https://baslux.pl";
const DELAY = 5_000;
const UA = "Mozilla/5.0 (compatible; catalogue-import)";
const CACHE = path.join(ROOT, ".cache/baslux");
const IMG_DIR = path.join(ROOT, "public/products/fibreglass");
const OUT = path.join(ROOT, "src/data/imported/fibreglass.json");

const args = process.argv.slice(2);
const limit = args.includes("--limit") ? Number(args[args.indexOf("--limit") + 1]) : Infinity;

let last = 0;
async function politeFetch(url) {
  const wait = last + DELAY - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  last = Date.now();
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

async function cached(url, file) {
  const p = path.join(CACHE, file);
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    const text = await (await politeFetch(url)).text();
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, text);
    return text;
  }
}

const clean = (s) => s.replace(/\s+/g, " ").trim();
const num = (s) => (s ? Number(s.replace(",", ".")) : undefined);
const titleCase = (s) => s.toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());

function parse(html, pagePath) {
  const $ = cheerio.load(html);
  const slug = pagePath.replace(/\//g, "").replace(/^basen-/, "").split(/-\d/)[0];
  const heading = clean($("h2").first().text()).replace(/^basen\s+/i, "");
  const name = titleCase(heading || slug.replace(/-/g, " "));

  const texts = $(".elementor-widget-text-editor")
    .map((_, e) => clean($(e).text()))
    .get();
  const specText = texts.find((t) => /Długość/i.test(t)) ?? "";
  const description = texts.find((t) => t.length > 40 && !/Długość/i.test(t) && !/kolorystyk/i.test(t)) ?? "";
  const m = (label) => specText.match(new RegExp(`${label}:\\s*([\\d.,]+)`, "i"))?.[1];
  const shape = specText.match(/Kształt:\s*([^\n]+?)(?:$|Długość|Szerokość|Głębokość|Waga)/i)?.[1]?.trim();

  // Technical drawing: the image with "rzut" (plan) in its file name, at full size.
  let drawing;
  $("img").each((_, e) => {
    const s = $(e).attr("data-src") || $(e).attr("src") || "";
    if (!drawing && /rzut/i.test(s)) drawing = s.replace(/-\d+x\d+(\.\w+)$/, "$1");
  });

  return {
    slug,
    name,
    length: num(m("Długość")),
    width: num(m("Szerokość")),
    depth: num(m("Głębokość")),
    weight: num(m("Waga")),
    shapePl: shape,
    descriptionPl: description,
    drawing,
    sourceUrl: BASE + pagePath,
  };
}

async function saveDrawing(url, slug) {
  const dir = path.join(IMG_DIR, slug);
  const file = path.join(dir, "1.webp");
  try {
    await fs.access(file);
  } catch {
    const buf = Buffer.from(await (await politeFetch(url)).arrayBuffer());
    await fs.mkdir(dir, { recursive: true });
    const t = await sharp(buf).flatten({ background: "#ffffff" }).trim({ background: "#ffffff", threshold: 12 })
      .resize({ width: 1500, height: 1500, fit: "inside", withoutEnlargement: true }).toBuffer({ resolveWithObject: true });
    const pad = Math.round(Math.max(t.info.width, t.info.height) * 0.06);
    await sharp(t.data).extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#ffffff" }).webp({ quality: 84 }).toFile(file);
  }
  const meta = await sharp(file).metadata();
  return { src: `/products/fibreglass/${slug}/1.webp`, width: meta.width, height: meta.height, contain: true };
}

async function main() {
  const xml = await cached(`${BASE}/page-sitemap.xml`, "page-sitemap.xml");
  const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    // Model pages carry their dimensions in the address; skip the packages with enclosures.
    .filter((p) => /-[\d-]+m?-x-\d/.test(p) && !/zestaw/.test(p))
    .slice(0, limit);

  console.log(`${pages.length} pool models`);
  const pools = [];
  for (const [i, p] of pages.entries()) {
    try {
      const html = await cached(BASE + p, `models/${p.replace(/\//g, "")}.html`);
      const pool = parse(html, p);
      pool.images = pool.drawing ? [await saveDrawing(pool.drawing, pool.slug)] : [];
      delete pool.drawing;
      pools.push(pool);
      console.log(`[${i + 1}/${pages.length}] ${pool.name} ${pool.length}×${pool.width}×${pool.depth} — ${pool.images.length ? "drawing" : "NO drawing"}`);
    } catch (e) {
      console.warn(`[${i + 1}/${pages.length}] failed ${p}: ${e.message}`);
    }
    await fs.mkdir(path.dirname(OUT), { recursive: true });
    await fs.writeFile(OUT, JSON.stringify(pools, null, 2) + "\n");
  }
  console.log(`Done: ${pools.length} pools written to ${path.relative(ROOT, OUT)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
