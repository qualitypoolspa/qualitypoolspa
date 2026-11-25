import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBrowser } from "@/components/CategoryBrowser";
import { ContactButtons } from "@/components/ContactButtons";
import { PoolBuilder } from "@/components/PoolBuilder";
import { builderCategories, categories, getCategory } from "@/data/categories";
import { categoryImages } from "@/data/home";
import { productsIn, selectionIn, toCard } from "@/data/products";
import { hasLocale, href, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const generateStaticParams = () =>
  locales.flatMap((lang) => categories.map((c) => ({ lang, category: c.slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[category]">): Promise<Metadata> {
  const { lang, category } = await params;
  const cat = getCategory(category);
  if (!hasLocale(lang) || !cat) return {};
  const dict = await getDictionary(lang);
  return { title: dict.categories[cat.slug].name, description: dict.categories[cat.slug].blurb };
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/products/[category]">) {
  const { lang, category } = await params;
  const cat = getCategory(category);
  if (!hasLocale(lang) || !cat) notFound();
  const dict = await getDictionary(lang);
  const items = productsIn(cat.slug);
  const names = dict.collections as Record<string, string>;

  // Group by collection in the order defined in the dictionary; ungrouped products last.
  const order = Object.keys(names);
  const byKey = new Map<string, typeof items>();
  for (const p of items) byKey.set(p.collection ?? "other", [...(byKey.get(p.collection ?? "other") ?? []), p]);
  const groups = [...byKey]
    .sort(([a], [b]) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99))
    .map(([key, list]) => ({ key, name: names[key] ?? dict.categories[cat.slug].name, items: list.map((p) => toCard(p, lang)) }));
  // The client's hand-picked models go first (they also stay in their own collection).
  const selection = selectionIn(cat.slug);
  if (selection.length) {
    groups.unshift({
      key: "selection",
      name: names.selection,
      items: selection.map((p) => toCard(p, lang)),
      ...{ intro: dict.products.selectionIntro },
    });
  }
  const seats = [...new Set(items.flatMap((p) => p.seats ?? []))].sort((a, b) => a - b);
  const isBuilder = builderCategories.includes(cat.slug);
  const heroImg = categoryImages[cat.slug];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {heroImg && (
          <>
            <Image src={heroImg} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ animation: "drift 12s linear both" }} />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(8,13,15,0.85),rgba(8,13,15,0.3))]" />
          </>
        )}
        <div className={`mx-auto max-w-[90rem] px-5 md:px-8 ${heroImg ? "pb-16 pt-40 md:pb-20 md:pt-56" : "pb-14 pt-20 md:pb-16 md:pt-24"}`}>
          <Link href={href(lang, "/products")} className="link-line fade-in text-[11px] uppercase tracking-[0.2em] text-white/70">
            ← {dict.products.backToProducts}
          </Link>
          <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">
            <span className="line-mask">
              <span style={{ "--d": "150ms" } as React.CSSProperties}>{dict.categories[cat.slug].name}</span>
            </span>
          </h1>
          <p className="fade-in mt-5 max-w-xl text-white/75" style={{ "--d": "500ms" } as React.CSSProperties}>
            {dict.categories[cat.slug].blurb}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-16 md:px-8 md:py-20">
        {isBuilder ? (
          <PoolBuilder lang={lang} t={dict.builder} />
        ) : items.length > 0 ? (
          <CategoryBrowser
            groups={groups}
            seats={seats}
            lang={lang}
            labels={{
              sample: dict.products.sample,
              allSizes: dict.products.allSizes,
              forPeopleShort: dict.products.forPeopleShort,
              showing: dict.products.showing,
            }}
          />
        ) : (
          <div className="max-w-xl">
            <p className="text-navy/75">{dict.products.empty}</p>
            <ContactButtons dict={dict.contact} className="mt-6" />
          </div>
        )}
      </section>
    </>
  );
}
