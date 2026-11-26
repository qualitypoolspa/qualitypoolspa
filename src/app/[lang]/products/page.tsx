import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CategoryTiles } from "@/components/CategoryGrid";
import { categories, menuGroups } from "@/data/categories";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { products } = await getDictionary(lang);
  return pageMetadata({ lang, path: "/products", title: products.title, description: products.intro });
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
    <>
    <PageHero title={dict.products.title} intro={dict.products.intro} />
    <section className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">

      <nav className="flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-5 text-[12px] font-semibold uppercase tracking-[0.16em]">
        {menuGroups.map((g) => (
          <Link key={g} href={href(lang, `/products#${g}`)} className="link-line text-navy/70 hover:text-navy">
            {groupName[g]}
          </Link>
        ))}
      </nav>

      <div className="mt-16 space-y-24">
        {menuGroups.map((g) => (
          <div key={g} id={g} className="scroll-mt-28">
            <h2 data-reveal="up" className="mb-8 font-serif text-5xl text-navy">{groupName[g]}</h2>
            <CategoryTiles slugs={categories.filter((c) => c.group === g).map((c) => c.slug)} lang={lang} dict={dict} />
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
