import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBrowser } from "@/components/CategoryBrowser";
import { ContactButtons } from "@/components/ContactButtons";
import { PoolBuilder } from "@/components/PoolBuilder";
import { builderCategories, categories, getCategory } from "@/data/categories";
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

  return (
    <>
      <section className={`bg-gradient-to-br ${cat.tone} text-white`}>
        <div className="mx-auto max-w-6xl px-5 py-14">
          <Link href={href(lang, "/products")} className="text-sm text-white/70 hover:text-white">
            ← {dict.products.backToProducts}
          </Link>
          <h1 className="mt-4 font-serif text-5xl">{dict.categories[cat.slug].name}</h1>
          <p className="mt-3 max-w-xl text-white/80">{dict.categories[cat.slug].blurb}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
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
