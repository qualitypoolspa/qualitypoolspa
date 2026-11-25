"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ProductCard } from "./ProductCard";
import type { ProductCardData } from "@/data/products";
import type { Locale } from "@/i18n/config";

type Group = { key: string; name: string; intro?: string; items: ProductCardData[] };
type Labels = {
  sample: string;
  allSizes: string;
  forPeopleShort: string; // "{n} people"
  showing: string; // "{count} spas for {n} people"
};

// The URL hash drives the view: "#for-4" filters by size, "#exclusive-line" jumps to a group.
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

function setHash(hash: string) {
  const url = hash ? `#${hash}` : window.location.pathname;
  history.pushState(null, "", url);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

/** Products of a category, grouped into collections, with an optional size filter. */
export function CategoryBrowser({ groups, seats, lang, labels }: { groups: Group[]; seats: number[]; lang: Locale; labels: Labels }) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const size = /^for-(\d+)$/.exec(hash)?.[1];
  const n = size ? Number(size) : null;

  // After switching back from a size filter to a group link, scroll to the group.
  useEffect(() => {
    if (hash && !n) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash, n]);

  // Every product once, in group order (a product can be in "Our selection" and a collection).
  const all = [...new Map(groups.flatMap((g) => g.items).map((p) => [p.slug, p])).values()];
  const filtered = n ? all.filter((p) => p.seats?.includes(n)) : [];

  const chip = (active: boolean) =>
    `border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition duration-300 ${
      active ? "border-navy bg-navy text-paper" : "border-line text-navy hover:border-navy"
    }`;

  return (
    <>
      {seats.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group">
          <button type="button" className={chip(!n)} onClick={() => setHash("")}>
            {labels.allSizes}
          </button>
          {seats.map((s) => (
            <button key={s} type="button" className={chip(n === s)} onClick={() => setHash(`for-${s}`)}>
              {labels.forPeopleShort.replace("{n}", String(s))}
            </button>
          ))}
        </div>
      )}

      {n ? (
        <div id={`for-${n}`} className="scroll-mt-28">
          <p className="mb-8 text-sm text-navy/60">
            {labels.showing.replace("{count}", String(filtered.length)).replace("{n}", String(n))}
          </p>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} lang={lang} sampleLabel={labels.sample} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {groups.length > 1 && (
            <nav className="mb-12 flex flex-wrap gap-x-5 gap-y-2 border-b border-line pb-6 text-sm">
              {groups.map((g) => (
                <a key={g.key} href={`#${g.key}`} className="link-line text-navy/70 hover:text-navy">
                  {g.name} <span className="text-navy/35">{g.items.length}</span>
                </a>
              ))}
            </nav>
          )}
          <div className="space-y-20">
            {groups.map((g) => (
              <div key={g.key} id={g.key} className="scroll-mt-28">
                {groups.length > 1 && <h2 data-reveal="up" className="font-serif text-4xl text-navy md:text-5xl">{g.name}</h2>}
                {g.intro && <p className="mt-2 text-sm text-navy/60">{g.intro}</p>}
                <div className={`grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${groups.length > 1 ? "mt-10" : ""}`}>
                  {g.items.map((p) => (
                    <ProductCard key={p.slug} product={p} lang={lang} sampleLabel={labels.sample} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
