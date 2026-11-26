import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactButtons } from "@/components/ContactButtons";
import { guideSlugs, type GuideSlug } from "@/data/content";
import { hasLocale, href, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

const isGuide = (s: string): s is GuideSlug => (guideSlugs as readonly string[]).includes(s);

export const generateStaticParams = () =>
  locales.flatMap((lang) => guideSlugs.map((slug) => ({ lang, slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isGuide(slug)) return {};
  const g = (await getDictionary(lang)).guides.items[slug];
  return pageMetadata({ lang, path: `/guides/${slug}`, title: g.title, description: g.intro });
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isGuide(slug)) notFound();
  const dict = await getDictionary(lang);
  const g = dict.guides.items[slug];

  return (
    <>
      <PageHero eyebrow={dict.guides.title} title={g.title} intro={g.intro} />
      <article className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">
        <div className="border-t border-line">
          {g.sections.map((s) => (
            <section key={s.h} data-reveal="up" className="grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-10">
              <h2 className="font-serif text-3xl text-navy md:col-span-4">{s.h}</h2>
              <p className="max-w-2xl leading-relaxed text-navy/75 md:col-span-7 md:col-start-6">{s.p}</p>
            </section>
          ))}
        </div>
        <Link href={href(lang, `/products/${slug}`)} className="btn btn-primary mt-14">
          {dict.guides.seeProducts} <span className="arrow">→</span>
        </Link>
      </article>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-28">
          <h2 data-reveal="up" className="font-serif text-5xl leading-[1] md:col-span-7 md:text-6xl">{dict.guides.ctaTitle}</h2>
          <div data-reveal="up" className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-white/70">{dict.guides.ctaText}</p>
            <ContactButtons dict={dict.contact} mode="consultation" className="mt-8" dark />
          </div>
        </div>
      </section>
    </>
  );
}
