// Adapter for products imported from aquaviaspa.com by scripts/import-aquavia.mjs.
// Re-run the script to refresh; this file maps its output onto our Product shape.
import type { Product } from "../products";
import raw from "../imported/aquavia.json";

type Imported = {
  slug: string;
  name: string;
  collection: string;
  description: string;
  specs: { group: string; label: string; value: string }[];
  images: { src: string; width: number; height: number }[];
};

// Drop the supplier's own sales phrases ("Request a quote.") from their descriptions.
const tidy = (s: string) =>
  s
    .replace(/\s*(request|ask for|get) (a|your) (free )?(quote|price)[^.]*\.?/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

export const aquaviaProducts: Product[] = (raw as Imported[])
  .filter((p) => p.name)
  .map((p) => {
    const description = tidy(p.description);
    return {
      slug: p.slug,
      category: "spas",
      collection: p.collection,
      name: p.name,
      brand: "Aquavia Spa",
      tagline: { en: firstSentence(description) },
      description: { en: description },
      specs: p.specs.map((s) => ({ group: { en: s.group }, label: { en: s.label }, value: s.value })),
      images: p.images,
    } satisfies Product;
  });
