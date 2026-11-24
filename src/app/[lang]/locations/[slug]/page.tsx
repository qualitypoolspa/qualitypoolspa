import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { categories } from "@/data/categories";
import { locationSlugs, type LocationSlug } from "@/data/content";
import { hasLocale, href, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const isLocation = (s: string): s is LocationSlug => (locationSlugs as readonly string[]).includes(s);

export const generateStaticParams = () =>
  locales.flatMap((lang) => locationSlugs.map((slug) => ({ lang, slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/locations/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isLocation(slug)) return {};
  const l = (await getDictionary(lang)).locations.items[slug];
  return { title: l.title, description: l.intro };
}

export default async function LocationPage({ params }: PageProps<"/[lang]/locations/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isLocation(slug)) notFound();
  const dict = await getDictionary(lang);
  const l = dict.locations.items[slug];
  const main = categories.filter((c) => c.priority);

  return (
    <>
      <section className="hero-water text-white">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <p className="eyebrow !text-white/70">{dict.locations.title}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">{l.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{l.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="max-w-2xl text-lg leading-relaxed text-navy/75">{l.text}</p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {main.map((c) => (
            <li key={c.slug}>
              <Link href={href(lang, `/products/${c.slug}`)} className="btn btn-outline">
                {dict.categories[c.slug].name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl font-serif text-4xl text-navy md:text-5xl">{dict.locations.ctaTitle}</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-navy/70">{dict.locations.ctaText}</p>
          <ContactButtons dict={dict.contact} mode="consultation" className="mt-8" />
        </div>
      </section>
    </>
  );
}
