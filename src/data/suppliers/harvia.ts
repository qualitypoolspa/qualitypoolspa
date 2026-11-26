// Adapter for Harvia sauna cabins imported from harvia.com by scripts/import-harvia.mjs.
// Re-run the script to refresh (add product links to its list); this file maps its output onto our Product shape.
import type { SupplierProduct } from "../products";
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
  Polaris: "sauna-polaris",
  Olympus: "sauna-olympus",
  Panorama: "sauna-panorama",
  Family: "sauna-family",
  Fenix: "sauna-fenix",
  Utu: "sauna-utu",
  Urban: "sauna-urban",
  "Block Sauna Cabin": "sauna-block",
  Ventura: "sauna-ventura",
  Variant: "sauna-variant",
  "Variant View": "sauna-variant-view",
  Himalaya: "sauna-himalaya",
};

// Where Harvia's page name or address is unusable (keyed by type code).
const overrides: Record<string, { name?: string; slug?: string }> = {
  S2020L: { name: "Variant 1945 × 1945 left", slug: "sauna-cabin-variant-1945x1945-left" },
};

// "Sauna cabin Variant 1505x1505 left" -> "Variant 1505 × 1505 left"
const tidyName = (s: string) =>
  s
    .replace(/^Sauna cabin\s+/i, "")
    .replace(/(\d)\s*x\s*(\d)/g, "$1 × $2");

// Typos and stray HTML spaces in the supplier's texts.
const tidy = (s: string) =>
  s.replace(/&nbsp;/g, " ").replace(/\bElegent\b/g, "Elegant").replace(/\s+/g, " ").trim();

const cm = (mm?: number) => (mm ? `${Math.round(mm / 10)} cm` : undefined);
const m3 = (v?: number) => (v ? `${v.toLocaleString("en", { maximumFractionDigits: 1 })} m³` : undefined);
const g = (group: string, label: string, value?: string) => (value ? [{ group: { en: group }, label: { en: label }, value }] : []);

export const harviaProducts: SupplierProduct[] = (raw as Imported[])
  .filter((p) => p.name)
  // Smallest first within each family.
  .sort((a, b) => (a.specs.width ?? 0) * (a.specs.depth ?? 0) - (b.specs.width ?? 0) * (b.specs.depth ?? 0))
  .map((p) => {
    const s = p.specs;
    const size = [s.width, s.depth, s.height].every(Boolean)
      ? `${[s.width, s.depth, s.height].map((v) => Math.round(v! / 10)).join(" × ")} cm`
      : undefined;
    const fix = overrides[p.code] ?? {};
    const kind = /infra\+/i.test(p.name)
      ? "Sauna cabin with infrared heater and salt wall"
      : /\bset\b/i.test(p.name)
        ? "Sauna cabin set with heater, control unit and infrared panel"
        : "Indoor sauna cabin";
    const tagline = size ? `${kind}, ${size}.` : `${kind}.`;
    // Harvia's key features go at the end of the description as bullet lines (the database has no
    // separate field for them, and this way the client can edit them in /admin like any text).
    const bullets = p.highlights.map((h) => `• ${tidy(h)}`).join("\n");
    const text = p.description.map(tidy).join("\n\n");
    // No text from Harvia (e.g. Olympus Large): the tagline doubles as the description, which hides the empty section.
    const description = [text, bullets].filter(Boolean).join("\n\n") || tagline;
    return {
      slug: fix.slug ?? p.slug,
      category: "saunas-hammam",
      collection: (p.family && collections[p.family]) || undefined,
      name: fix.name ?? tidyName(p.name),
      brand: "Harvia",
      tagline: { en: tagline },
      description: { en: description },
      specs: [
        ...g("Dimensions", "Width", cm(s.width)),
        ...g("Dimensions", "Depth", cm(s.depth)),
        ...g("Dimensions", "Height", cm(s.height)),
        ...g("Dimensions", "Sauna volume", m3(s.saunaVolume)),
        ...g("Dimensions", "Net weight", s.netWeight ? `${s.netWeight} kg` : undefined),
        ...g("Heating", "Max. recommended room volume", m3(s.roomMaxVolume)),
        ...g("Product", "Product family", p.family?.replace(/ Sauna Cabin$/, "")),
        ...g("Product", "Type code", p.code),
        ...g("Product", "Harvia item number", s.itemNumber !== p.code ? s.itemNumber : undefined),
        ...g("Product", "Installation", "Indoors, free-standing on the floor"),
      ],
      images: p.images,
      downloads: p.downloads.map((d) => ({ label: { en: d.label }, url: d.url })),
    } satisfies SupplierProduct;
  });
