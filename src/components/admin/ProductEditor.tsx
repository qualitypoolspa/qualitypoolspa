"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { deleteProduct, saveProduct } from "@/app/admin/actions";
import type { ProductImage } from "@/data/products";
import type { ProductRow, SpecRow } from "@/lib/product-row";
import { createClient } from "@/lib/supabase/client";
import { PRODUCT_BUCKET } from "@/lib/supabase/config";
import { Status, useAction } from "./useAction";

type Props = {
  product: ProductRow;
  categories: { slug: string; name: string }[];
  collectionNames: Record<string, string>;
  collectionsByCategory: Record<string, string[]>;
};

type Form = {
  name: string;
  slug: string;
  category: string;
  collection: string;
  brand: string;
  tagline: string;
  description: string;
  seats: string;
  specs: SpecRow[];
  images: ProductImage[];
  is_visible: boolean;
  is_featured: boolean;
  is_selection: boolean;
};

const fromRow = (p: ProductRow): Form => ({
  name: p.name,
  slug: p.slug,
  category: p.category,
  collection: p.collection ?? "",
  brand: p.brand ?? "",
  tagline: p.tagline,
  description: p.description,
  seats: (p.seats ?? []).join(", "),
  specs: Array.isArray(p.specs) ? p.specs : [],
  images: Array.isArray(p.images) ? p.images : [],
  is_visible: p.is_visible,
  is_featured: p.is_featured,
  is_selection: p.is_selection,
});

