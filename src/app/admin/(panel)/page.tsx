import type { Metadata } from "next";
import NotAdminWarning from "@/components/admin/NotAdminWarning";
import ProductList, { type ListRow } from "@/components/admin/ProductList";
import { adminNames } from "@/lib/admin-names";
import { loadAdminPage } from "@/lib/admin-session";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const [{ user, isAdmin, data }, names] = await Promise.all([
    loadAdminPage(async (supabase) => {
      const { data, error } = await supabase
        .from("products")
        .select("id, slug, category, collection, name, brand, images, is_visible, is_featured, is_selection, sort_order")
        .order("sort_order")
        .order("name");
      return { rows: (data ?? []) as ListRow[], error: error?.message };
    }),
    adminNames(),
  ]);

  return (
    <>
      {!isAdmin && <NotAdminWarning email={user.email} />}
      {data.error && (
        <p className="adm-warn mb-6">
          Couldn&rsquo;t load the products: {data.error}. Has <code>supabase/migrations/0001_products.sql</code> been
          run? See SETUP.md.
        </p>
      )}
      <ProductList rows={data.rows} categories={names.categories} collections={names.collections} />
    </>
  );
}
