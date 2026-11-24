import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: (await getDictionary(lang)).about.title };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { about } = await getDictionary(lang);

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-serif text-5xl text-navy">{about.title}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy/75">
        <p>{about.text1}</p>
        <p>{about.text2}</p>
        <p>{about.text3}</p>
      </div>
    </section>
  );
}
