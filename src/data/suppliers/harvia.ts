// Adapter for Harvia sauna cabins imported from harvia.com by scripts/import-harvia.mjs.
// Re-run the script to refresh (add product links to its list); this file maps its output onto our Product shape.
import type { Product } from "../products";
import raw from "../imported/harvia.json";

type Imported = {
  slug: string;
  code: string;
  name: string;
  family?: string;
  description: string[];
  highlights: string[];
  specs: {
    width?: number;
    depth?: number;
    height?: number;
    saunaVolume?: number;
    roomMaxVolume?: number;
    netWeight?: number;
    itemNumber?: string;
  };
  images: { src: string; width: number; height: number; contain?: boolean }[];
  downloads: { label: string; url: string }[];
};

// Harvia product family -> our collection key (names live in dict.collections, which also sets the order).
const collections: Record<string, string> = {
  Alaska: "sauna-alaska",
  Komfort: "sauna-komfort",
  Panorama: "sauna-panorama",
  Family: "sauna-family",
  Himalaya: "sauna-himalaya",
};

// Typos in the supplier's texts.
const tidy = (s: string) => s.replace(/\bElegent\b/g, "Elegant").replace(/\s+/g, " ").trim();

const cm = (mm?: number) => (mm ? `${Math.round(mm / 10)} cm` : undefined);
const m3 = (v?: number) => (v ? `${v.toLocaleString("en", { maximumFractionDigits: 1 })} m³` : undefined);
const g = (group: string, label: string, value?: string) => (value ? [{ group: { en: group }, label: { en: label }, value }] : []);

export const harviaProducts: Product[] = (raw as Imported[])
  .filter((p) => p.name)
  // Smallest first within each family.
  .sort((a, b) => (a.specs.width ?? 0) * (a.specs.depth ?? 0) - (b.specs.width ?? 0) * (b.specs.depth ?? 0))
  .map((p) => {
    const s = p.specs;
    const size = [s.width, s.depth, s.height].every(Boolean)
      ? `${[s.width, s.depth, s.height].map((v) => Math.round(v! / 10)).join(" × ")} cm`
      : undefined;
    const infrared = /infra/i.test(p.name);
    const kind = infrared ? "Sauna cabin with infrared heater and salt wall" : "Indoor sauna cabin in solid spruce";
    return {
      slug: p.slug,
      category: "saunas-hammam",
      collection: (p.family && collections[p.family]) || undefined,
      name: p.name,
      brand: "Harvia",
      tagline: { en: size ? `${kind}, ${size}.` : `${kind}.` },
      description: { en: p.description.map(tidy).join("\n\n") },
      highlights: p.highlights.map((h) => ({ en: tidy(h) })),
      specs: [
        ...g("Dimensions", "Width", cm(s.width)),
        ...g("Dimensions", "Depth", cm(s.depth)),
        ...g("Dimensions", "Height", cm(s.height)),
        ...g("Dimensions", "Sauna volume", m3(s.saunaVolume)),
        ...g("Dimensions", "Net weight", s.netWeight ? `${s.netWeight} kg` : undefined),
        ...g("Heating", "Max. recommended room volume", m3(s.roomMaxVolume)),
        ...g("Product", "Product family", p.family),
        ...g("Product", "Type code", p.code),
        ...g("Product", "Harvia item number", s.itemNumber !== p.code ? s.itemNumber : undefined),
        ...g("Product", "Installation", "Indoors, free-standing on the floor"),
      ],
      images: p.images,
      downloads: p.downloads.map((d) => ({ label: { en: d.label }, url: d.url })),
    } satisfies Product;
  });
