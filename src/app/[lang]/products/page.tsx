import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTiles } from "@/components/CategoryGrid";
import { categories, menuGroups } from "@/data/categories";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: (await getDictionary(lang)).products.title };
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const groupName = {
    pool: dict.nav.pool,
    spas: dict.nav.spas,
    "pool-covers": dict.nav.poolCovers,
    "pool-accessories": dict.nav.poolAccessories,
    sauna: dict.nav.sauna,
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-serif text-5xl text-navy md:text-6xl">{dict.products.title}</h1>
      <p className="mt-4 max-w-xl text-navy/70">{dict.products.intro}</p>

      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-6 text-sm">
        {menuGroups.map((g) => (
          <Link key={g} href={href(lang, `/products#${g}`)} className="text-navy/70 hover:text-teal">
            {groupName[g]}
          </Link>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {menuGroups.map((g) => (
          <div key={g} id={g} className="scroll-mt-28">
            <h2 className="mb-6 font-serif text-3xl text-navy">{groupName[g]}</h2>
            <CategoryTiles slugs={categories.filter((c) => c.group === g).map((c) => c.slug)} lang={lang} dict={dict} />
          </div>
        ))}
      </div>
    </section>
  );
}