/** Moves item i of a list by `by` places (-1 = up/left, 1 = down/right). */
function move<T>(list: T[], i: number, by: number): T[] {
  const j = i + by;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export default function ProductEditor({ product, categories, collectionNames, collectionsByCategory }: Props) {
  const [saved, setSaved] = useState(() => fromRow(product));
  const [form, setForm] = useState(saved);
  const save = useAction();
  const remove = useAction();
  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);
  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const collectionOptions = useMemo(() => {
    const keys = [...(collectionsByCategory[form.category] ?? [])];
    if (form.collection && !keys.includes(form.collection)) keys.push(form.collection);
    const order = Object.keys(collectionNames);
    return keys.sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  }, [collectionsByCategory, collectionNames, form.category, form.collection]);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("id", product.id);
    for (const key of ["name", "slug", "category", "collection", "brand", "tagline", "description", "seats"] as const) {
      fd.set(key, form[key]);
    }
    if (form.is_visible) fd.set("is_visible", "on");
    if (form.is_featured) fd.set("is_featured", "on");
    if (form.is_selection) fd.set("is_selection", "on");
    fd.set("specs", JSON.stringify(form.specs));
    fd.set("images", JSON.stringify(form.images));
    const sent = form;
    save.run(saveProduct, fd, () => setSaved(sent));
  }

  function onDelete() {
    if (!window.confirm(`Delete “${saved.name}” for good? This can't be undone.\n\nTip: “Hide” keeps it but takes it off the site.`)) return;
    remove.click(deleteProduct, { id: product.id });
  }

  const liveUrl = `/en/products/${saved.category}/${saved.slug}`;
  const busy = save.pending || remove.pending;

  return (
    <form onSubmit={onSave} className="mt-4 pb-28">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl text-navy">{saved.name}</h1>
          <p className="mt-1 text-sm text-navy/60">
            {saved.is_visible ? (
              <a href={liveUrl} target="_blank" rel="noopener" className="underline hover:text-navy">
                View on the site ↗
              </a>
            ) : (
              <span className="adm-badge adm-badge--hidden">Hidden from the site</span>
            )}
          </p>
        </div>
        <button type="button" className="adm-btn adm-btn--danger" onClick={onDelete} disabled={busy}>
          {remove.pending ? "Deleting…" : "Delete product"}
        </button>
      </div>
      {remove.error && <p className="mt-2"><Status saved={false} error={remove.error} /></p>}

      {/* ---------- On the site ---------- */}
      <section className="adm-card mt-6 space-y-3 p-5">
        <h2 className="text-base text-navy">On the site</h2>
        <label className="adm-check">
          <input type="checkbox" checked={form.is_visible} onChange={(e) => set("is_visible", e.target.checked)} />
          <span>
            <strong>Show on the site</strong>
            <span className="adm-hint block">Untick to hide the product without deleting it.</span>
          </span>
        </label>
        <label className="adm-check">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} />
          <span>
            <strong>Popular products on the home page</strong>
            <span className="adm-hint block">The home page shows six; ticked products come first.</span>
          </span>
        </label>
        <label className="adm-check">
          <input type="checkbox" checked={form.is_selection} onChange={(e) => set("is_selection", e.target.checked)} />
          <span>
            <strong>Our selection</strong>
            <span className="adm-hint block">Shown first on its category page, under &ldquo;{collectionNames.selection}&rdquo;.</span>
          </span>
        </label>
      </section>

      {/* ---------- Details ---------- */}
      <section className="adm-card mt-6 grid gap-4 p-5 md:grid-cols-2">
        <h2 className="text-base text-navy md:col-span-2">Details</h2>
        <Field label="Name" id="name">
          <input id="name" className="adm-input" required value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Brand" id="brand" hint="Shown above the name, e.g. AstralPool. Leave empty for none.">
          <input id="brand" className="adm-input" value={form.brand} onChange={(e) => set("brand", e.target.value)} />
        </Field>
        <Field label="Category" id="category">
          <select
            id="category"
            className="adm-input"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value, collection: "" }))}
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Collection" id="collection" hint="The group it's listed under on the category page.">
          <select id="collection" className="adm-input" value={form.collection} onChange={(e) => set("collection", e.target.value)}>
            <option value="">None</option>
            {collectionOptions.map((k) => (
              <option key={k} value={k}>{collectionNames[k] ?? k}</option>
            ))}
          </select>
        </Field>
        {form.category === "spas" && (
          <Field label="Number of people" id="seats" hint="For the size filter, e.g. 4 or 4, 5.">
            <input id="seats" className="adm-input" inputMode="numeric" value={form.seats} onChange={(e) => set("seats", e.target.value)} />
          </Field>
        )}
        <Field
          label="Web address"
          id="slug"
          hint={`qualitypoolspa.es/en/products/${form.category}/${form.slug || "…"} — changing it breaks old links to this product.`}
        >
          <input
            id="slug"
            className="adm-input font-mono text-sm"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lower-case letters, numbers and dashes only"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Short description" id="tagline" hint="One sentence. Shown on product cards and under the name.">
            <textarea id="tagline" className="adm-input" rows={2} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Description" id="description" hint="The main text on the product page.">
            <textarea id="description" className="adm-input" rows={8} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
        </div>
      </section>

      <Photos
        productId={product.id}
        images={form.images}
        onChange={(images) => set("images", images)}
        // Uploads finish one by one, so each is added to the latest list.
        onAdd={(img) => setForm((f) => ({ ...f, images: [...f.images, img] }))}
      />
      <Specs specs={form.specs} onChange={(specs) => set("specs", specs)} />

      {/* ---------- Save bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <button type="submit" className="adm-btn adm-btn--primary" disabled={busy || !dirty}>
            {save.pending ? "Saving…" : "Save changes"}
          </button>
          {dirty && !save.pending && (
            <button type="button" className="adm-btn" onClick={() => setForm(saved)}>
              Undo changes
            </button>
          )}
          <Status saved={save.saved} error={save.error} />
          {dirty && !save.error && !save.pending && <span className="text-sm text-navy/60">Unsaved changes</span>}
        </div>
      </div>
    </form>
  );
}

function Field({ label, id, hint, children }: { label: string; id: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="adm-label" htmlFor={id}>{label}</label>
      {children}
      {hint && <p className="adm-hint">{hint}</p>}
    </div>
  );
}

// ---------------------------------------------------------------- photos --

const MAX_SIDE = 2000;

/**
 * Shrinks a photo in the browser before uploading: phone photos are 5–10 MB,
 * which would make the site slow. WebP where the browser can make it, JPEG
 * otherwise.
 */
async function prepare(file: File): Promise<{ blob: Blob; width: number; height: number; ext: string }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const encode = (type: string) => new Promise<Blob | null>((res) => canvas.toBlob(res, type, 0.85));
  let blob = await encode("image/webp");
  if (!blob || blob.type !== "image/webp") blob = await encode("image/jpeg");
  if (!blob) throw new Error("Couldn't read the photo.");
  return { blob, width, height, ext: blob.type === "image/webp" ? "webp" : "jpg" };
}

type PhotosProps = {
  productId: string;
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  onAdd: (image: ProductImage) => void;
};

