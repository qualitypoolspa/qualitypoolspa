import { pick, type Locale, type Localized } from "@/i18n/config";
import { translateProduct } from "@/i18n/product-text";
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
  specs?: { group?: Localized; label: Localized; value: Localized }[];
  /** Photos under /public. Empty = placeholder art. */
  images?: ProductImage[];
  downloads?: { label: Localized; url: string }[];
  /** Shown under "Popular products" on the home page. */
  featured?: boolean;
  /** Part of the client's selection, shown first on its category page. */
  selection?: boolean;
  /** Demo content: shows a "Sample product" badge. Remove when real data is added. */
  sample?: boolean;
};

/**
 * A product as the supplier files write it: English only, with plain-text spec
 * values. The translations are added from src/i18n/product-text/ (see
 * translateProduct), so the supplier files and their import scripts stay simple.
 */
export type SupplierProduct = Omit<Product, "specs"> & {
  specs?: { group?: Localized; label: Localized; value: string }[];
};

// The bundled catalogue: hand-written products plus the supplier imports.
//
// Since the admin panel arrived, the live catalogue is the `products` table in
// Supabase (see src/lib/catalog.ts and SETUP.md). This list is
//   1. the starting content: `npm run products:seed` turns it into supabase/seed.sql, and
//   2. the fallback the site shows when Supabase isn't set up or can't be reached.
// Edits made here do NOT reach the live site once the database is in use:
// make them in /admin instead.
// TODO(client): saunas (Harvia) are added once the dealer material arrives.
const manualProducts: SupplierProduct[] = [
];

// The client's hand-picked spas: shown first on the spa page ("Our selection").
export const selectionSlugs = ["spa-touch-pro", "spa-feel", "spa-essence", "spa-touch-5-pro", "spa-cube-ergo"];
// Home page "Popular products": the priority categories, pool covers and spas, mixed.
export const featuredSlugs = ["octeo", "spa-touch-pro", "bellasun", "spa-feel", "sveltea", "spa-essence"];

export const bundledProducts: Product[] = [
  ...manualProducts,
  ...astralpoolProducts,
  ...zodiacProducts,
  ...fluidraRangeProducts,
  ...aquaviaProducts,
  ...fibreglassProducts,
].map((p) => ({
  ...translateProduct(p),
  featured: featuredSlugs.includes(p.slug),
  selection: selectionSlugs.includes(p.slug),
}));

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
