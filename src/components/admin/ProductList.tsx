"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createProduct, moveProduct, toggleVisible } from "@/app/admin/actions";
import type { ProductImage } from "@/data/products";
import { Status, useAction } from "./useAction";

export type ListRow = {
  id: string;
  slug: string;
  category: string;
  collection: string | null;
  name: string;
  brand: string | null;
  images: ProductImage[];
  is_visible: boolean;
  is_featured: boolean;
  is_selection: boolean;
  sort_order: number;
};

type Props = {
  rows: ListRow[];
  categories: { slug: string; name: string }[];
  collections: Record<string, string>;
};

/** Lower case without accents, so "octeo" finds "Octéo". */
const plain = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** All products, grouped by category, with search, show/hide and reordering. */
export default function ProductList({ rows, categories, collections }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);

  const groups = useMemo(() => {
    const q = plain(query.trim());
    const match = (r: ListRow) =>
      (!category || r.category === category) &&
      (!q || [r.name, r.brand, r.slug, r.collection && collections[r.collection]].some((v) => v && plain(v).includes(q)));
    return categories
      .map((c) => ({ ...c, rows: rows.filter((r) => r.category === c.slug && match(r)) }))
      .filter((g) => g.rows.length > 0);
  }, [rows, categories, collections, query, category]);

  const total = rows.length;
  const hidden = rows.filter((r) => !r.is_visible).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">Products</h1>
          <p className="mt-1 text-sm text-navy/60">
            {total} products{hidden ? `, ${hidden} hidden from the site` : ""}
          </p>
        </div>
        <button className="adm-btn adm-btn--primary" onClick={() => setAdding((v) => !v)} aria-expanded={adding}>
          + Add product
        </button>
      </div>

      {adding && <NewProductForm categories={categories} defaultCategory={category} onCancel={() => setAdding(false)} />}

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          className="adm-input max-w-xs"
          type="search"
          placeholder="Search by name, brand…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
        <select className="adm-input max-w-xs" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} ({rows.filter((r) => r.category === c.slug).length})
            </option>
          ))}
        </select>
      </div>

      {groups.length === 0 && <p className="mt-10 text-navy/60">{total ? "No products match." : "No products yet."}</p>}

      {groups.map((g) => (
        <section key={g.slug} className="mt-8">
          <h2 className="mb-2 text-lg text-navy">
            {g.name} <span className="text-sm font-normal text-navy/50">({g.rows.length})</span>
          </h2>
          <ul className="adm-card divide-y divide-line overflow-hidden">
            {g.rows.map((r, i) => (
              <Row
                key={r.id}
                row={r}
                collection={r.collection ? collections[r.collection] ?? r.collection : null}
                // Reordering only makes sense on the full, unfiltered list.
                canMove={!query.trim()}
                first={i === 0}
                last={i === g.rows.length - 1}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Row({ row, collection, canMove, first, last }: { row: ListRow; collection: string | null; canMove: boolean; first: boolean; last: boolean }) {
  const { pending, error, click } = useAction();
  const cover = row.images?.[0];

  return (
    <li className={`flex flex-wrap items-center gap-3 px-3 py-2.5 sm:flex-nowrap ${pending ? "opacity-60" : ""}`}>
      <div className={`h-12 w-16 shrink-0 overflow-hidden rounded ${cover?.contain ? "bg-white" : "bg-sand"}`}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover.src} alt="" loading="lazy" className={`h-full w-full ${cover.contain ? "object-contain" : "object-cover"}`} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <Link href={`/admin/products/${row.id}`} className="font-semibold text-navy hover:underline">
          {row.name}
        </Link>
        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-navy/55">
          {row.brand && <span>{row.brand}</span>}
          {row.brand && collection && <span>·</span>}
          {collection && <span>{collection}</span>}
          {!row.is_visible && <span className="adm-badge adm-badge--hidden">Hidden</span>}
          {row.is_featured && <span className="adm-badge">Home page</span>}
          {row.is_selection && <span className="adm-badge">Our selection</span>}
        </div>
        {error && <Status saved={false} error={error} />}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {canMove && (
          <>
            <button className="adm-btn adm-btn--sm" disabled={first || pending} onClick={() => click(moveProduct, { id: row.id, direction: "up" })} aria-label={`Move ${row.name} up`} title="Move up">
              ↑
            </button>
            <button className="adm-btn adm-btn--sm" disabled={last || pending} onClick={() => click(moveProduct, { id: row.id, direction: "down" })} aria-label={`Move ${row.name} down`} title="Move down">
              ↓
            </button>
          </>
        )}
        <button
          className="adm-btn adm-btn--sm w-16"
          disabled={pending}
          onClick={() => click(toggleVisible, { id: row.id, next: String(!row.is_visible) })}
          title={row.is_visible ? "Hide from the site" : "Show on the site"}
        >
          {row.is_visible ? "Hide" : "Show"}
        </button>
        <Link href={`/admin/products/${row.id}`} className="adm-btn adm-btn--sm">
          Edit
        </Link>
      </div>
    </li>
  );
}

function NewProductForm({ categories, defaultCategory, onCancel }: { categories: Props["categories"]; defaultCategory: string; onCancel: () => void }) {
  const { pending, error, run } = useAction();
  return (
    <form
      className="adm-card mt-4 grid gap-4 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        run(createProduct, new FormData(e.currentTarget));
      }}
    >
      <div>
        <label className="adm-label" htmlFor="new-name">Name</label>
        <input id="new-name" name="name" className="adm-input" required autoFocus placeholder="e.g. Touch Pro Hot Tub" />
      </div>
      <div>
        <label className="adm-label" htmlFor="new-category">Category</label>
        <select id="new-category" name="category" className="adm-input" required defaultValue={defaultCategory}>
          <option value="" disabled>Choose…</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button className="adm-btn adm-btn--primary" type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create"}
        </button>
        <button className="adm-btn" type="button" onClick={onCancel}>Cancel</button>
      </div>
      <p className="adm-hint sm:col-span-3">
        The new product starts hidden. You&rsquo;ll fill in its details and photos on the next page, then switch it on.
      </p>
      {error && <div className="sm:col-span-3"><Status saved={false} error={error} /></div>}
    </form>
  );
}
