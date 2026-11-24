import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h1 className="font-serif text-5xl text-navy md:text-7xl">{guides.title}</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/70">{guides.intro}</p>
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {guideSlugs.map((slug) => (
          <li key={slug}>
            <Link
              href={href(lang, `/guides/${slug}`)}
              className="group block h-full border border-line bg-white p-8 transition hover:shadow-xl"
            >
              <h2 className="font-serif text-2xl text-navy group-hover:text-teal">{guides.items[slug].title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">{guides.items[slug].intro}</p>
              <span className="mt-6 inline-block border-b border-navy/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy">
                {guides.read} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
