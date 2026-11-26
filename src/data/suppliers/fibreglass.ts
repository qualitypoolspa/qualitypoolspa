// Glass-fibre pools, imported by scripts/import-fibreglass.mjs. Supplier name intentionally
// not shown (client's wish). English texts: fibreglass-en.json (translated from Polish).
import type { SupplierProduct } from "../products";
import raw from "../imported/fibreglass.json";
import en from "../imported/fibreglass-en.json";

type Imported = {
  slug: string;
  name: string;
  length?: number;
  width?: number;
  depth?: number;
  weight?: number;
  shapePl?: string;
  descriptionPl: string;
  images: { src: string; width: number; height: number; contain?: boolean }[];
};

const shapes: Record<string, string> = {
  prostokąt: "Rectangular",
  "prostokąt nieregularny": "Rectangular with steps and seating",
  prostokątny: "Rectangular",
  owal: "Oval",
  owalny: "Oval",
  okrągły: "Round",
  "kształt nieregularny": "Freeform",
  "prostokąt zaokrąglony": "Rounded rectangle",
  "okrągły nieregularny": "Round, freeform",
  nieregularny: "Freeform",
};

const translations = en as Record<string, string>;

// Corrections where the supplier's page is wrong (checked against the model's drawing).
const overrides: Record<string, Partial<Imported>> = {
  // The page repeats the Filuś II specs; the drawing and page address give 4.5 × 2.5 × 1.2 m.
  agos: { length: 4.5, width: 2.5, depth: 1.2, weight: undefined, shapePl: undefined },
};
const m = (n?: number) => (n === undefined ? "–" : `${n.toLocaleString("en", { maximumFractionDigits: 2 })} m`);

/** Length groups, matching how the supplier groups its range. */
const lengthGroup = (l = 0) => (l <= 5 ? "up-to-5m" : l <= 7 ? "5-7m" : l <= 9 ? "7-9m" : "over-9m");

const g = (group: string, label: string, value: string) => ({ group: { en: group }, label: { en: label }, value });

export const fibreglassProducts: SupplierProduct[] = (raw as Imported[])
  .map((p) => ({ ...p, ...overrides[p.slug] }))
  .filter((p) => p.name && p.length)
  .sort((a, b) => (a.length ?? 0) - (b.length ?? 0))
  .map((p) => {
    const size = `${m(p.length).replace(" m", "")} × ${m(p.width)}`;
    const shape = p.shapePl ? shapes[p.shapePl.toLowerCase()] ?? p.shapePl : undefined;
    const description =
      translations[p.slug] ??
      `A one-piece glass-fibre pool measuring ${size}, ${m(p.depth)} deep, delivered ready to install.`;
    return {
      slug: p.slug,
      category: "fibreglass-pools",
      collection: lengthGroup(p.length),
      // Roman numerals: "Ibiza Ii" -> "Ibiza II".
      name: p.name.replace(/\b(I{1,3}|Iv|Vi{0,3})\b/gi, (r) => r.toUpperCase()),
      tagline: { en: `${size}, ${m(p.depth)} deep.` },
      description: { en: description },
      specs: [
        g("Dimensions", "Length", m(p.length)),
        g("Dimensions", "Width", m(p.width)),
        g("Dimensions", "Depth", m(p.depth)),
        ...(p.weight ? [g("Dimensions", "Weight", `${p.weight} kg`)] : []),
        ...(shape ? [g("Dimensions", "Shape", shape)] : []),
        g("Construction", "Shell", "One-piece glass-fibre reinforced polyester, with steel reinforcement profiles"),
        g("Construction", "Steps", "Anti-slip coating"),
        g("Finishes", "Classic colours", "White, grey, cream, blue"),
        g("Finishes", "3D metallic colours", "White, sand, blue"),
      ],
      images: p.images,
    } satisfies SupplierProduct;
  });
