"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GalleryTile = {
  id: string;
  category: string;
  title: string;
  location?: string;
  image?: string;
  width: number;
  height: number;
  tone: string;
  sample?: boolean;
};

type Props = {
  items: GalleryTile[];
  filters: { slug: string; name: string }[];
  labels: { all: string; close: string; prev: string; next: string; sample: string };
};

export function GalleryGrid({ items, filters, labels }: Props) {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = active === "all" ? items : items.filter((i) => i.category === active);
  const move = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  const current = open === null ? null : shown[open];

  const visual = (t: GalleryTile, sizes: string) =>
    t.image ? (
      <Image src={t.image} alt={t.title} width={t.width} height={t.height} sizes={sizes} className="h-full w-full object-cover" />
    ) : (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${t.tone}`} aria-hidden="true">
        <span className="px-4 text-center font-serif text-lg italic text-white/70">{t.title}</span>
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist">
        {[{ slug: "all", name: labels.all }, ...filters].map((f) => (
          <button
            key={f.slug}
            type="button"
            role="tab"
            aria-selected={active === f.slug}
            onClick={() => {
              setActive(f.slug);
              setOpen(null);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              active === f.slug
                ? "border-teal bg-teal text-white"
                : "border-line bg-white text-navy hover:border-teal"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t, i) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg text-left"
              aria-label={t.title}
            >
              {visual(t, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="block text-sm font-semibold">{t.title}</span>
                {t.location && <span className="block text-xs text-white/75">{t.location}</span>}
              </span>
              {t.sample && (
                <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
                  {labels.sample}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">{visual(current, "100vw")}</div>
            <p className="mt-3 text-center text-sm text-white">
              {current.title}
              {current.location && <span className="text-white/60"> · {current.location}</span>}
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-white text-navy shadow"
              aria-label={labels.close}
            >
              ✕
            </button>
            {shown.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 text-navy shadow"
                  aria-label={labels.prev}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 text-navy shadow"
                  aria-label={labels.next}
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
