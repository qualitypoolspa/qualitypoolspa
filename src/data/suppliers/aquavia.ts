// Adapter for products imported from aquaviaspa.com by scripts/import-aquavia.mjs.
// Re-run the script to refresh; this file maps its output onto our SupplierProduct shape.
import type { SupplierProduct } from "../products";
import raw from "../imported/aquavia.json";

type Imported = {
  slug: string;
  name: string;
  collection: string;
  seats?: number[];
  description: string;
  specs: { group: string; label: string; value: string }[];
  images: { src: string; width: number; height: number }[];
};

// Which photo to use as the cover when the supplier's first photo isn't the best
// (1-based position in the product's photo list).
const coverPhoto: Record<string, number> = {
  "spa-cube-ergo": 2,
};

// Consistent naming: "Cube Ergo hot tub" -> "Cube Ergo Hot Tub".
const tidyName = (s: string) => s.replace(/\bhot tub\b/gi, "Hot Tub").trim();

// Drop the supplier's own sales phrases ("Request a quote.", "Find out more!") from their descriptions.
const tidy = (s: string) =>
  s
    .replace(/\s*(request|ask for|get) (a|your) (free )?(quote|price)[^.!]*[.!]?/gi, "")
    .replace(/\s*(find out more|discover more|learn more|see more)[^.!]*[.!]?/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

export const aquaviaProducts: SupplierProduct[] = (raw as Imported[])
  .filter((p) => p.name)
  .map((p) => {
    const description = tidy(p.description);
    const cover = (coverPhoto[p.slug] ?? 1) - 1;
    const images = cover > 0 && p.images[cover] ? [p.images[cover], ...p.images.filter((_, i) => i !== cover)] : p.images;
    return {
      slug: p.slug,
      category: "spas",
      collection: p.collection,
      seats: p.seats,
      name: tidyName(p.name),
      brand: "Aquavia Spa",
      tagline: { en: firstSentence(description) },
      description: { en: description },
      specs: p.specs.map((s) => ({ group: { en: s.group }, label: { en: s.label }, value: s.value })),
      images,
    } satisfies SupplierProduct;
  });
