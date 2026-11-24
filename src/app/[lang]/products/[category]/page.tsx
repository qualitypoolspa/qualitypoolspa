import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { ProductCard } from "@/components/ProductCard";
import { categories, getCategory } from "@/data/categories";
import { productsIn } from "@/data/products";
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
        {items.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} lang={lang} dict={dict} />
            ))}
          </div>
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
