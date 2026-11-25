import type { CategorySlug } from "@/data/categories";
import type { Product, ProductImage } from "@/data/products";

/**
 * A row of the `products` table (supabase/migrations/0001_products.sql).
 *
 * Texts are stored in English, the site's only live language. Specs and photos
 * are JSON lists so a product can be edited and saved in one go.
 */
export type SpecRow = { group: string; label: string; value: string };

export type ProductRow = {
  id: string;
  slug: string;
  category: string;
  collection: string | null;
  name: string;
  brand: string | null;
  tagline: string;
  description: string;
  seats: number[] | null;
  specs: SpecRow[];
  images: ProductImage[];
  is_visible: boolean;
  is_featured: boolean;
  is_selection: boolean;
  sort_order: number;
};

export const PRODUCT_COLS =
  "id, slug, category, collection, name, brand, tagline, description, seats, specs, images, is_visible, is_featured, is_selection, sort_order";

const list = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

export function rowToProduct(r: ProductRow): Product {
  return {
    slug: r.slug,
    category: r.category as CategorySlug,
    collection: r.collection ?? undefined,
    seats: r.seats?.length ? r.seats : undefined,
    name: r.name,
    brand: r.brand ?? undefined,
    tagline: { en: r.tagline },
    description: { en: r.description },
    specs: list<SpecRow>(r.specs).map((s) => ({
      group: s.group ? { en: s.group } : undefined,
      label: { en: s.label },
      value: s.value,
    })),
    images: list<ProductImage>(r.images),
    featured: r.is_featured,
    selection: r.is_selection,
  };
}

/** The other way round: used to turn the bundled catalogue into seed data. */
export function productToRow(p: Product, sortOrder: number): Omit<ProductRow, "id"> {
  return {
    slug: p.slug,
    category: p.category,
    collection: p.collection ?? null,
    name: p.name,
    brand: p.brand ?? null,
    tagline: p.tagline.en,
    description: p.description.en,
    seats: p.seats ?? null,
    specs: (p.specs ?? []).map((s) => ({ group: s.group?.en ?? "", label: s.label.en, value: s.value })),
    images: p.images ?? [],
    is_visible: true,
    is_featured: Boolean(p.featured),
    is_selection: Boolean(p.selection),
    sort_order: sortOrder,
  };
}
