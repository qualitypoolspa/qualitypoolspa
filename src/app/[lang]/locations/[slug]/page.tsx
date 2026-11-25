import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactButtons } from "@/components/ContactButtons";
import { categories } from "@/data/categories";
import { locationSlugs, type LocationSlug } from "@/data/content";
import { hasLocale, href, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

const locationImages: Record<string, string> = {
  marbella: "/products/aquavia/spa-cube/4.webp",
  "costa-del-sol": "/products/aquavia/spa-oasis-40/4.webp",
  mallorca: "/products/aquavia/spa-home/3.webp",
};

const isLocation = (s: string): s is LocationSlug => (locationSlugs as readonly string[]).includes(s);

export const generateStaticParams = () =>
  locales.flatMap((lang) => locationSlugs.map((slug) => ({ lang, slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/locations/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isLocation(slug)) return {};
  const l = (await getDictionary(lang)).locations.items[slug];
  return pageMetadata({ lang, path: `/locations/${slug}`, title: l.title, description: l.intro });
}

export default async function LocationPage({ params }: PageProps<"/[lang]/locations/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isLocation(slug)) notFound();
  const dict = await getDictionary(lang);
  const l = dict.locations.items[slug];
  const main = categories.filter((c) => c.priority);

  return (
    <>
      <PageHero eyebrow={dict.locations.title} title={l.title} intro={l.intro} image={locationImages[slug]} />

      <section className="mx-auto max-w-[90rem] px-5 py-20 md:px-8 md:py-28">
        <p data-reveal="up" className="max-w-3xl font-serif text-4xl leading-[1.1] text-navy md:text-5xl">{l.text}</p>
        <ul data-reveal="up" className="mt-12 flex flex-wrap gap-3">
          {main.map((c) => (
            <li key={c.slug}>
              <Link href={href(lang, `/products/${c.slug}`)} className="btn btn-outline">
                {dict.categories[c.slug].name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-28">
          <h2 data-reveal="up" className="font-serif text-5xl leading-[1] md:col-span-7 md:text-6xl">{dict.locations.ctaTitle}</h2>
          <div data-reveal="up" className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-white/70">{dict.locations.ctaText}</p>
            <ContactButtons dict={dict.contact} mode="consultation" className="mt-8" dark />
          </div>
        </div>
      </section>
    </>
  );
}
