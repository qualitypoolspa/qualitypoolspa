import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { guideSlugs } from "@/data/content";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { guides } = await getDictionary(lang);
  return { title: guides.title, description: guides.intro };
}

export default async function GuidesPage({ params }: PageProps<"/[lang]/guides">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { guides } = await getDictionary(lang);

  return (
    <>
      <PageHero title={guides.title} intro={guides.intro} />
      <section className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">
        <ul className="border-t border-line">
          {guideSlugs.map((slug, i) => (
            <li key={slug} data-reveal="up" style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="border-b border-line">
              <Link href={href(lang, `/guides/${slug}`)} className="group grid gap-3 py-10 md:grid-cols-12 md:gap-8">
                <h2 className="font-serif text-4xl text-navy transition-transform duration-500 group-hover:translate-x-2 md:col-span-6 md:text-5xl">
                  {guides.items[slug].title}
                </h2>
                <p className="leading-relaxed text-navy/65 md:col-span-5">{guides.items[slug].intro}</p>
                <span aria-hidden="true" className="hidden justify-self-end text-2xl text-navy md:col-span-1 md:block">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