function Photos({ productId, images, onChange, onAdd }: PhotosProps) {
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const supabase = createClient();
    const list = [...files].filter((f) => f.type.startsWith("image/"));
    setUploading(list.length);
    for (const file of list) {
      try {
        const { blob, width, height, ext } = await prepare(file);
        const path = `${productId}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(PRODUCT_BUCKET)
          .upload(path, blob, { contentType: blob.type, cacheControl: "31536000" });
        if (upErr) throw new Error(upErr.message);
        const src = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path).data.publicUrl;
        onAdd({ src, width, height });
      } catch (err) {
        setError(`${file.name}: ${err instanceof Error ? err.message : "upload failed"}`);
      }
      setUploading((n) => n - 1);
    }
    if (input.current) input.current.value = "";
  }

  return (
    <section className="adm-card mt-6 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base text-navy">Photos</h2>
          <p className="adm-hint">The first photo is the cover on product cards. Remember to save after changes.</p>
        </div>
        <label className={`adm-btn ${uploading ? "pointer-events-none opacity-50" : ""}`}>
          {uploading ? `Uploading ${uploading}…` : "+ Upload photos"}
          <input ref={input} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => upload(e.target.files)} />
        </label>
      </div>
      {error && <p className="mt-3"><Status saved={false} error={error} /></p>}

      {images.length === 0 ? (
        <p className="mt-4 text-sm text-navy/60">No photos yet. The site shows the product name on a plain background instead.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <li key={img.src} className="overflow-hidden rounded-lg border border-line">
              <div className={`relative aspect-[4/3] ${img.contain ? "bg-white" : "bg-sand"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" className={`absolute inset-0 h-full w-full ${img.contain ? "object-contain p-2" : "object-cover"}`} />
                {i === 0 && <span className="adm-badge absolute left-2 top-2">Cover</span>}
              </div>
              <div className="space-y-2 p-2">
                <label className="adm-check text-xs">
                  <input
                    type="checkbox"
                    checked={!!img.contain}
                    onChange={(e) => onChange(images.map((x, j) => (j === i ? { ...x, contain: e.target.checked || undefined } : x)))}
                  />
                  <span>Show whole product on white</span>
                </label>
                <div className="flex gap-1">
                  <button type="button" className="adm-btn adm-btn--sm" disabled={i === 0} onClick={() => onChange(move(images, i, -1))} aria-label="Move photo left" title="Move left">←</button>
                  <button type="button" className="adm-btn adm-btn--sm" disabled={i === images.length - 1} onClick={() => onChange(move(images, i, 1))} aria-label="Move photo right" title="Move right">→</button>
                  {i > 0 && (
                    <button type="button" className="adm-btn adm-btn--sm" onClick={() => onChange([img, ...images.filter((_, j) => j !== i)])}>
                      Make cover
                    </button>
                  )}
                  <button type="button" className="adm-btn adm-btn--sm adm-btn--danger ml-auto" onClick={() => onChange(images.filter((_, j) => j !== i))} aria-label="Remove photo" title="Remove">
                    ✕
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ----------------------------------------------------------------- specs --

function Specs({ specs, onChange }: { specs: SpecRow[]; onChange: (specs: SpecRow[]) => void }) {
  const update = (i: number, key: keyof SpecRow, value: string) => onChange(specs.map((s, j) => (j === i ? { ...s, [key]: value } : s)));
  const groups = [...new Set(specs.map((s) => s.group).filter(Boolean))];

  return (
    <section className="adm-card mt-6 p-5">
      <h2 className="text-base text-navy">Specifications</h2>
      <p className="adm-hint">
        Rows with the same group are shown together under that heading, e.g. &ldquo;General&rdquo;. Empty rows are
        left out when you save.
      </p>
      <datalist id="spec-groups">
        {groups.map((g) => <option key={g} value={g} />)}
      </datalist>

      {specs.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="hidden grid-cols-[9rem_1fr_1.4fr_auto] gap-2 text-xs font-semibold text-navy/60 md:grid">
            <span>Group</span><span>Label</span><span>Value</span><span className="w-[6.5rem]" />
          </div>
          {specs.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 border-b border-line pb-2 md:grid-cols-[9rem_1fr_1.4fr_auto] md:border-0 md:pb-0">
              <input className="adm-input text-sm" list="spec-groups" placeholder="Group" aria-label={`Row ${i + 1} group`} value={s.group} onChange={(e) => update(i, "group", e.target.value)} />
              <input className="adm-input text-sm" placeholder="Label, e.g. Weight" aria-label={`Row ${i + 1} label`} value={s.label} onChange={(e) => update(i, "label", e.target.value)} />
              <input className="adm-input col-span-2 text-sm md:col-span-1" placeholder="Value, e.g. 261 kg" aria-label={`Row ${i + 1} value`} value={s.value} onChange={(e) => update(i, "value", e.target.value)} />
              <div className="col-span-2 flex gap-1 md:col-span-1">
                <button type="button" className="adm-btn adm-btn--sm" disabled={i === 0} onClick={() => onChange(move(specs, i, -1))} aria-label={`Move row ${i + 1} up`}>↑</button>
                <button type="button" className="adm-btn adm-btn--sm" disabled={i === specs.length - 1} onClick={() => onChange(move(specs, i, 1))} aria-label={`Move row ${i + 1} down`}>↓</button>
                <button type="button" className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => onChange(specs.filter((_, j) => j !== i))} aria-label={`Remove row ${i + 1}`}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        className="adm-btn mt-4"
        onClick={() => onChange([...specs, { group: specs.at(-1)?.group ?? "", label: "", value: "" }])}
      >
        + Add row
      </button>
    </section>
  );
}
