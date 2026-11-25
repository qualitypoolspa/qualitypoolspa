import { cache } from "react";
import { unstable_cache } from "next/cache";
import { categories, type CategorySlug } from "@/data/categories";
import { bundledProducts, featuredSlugs, selectionSlugs, type Product } from "@/data/products";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { COLUMN_SETS, rowToProduct, type ProductRow } from "@/lib/product-row";

/** Cache tag for the catalogue; the admin panel expires it on every save. */
export const PRODUCTS_TAG = "products";

const knownCategory = new Set<string>(categories.map((c) => c.slug));

/**
 * The live catalogue from Supabase: visible products in the client's order.
 * Cached across requests and refreshed whenever the client saves in /admin
 * (and hourly as a safety net). Throws if the database can't be read.
 */
const loadLive = unstable_cache(
  async (): Promise<Product[]> => {
    const query = (cols: string) =>
      createPublicClient().from("products").select(cols).eq("is_visible", true).order("sort_order").order("name");
    // Newest schema first. Until a translation migration has been run, read
    // without its columns: those languages then show the English product
    // texts, rather than the whole site falling back to a stale copy.
    let data: unknown[] | null = null;
    let error: { message: string } | null = null;
    for (const set of COLUMN_SETS) {
      ({ data, error } = await query(set.cols));
      if (!error) break;
    }
    if (error || !data) {
      // Thrown, not returned: a failed read must not be cached, or the site
      // would keep showing the bundled copy for an hour after it's fixed.
      throw new Error(error?.message ?? "No data");
    }
    return (data as unknown as ProductRow[]).filter((r) => knownCategory.has(r.category)).map(rowToProduct);
  },
  ["products-live"],
  { tags: [PRODUCTS_TAG], revalidate: 3600 },
);

export type Catalog = ReturnType<typeof makeCatalog>;

function makeCatalog(products: Product[], isLive: boolean) {
  // The bundled copy keeps its hand-picked order; the database uses the order set in /admin.
  const ordered = (list: Product[], slugs: string[]) =>
    isLive ? list : [...list].sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));

  const productsIn = (category: CategorySlug) => products.filter((p) => p.category === category);

  return {
    products,
    isLive,
    productsIn,
    getProduct: (category: string, slug: string) =>
      products.find((p) => p.category === category && p.slug === slug),
    /** The client's selection within a category. */
    selectionIn: (category: CategorySlug) =>
      ordered(
        productsIn(category).filter((p) => p.selection),
        selectionSlugs,
      ),
    /** Home page "Popular products", topped up with other photographed products. */
    featuredProducts: (n = 3) => {
      const picked = ordered(
        products.filter((p) => p.featured),
        featuredSlugs,
      );
      const fill = products.filter((p) => p.images?.length && !picked.includes(p));
      return [...picked, ...fill].slice(0, n);
    },
  };
}

/**
 * The catalogue for this render. Falls back to the bundled copy when Supabase
 * isn't set up or can't be reached: a stale catalogue beats an empty site.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  if (isSupabaseConfigured) {
    try {
      return makeCatalog(await loadLive(), true);
    } catch (err) {
      console.error("Could not load products from Supabase, showing the bundled catalogue:", err);
    }
  }
  return makeCatalog(bundledProducts, false);
});
