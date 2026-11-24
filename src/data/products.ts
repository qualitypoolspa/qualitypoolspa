import { pick, type Locale, type Localized } from "@/i18n/config";
import type { CategorySlug } from "./categories";
import { aquaviaProducts } from "./suppliers/aquavia";
import { astralpoolProducts } from "./suppliers/astralpool";
import { fibreglassProducts } from "./suppliers/fibreglass";
import { fluidraRangeProducts } from "./suppliers/fluidra-range";
import { zodiacProducts } from "./suppliers/zodiac";

export type ProductImage = {
  src: string;
  width: number;
  height: number;
  /** Studio shot on white: show the whole product (no cropping) on a white panel. */
  contain?: boolean;
};

export type Product = {
  slug: string;
  category: CategorySlug;
  /** Sub-group within a category, e.g. "hot-tubs" or "swim-spas" (names in dict.collections). */
  collection?: string;
  /** Spas: the numbers of people it is listed for (e.g. [4, 5]). */
  seats?: number[];
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
// TODO(client): saunas (Harvia) are added once the dealer material arrives.
const manualProducts: Product[] = [
];

// The client's hand-picked spas: shown first on the spa page ("Our selection").
export const selectionSlugs = ["spa-touch-pro", "spa-feel", "spa-essence", "spa-touch-5-pro", "spa-cube-ergo"];
// Home page "Popular products": the priority categories, pool covers and spas, mixed.
const featuredSlugs = ["octeo", "spa-touch-pro", "bellasun", "spa-feel", "sveltea", "spa-essence"];

const all = [
  ...manualProducts,
  ...astralpoolProducts,
  ...zodiacProducts,
  ...fluidraRangeProducts,
  ...aquaviaProducts,
  ...fibreglassProducts,
];

export const products: Product[] = all.map((p) => ({ ...p, featured: featuredSlugs.includes(p.slug) }));

/** The client's selection within a category, in the order listed above. */
export const selectionIn = (category: CategorySlug) =>
  selectionSlugs
    .map((s) => products.find((p) => p.slug === s && p.category === category))
    .filter((p): p is Product => !!p);

export const featuredProducts = (n = 3) => {
  const picked = featuredSlugs.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => !!p);
  const fill = products.filter((p) => p.images?.length && !picked.includes(p));
  return [...picked, ...fill].slice(0, n);
};

export const getProduct = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);

export const productsIn = (category: CategorySlug) => products.filter((p) => p.category === category);

/** The light version of a product used by product cards (also in client components). */
export type ProductCardData = {
  slug: string;
  category: CategorySlug;
  collection?: string;
  seats?: number[];
  name: string;
  brand?: string;
  tagline: string;
  image?: ProductImage;
  sample?: boolean;
};

export const toCard = (p: Product, lang: Locale): ProductCardData => ({
  slug: p.slug,
  category: p.category,
  collection: p.collection,
  seats: p.seats,
  name: p.name,
  brand: p.brand,
  tagline: pick(p.tagline, lang),
  image: p.images?.[0],
  sample: p.sample,
});
