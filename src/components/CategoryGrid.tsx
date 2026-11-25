import Image from "next/image";
import Link from "next/link";
import { categories, type CategorySlug } from "@/data/categories";
import { categoryImages } from "@/data/home";
import { productsIn } from "@/data/products";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { slug: CategorySlug; lang: Locale; dict: Dictionary; className?: string; large?: boolean; delay?: number };

/** A category tile: photo with a wipe-in reveal, or a typographic tile when there's no photo yet. */
export function Tile({ slug, lang, dict, className = "", large = false, delay = 0 }: Props) {
  const img = categoryImages[slug];
  const count = productsIn(slug).length;
  const name = dict.categories[slug].name;
  const style = { "--d": `${delay}ms` } as React.CSSProperties;

  if (!img) {
    return (
      <Link
        href={href(lang, `/products/${slug}`)}
        data-reveal="up"
        style={style}
        className={`group flex flex-col justify-between border border-line p-7 transition-colors duration-500 hover:bg-navy hover:text-paper ${className}`}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-navy/50 group-hover:text-paper/60">
          {count > 0 ? dict.home.models.replace("{n}", String(count)) : dict.home.explore}
        </span>
        <span>
          <span className="block font-serif text-3xl md:text-4xl">{name}</span>
          <span className="mt-2 block max-w-xs text-sm text-navy/60 group-hover:text-paper/70">{dict.categories[slug].blurb}</span>
        </span>
      </Link>
    );
  }

  return (
    <Link href={href(lang, `/products/${slug}`)} className={`group relative block overflow-hidden bg-ink text-white ${className}`}>
      <div data-reveal="img" style={style} className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src={img}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,13,15,0.75),rgba(8,13,15,0.05)_55%)]" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
        <div>
          {count > 0 && (
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">{dict.home.models.replace("{n}", String(count))}</span>
          )}
          <h3 className={`mt-1 font-serif ${large ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>{name}</h3>
        </div>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 transition duration-500 group-hover:bg-white group-hover:text-navy"
        >
          →
        </span>
      </div>
    </Link>
  );
}

/** Tiles for a given set of categories (e.g. one menu group). */
export function CategoryTiles({ slugs, lang, dict }: { slugs: readonly string[]; lang: Locale; dict: Dictionary }) {
  const list = categories.filter((c) => slugs.includes(c.slug));
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((c, i) => (
        <Tile key={c.slug} slug={c.slug} lang={lang} dict={dict} className="aspect-[4/5] sm:aspect-[4/4.5]" delay={i * 90} />
      ))}
    </div>
  );
}
