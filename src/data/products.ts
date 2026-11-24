import type { Localized } from "@/i18n/config";
import type { CategorySlug } from "./categories";
import { aquaviaProducts } from "./suppliers/aquavia";

export type ProductImage = { src: string; width: number; height: number };

export type Product = {
  slug: string;
  category: CategorySlug;
  /** Sub-group within a category, e.g. "hot-tubs" or "swim-spas" (names in dict.collections). */
  collection?: string;
  /** Model name (not translated) */
  name: string;
  /** Optional supplier / brand, shown on the product page when set */
  brand?: string;
  tagline: Localized;
  description: Localized;
  specs?: { group?: Localized; label: Localized; value: string }[];
  /** Photos under /public. Empty = placeholder art. */
  images?: ProductImage[];
  downloads?: { label: Localized; url: string }[];
  featured?: boolean;
  /** Demo content: shows a "Sample product" badge. Remove when real data is added. */
  sample?: boolean;
};

// Hand-written products. Supplier imports are merged in below.
// TODO(client): replace the remaining samples (pool covers, saunas) with real products.
const manualProducts: Product[] = [
  {
    slug: "automatic-roller-cover",
    category: "pool-covers",
    name: "Automatic Roller Cover",
    tagline: { en: "Cover or open your pool at the touch of a button." },
    description: {
      en: "An automatic pool cover that keeps debris out, reduces evaporation and heat loss, and adds safety. Sample text, replace with the real product description.",
    },
    specs: [
      { label: { en: "Type" }, value: "Automatic, above or below water" },
      { label: { en: "Control" }, value: "Key switch or remote" },
    ],
    sample: true,
  },
  {
    slug: "solar-bubble-cover",
    category: "pool-covers",
    name: "Solar Bubble Cover",
    tagline: { en: "Free heat from the sun, less evaporation." },
    description: {
      en: "A cost-effective cover that captures solar heat and cuts water loss. Sample text, replace with the real product description.",
    },
    sample: true,
  },
  {
    slug: "barrel-sauna",
    category: "saunas-hammam",
    name: "Barrel Sauna",
    tagline: { en: "Classic outdoor sauna with a Nordic feel." },
    description: {
      en: "A heat-treated timber barrel sauna for gardens and terraces. Sample text, replace with the real product description.",
    },
    specs: [{ label: { en: "Capacity" }, value: "4 to 6 people" }],
    sample: true,
  },
  {
    slug: "infrared-cabin",
    category: "saunas-hammam",
    name: "Infrared Cabin",
    tagline: { en: "Gentle infrared warmth for indoor wellness." },
    description: {
      en: "An indoor infrared cabin that heats up fast and uses little energy. Sample text, replace with the real product description.",
    },
    sample: true,
  },
];

// Products shown on the home page, in order (falls back to the first products with photos).
const featuredSlugs = ["hot-tub-kora", "swimspa-sky", "velvet-aurora-spa-5-seats-hydrotherapy-efficiency"];

const all = [...manualProducts, ...aquaviaProducts];

export const products: Product[] = all.map((p) => ({ ...p, featured: featuredSlugs.includes(p.slug) }));

export const featuredProducts = (n = 3) => {
  const picked = featuredSlugs.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => !!p);
  const fill = products.filter((p) => p.images?.length && !picked.includes(p));
  return [...picked, ...fill].slice(0, n);
};

export const getProduct = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);

export const productsIn = (category: CategorySlug) => products.filter((p) => p.category === category);
