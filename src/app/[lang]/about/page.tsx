import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { TeamSection } from "@/components/TeamSection";
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
    <>
      <PageHero title={about.title} image="/products/aquavia/hot-tub-cala/3.webp" />
      <section className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <p data-reveal="up" className="font-serif text-4xl leading-[1.1] text-navy md:col-span-7 md:text-5xl">
          {about.text1}
        </p>
        <div data-reveal="up" style={{ "--d": "150ms" } as React.CSSProperties} className="space-y-5 leading-relaxed text-navy/70 md:col-span-4 md:col-start-9 md:pt-3">
          <p>{about.text2}</p>
          <p>{about.text3}</p>
        </div>
      </section>
      <TeamSection dict={about.team} />
    </>
  );
}
