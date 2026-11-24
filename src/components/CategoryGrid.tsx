import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { categoryImage } from "@/lib/assets";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Cat = (typeof categories)[number];

// Tall, image-led tiles. Uses /public/categories/<slug>.jpg when present.
function Tile({ c, lang, dict, big }: { c: Cat; lang: Locale; dict: Dictionary; big: boolean }) {
  const img = categoryImage(c.slug);
  return (
    <Link
      href={href(lang, `/products/${c.slug}`)}
      className={`reveal group relative isolate flex overflow-hidden bg-ink text-white ${
        big ? "aspect-[4/5]" : "aspect-[5/4]"
      }`}
    >
      {img ? (
        <Image
          src={img}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="-z-10 object-cover transition duration-[900ms] group-hover:scale-105"
        />
      ) : (
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${c.tone} transition duration-[900ms] group-hover:scale-105`} />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="mt-auto w-full p-6 md:p-8">
        <h3 className={`font-serif leading-tight ${big ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
          {dict.categories[c.slug].name}
        </h3>
        {big && <p className="mt-2 max-w-xs text-sm text-white/75">{dict.categories[c.slug].blurb}</p>}
        <span className="mt-5 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition group-hover:gap-4">
          {dict.home.explore} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export function CategoryGrid({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const priority = categories.filter((c) => c.priority);
  const rest = categories.filter((c) => !c.priority);
  return (
    <div className="space-y-4 md:space-y-5">
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {priority.map((c) => (
          <Tile key={c.slug} c={c} lang={lang} dict={dict} big />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {rest.map((c) => (
          <Tile key={c.slug} c={c} lang={lang} dict={dict} big={false} />
        ))}
      </div>
    </div>
  );
}
