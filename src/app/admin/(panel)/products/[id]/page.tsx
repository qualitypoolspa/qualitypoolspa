import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NotAdminWarning from "@/components/admin/NotAdminWarning";
import ProductEditor from "@/components/admin/ProductEditor";
import { adminNames } from "@/lib/admin-names";
import { loadAdminPage } from "@/lib/admin-session";
import { PRODUCT_COLS, PRODUCT_COLS_BASE, type ProductRow } from "@/lib/product-row";

export const metadata: Metadata = { title: "Edit product" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const [{ user, isAdmin, data }, names] = await Promise.all([
    loadAdminPage(async (supabase) => {
      const one = (cols: string) => supabase.from("products").select(cols).eq("id", id).maybeSingle();
      const [full, all] = await Promise.all([
        one(PRODUCT_COLS),
        // For the collection menu: which collections each category already uses.
        supabase.from("products").select("category, collection").not("collection", "is", null),
      ]);
      // Before migration 0002 the translation columns don't exist: load without them.
      const product = full.error ? await one(PRODUCT_COLS_BASE) : full;
      return { product: product.data as unknown as ProductRow | null, hasTranslations: !full.error, used: (all.data ?? []) as { category: string; collection: string }[] };
    }),
    adminNames(),
  ]);
  if (!data.product) notFound();

  const collectionsByCategory: Record<string, string[]> = {};
  for (const { category, collection } of data.used) {
    const list = (collectionsByCategory[category] ??= []);
    if (!list.includes(collection)) list.push(collection);
  }

  return (
    <>
      <Link href="/admin" className="text-sm text-navy/60 hover:text-navy">
        ← All products
      </Link>
      {!isAdmin && (
        <div className="mt-4">
          <NotAdminWarning email={user.email} />
        </div>
      )}
      <ProductEditor
        key={data.product.id}
        product={data.product}
        categories={names.categories}
        collectionNames={names.collections}
        collectionsByCategory={collectionsByCategory}
        hasTranslations={data.hasTranslations}
      />
    </>
  );
}
