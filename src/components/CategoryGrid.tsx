import Link from "next/link";
import { categories } from "@/data/categories";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function CategoryGrid({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const priority = categories.filter((c) => c.priority);
  const rest = categories.filter((c) => !c.priority);

  const card = (c: (typeof categories)[number], i: number, big: boolean) => (
    <Link
      key={c.slug}
      href={href(lang, `/products/${c.slug}`)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br ${c.tone} p-6 text-white ${
        big ? "min-h-56" : "min-h-40"
      }`}
    >
      <span className="text-[11px] tracking-widest text-white/60">
        {String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
      </span>
      <div>
        <h3 className={`font-serif ${big ? "text-3xl" : "text-xl"}`}>{dict.categories[c.slug].name}</h3>
        {big && <p className="mt-2 max-w-xs text-sm text-white/80">{dict.categories[c.slug].blurb}</p>}
        <p className="mt-4 flex items-center justify-between border-t border-white/25 pt-3 text-[11px] font-semibold uppercase tracking-widest">
          {dict.home.explore}
          <span className="transition group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">{priority.map((c, i) => card(c, i, true))}</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {rest.map((c, i) => card(c, i + priority.length, false))}
      </div>
    </div>
  );
}
