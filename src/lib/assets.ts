import fs from "node:fs";
import path from "node:path";

/**
 * Returns the public path if the file exists in /public, otherwise undefined.
 * Lets the design use real photos as soon as they are dropped into the folder,
 * and fall back to a tasteful gradient until then. Server-only (build time).
 */
export function publicImage(...candidates: string[]): string | undefined {
  return candidates.find((p) => fs.existsSync(path.join(process.cwd(), "public", p)));
}

/** Looks for /public/categories/<slug>.(jpg|jpeg|webp|png) */
export function categoryImage(slug: string) {
  return publicImage(...["jpg", "jpeg", "webp", "png"].map((e) => `/categories/${slug}.${e}`));
}

/** Looks for /public/hero/hero.(jpg|jpeg|webp|png) */
export function heroImage() {
  return publicImage(...["jpg", "jpeg", "webp", "png"].map((e) => `/hero/hero.${e}`));
}
