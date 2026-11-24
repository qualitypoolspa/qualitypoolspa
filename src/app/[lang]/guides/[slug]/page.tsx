import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { guideSlugs, type GuideSlug } from "@/data/content";
import { hasLocale, href, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const isGuide = (s: string): s is GuideSlug => (guideSlugs as readonly string[]).includes(s);

export const generateStaticParams = () =>
  locales.flatMap((lang) => guideSlugs.map((slug) => ({ lang, slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isGuide(slug)) return {};
  const g = (await getDictionary(lang)).guides.items[slug];
  return { title: g.title, description: g.intro };
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isGuide(slug)) notFound();
  const dict = await getDictionary(lang);
  const g = dict.guides.items[slug];

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 py-20">
        <Link href={href(lang, "/guides")} className="text-sm text-navy/60 hover:text-teal">← {dict.guides.title}</Link>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-navy md:text-6xl">{g.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-navy/70">{g.intro}</p>
        <div className="mt-12 space-y-10">
          {g.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-2xl text-navy">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-navy/75">{s.p}</p>
            </section>
          ))}
        </div>
        <Link href={href(lang, `/products/${slug}`)} className="btn btn-primary mt-14">
          {dict.guides.seeProducts}
        </Link>
      </article>

      <section className="bg-sand">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="font-serif text-3xl text-navy">{dict.guides.ctaTitle}</h2>
          <p className="mt-3 text-sm text-navy/70">{dict.guides.ctaText}</p>
          <ContactButtons dict={dict.contact} mode="consultation" className="mt-6" />
        </div>
      </section>
    </>
  );
}
