import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import { hasLocale } from "@/i18n/config";
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

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-serif text-5xl text-navy">{dict.products.title}</h1>
      <p className="mt-4 max-w-xl text-navy/70">{dict.products.intro}</p>
      <div className="mt-10">
        <CategoryGrid lang={lang} dict={dict} />
      </div>
    </section>
  );
}
