"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { categories } from "@/data/categories";
import type { ProductImage } from "@/data/products";
import { PRODUCTS_TAG } from "@/lib/catalog";
import { PRODUCT_BUCKET, SUPABASE_URL } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { SpecRow } from "@/lib/product-row";

/**
 * Every admin write goes through here, never straight from the browser, so the
 * public pages can be refreshed the moment something is saved. (Photo uploads
 * are the one exception: see ProductEditor.)
 *
 * Each action returns a result instead of throwing, so the panel can show
 * "Saved ✓" or a readable error next to the button.
 */
export type ActionResult = { ok: true } | { ok: false; error: string };

type Supabase = Awaited<ReturnType<typeof createClient>>;

const ok: ActionResult = { ok: true };
const fail = (error: string): ActionResult => ({ ok: false, error });

class NotAdminError extends Error {}

/**
 * Signed in AND on the admin_users allowlist. The database enforces the same
 * rule through RLS, but RLS silently filters a forbidden UPDATE to zero rows
 * rather than raising an error, so without this check an account that isn't
 * on the list would see "Saved ✓" while nothing changed.
 */
async function requireAdmin(): Promise<Supabase> {
  const supabase = await createClient();
  const [
    {
      data: { user },
    },
    { data: isAdmin },
  ] = await Promise.all([supabase.auth.getUser(), supabase.rpc("is_admin")]);
  if (!user) redirect("/admin/login");
  if (isAdmin !== true) throw new NotAdminError();
  return supabase;
}

/** Refreshes every public page that shows products, and the panel itself. */
function refreshSite() {
  updateTag(PRODUCTS_TAG);
  revalidatePath("/[lang]", "layout");
  revalidatePath("/admin", "layout");
}

/** Runs a write with the admin check, error handling and site refresh. */
async function write(fn: (supabase: Supabase) => Promise<string | void>): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const error = await fn(supabase);
    if (error) return fail(error);
  } catch (err) {
    // redirect() works by throwing: let it through.
    if (err && typeof err === "object" && "digest" in err) throw err;
    if (err instanceof NotAdminError) {
      return fail("Your account isn't allowed to change the site. See SETUP.md, step 3.");
    }
    console.error(err);
    return fail("Something went wrong. Please try again in a moment.");
  }
  refreshSite();
  return ok;
}

// ---------------------------------------------------------------- helpers --

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const id = (fd: FormData) => text(fd, "id");
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const knownCategory = (c: string) => categories.some((k) => k.slug === c);

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/, "") || "product"
  );
}

/** Where photos uploaded in the panel live; anything else must be a file under /public. */
const STORAGE_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${PRODUCT_BUCKET}/`;
const storagePath = (src: string) => (src.startsWith(STORAGE_PREFIX) ? src.slice(STORAGE_PREFIX.length) : null);

/**
 * Only photos the site can actually display: bundled files under /products/
 * or uploads in our own bucket. Any other address would make next/image
 * refuse to render the page.
 */
function parseImages(raw: string): ProductImage[] | null {
  let data: unknown;
  try {
    data = JSON.parse(raw || "[]");
  } catch {
    return null;
  }
  if (!Array.isArray(data)) return null;
  const out: ProductImage[] = [];
  for (const it of data) {
    const src = typeof it?.src === "string" ? it.src : "";
    const width = Math.round(Number(it?.width));
    const height = Math.round(Number(it?.height));
    const allowed = (src.startsWith("/products/") && !src.includes("..")) || storagePath(src);
    if (!allowed || !(width > 0) || !(height > 0)) return null;
    out.push({ src, width, height, ...(it.contain ? { contain: true } : {}) });
  }
  return out;
}

function parseSpecs(raw: string): SpecRow[] | null {
  let data: unknown;
  try {
    data = JSON.parse(raw || "[]");
  } catch {
    return null;
  }
  if (!Array.isArray(data)) return null;
  return data
    .map((s) => ({
      group: String(s?.group ?? "").trim(),
      label: String(s?.label ?? "").trim(),
      value: String(s?.value ?? "").trim(),
    }))
    .filter((s) => s.label || s.value);
}

/** "4, 5" or "4-5 people" -> [4, 5]; "" -> null; garbage -> NaN marker. */
function parseSeats(raw: string): number[] | null | "invalid" {
  if (!raw) return null;
  const nums = raw.match(/\d+/g)?.map(Number) ?? [];
  if (!nums.length || nums.some((n) => n < 1 || n > 30)) return "invalid";
  return [...new Set(nums)].sort((a, b) => a - b);
}

async function nextOrder(supabase: Supabase, category: string) {
  const { data } = await supabase
    .from("products")
    .select("sort_order")
    .eq("category", category)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  return ((data as { sort_order: number } | null)?.sort_order ?? 0) + 10;
}

async function removeFiles(supabase: Supabase, srcs: string[]) {
  const paths = srcs.map(storagePath).filter((p): p is string => !!p);
  if (!paths.length) return;
  const { error } = await supabase.storage.from(PRODUCT_BUCKET).remove(paths);
  // The product is already saved; an unused file left in the bucket is harmless.
  if (error) console.error("Could not remove photos from storage:", error.message);
}

const duplicateSlug = (msg?: string) =>
  msg?.includes("duplicate key") ? "Another product in this category already uses that web address. Pick a different one." : msg;

// --------------------------------------------------------------- products --

/** Creates a hidden draft and opens it in the editor. */
export async function createProduct(fd: FormData): Promise<ActionResult> {
  const name = text(fd, "name");
  const category = text(fd, "category");
  if (!name) return fail("Give the product a name.");
  if (!knownCategory(category)) return fail("Choose a category.");

  let newId = "";
  const res = await write(async (supabase) => {
    const base = slugify(name);
    const { data: taken } = await supabase.from("products").select("slug").eq("category", category).like("slug", `${base}%`);
    const used = new Set((taken ?? []).map((r) => r.slug as string));
    let slug = base;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        category,
        slug,
        // New products start hidden, so a half-written page never shows on
        // the live site. The client fills it in and switches it on.
        is_visible: false,
        sort_order: await nextOrder(supabase, category),
      })
      .select("id")
      .single();
    if (error) return duplicateSlug(error.message);
    newId = data.id;
  });
  if (!res.ok) return res;
  redirect(`/admin/products/${newId}`);
}

export async function saveProduct(fd: FormData): Promise<ActionResult> {
  const name = text(fd, "name");
  const slug = text(fd, "slug");
  const category = text(fd, "category");
  const collection = text(fd, "collection");
  if (!name) return fail("The name can't be empty.");
  if (!SLUG.test(slug)) return fail("The web address may only use lower-case letters, numbers and dashes, e.g. spa-touch-pro.");
  if (!knownCategory(category)) return fail("Choose a category.");
  if (collection && !SLUG.test(collection)) return fail("The collection may only use lower-case letters, numbers and dashes.");
  const seats = parseSeats(text(fd, "seats"));
  if (seats === "invalid") return fail("Write the number of people as numbers, e.g. 4, 5.");
  const specs = parseSpecs(text(fd, "specs"));
  if (!specs) return fail("The specifications couldn't be read. Reload the page and try again.");
  const images = parseImages(text(fd, "images"));
  if (!images) return fail("One of the photos couldn't be read. Remove it and upload it again.");

  return write(async (supabase) => {
    const { data: before } = await supabase.from("products").select("images").eq("id", id(fd)).maybeSingle();
    if (!before) return "This product no longer exists. It may have been deleted.";

    const { error } = await supabase
      .from("products")
      .update({
        name,
        slug,
        category,
        collection: collection || null,
        brand: text(fd, "brand") || null,
        tagline: text(fd, "tagline"),
        description: text(fd, "description"),
        seats,
        specs,
        images,
        // Unchecked checkboxes aren't submitted at all, so absence means false.
        is_visible: fd.get("is_visible") === "on",
        is_featured: fd.get("is_featured") === "on",
        is_selection: fd.get("is_selection") === "on",
      })
      .eq("id", id(fd));
    if (error) return duplicateSlug(error.message);

    // Photos removed in the editor: delete uploaded files no longer used.
    const keep = new Set(images.map((i) => i.src));
    await removeFiles(
      supabase,
      ((before.images ?? []) as ProductImage[]).map((i) => i.src).filter((s) => !keep.has(s)),
    );
  });
}

export async function toggleVisible(fd: FormData): Promise<ActionResult> {
  return write(async (supabase) => {
    const { error } = await supabase
      .from("products")
      .update({ is_visible: fd.get("next") === "true" })
      .eq("id", id(fd));
    return error?.message;
  });
}

/** Swaps places with the neighbour above/below within the same category. */
export async function moveProduct(fd: FormData): Promise<ActionResult> {
  return write(async (supabase) => {
    const { data: cur } = await supabase.from("products").select("id, category, sort_order").eq("id", id(fd)).single();
    if (!cur) return "Couldn't find the product.";
    const q = supabase.from("products").select("id, sort_order").eq("category", cur.category);
    const { data: nb } = await (fd.get("direction") === "up"
      ? q.lt("sort_order", cur.sort_order).order("sort_order", { ascending: false })
      : q.gt("sort_order", cur.sort_order).order("sort_order", { ascending: true })
    )
      .limit(1)
      .maybeSingle();
    if (!nb) return;
    const a = await supabase.from("products").update({ sort_order: nb.sort_order }).eq("id", cur.id);
    const b = await supabase.from("products").update({ sort_order: cur.sort_order }).eq("id", nb.id);
    return a.error?.message ?? b.error?.message;
  });
}

/**
 * Deletes the product, then its uploaded photos. Row first: if removing the
 * files fails, the product is already off the site and what's left is unused
 * files, which is better than a product pointing at missing photos.
 */
export async function deleteProduct(fd: FormData): Promise<ActionResult> {
  const res = await write(async (supabase) => {
    const { data: product } = await supabase.from("products").select("images").eq("id", id(fd)).maybeSingle();
    const { error } = await supabase.from("products").delete().eq("id", id(fd));
    if (error) return error.message;
    await removeFiles(supabase, ((product?.images ?? []) as ProductImage[]).map((i) => i.src));
  });
  if (!res.ok) return res;
  redirect("/admin");
}

// ------------------------------------------------------------------- auth --

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
