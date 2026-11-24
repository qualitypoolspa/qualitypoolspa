import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { GalleryGrid, type GalleryTile } from "@/components/GalleryGrid";
import { categories, getCategory } from "@/data/categories";
import { gallery } from "@/data/gallery";
import { hasLocale, pick } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { gallery: g } = await getDictionary(lang);
  return { title: g.title, description: g.intro };
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const tiles: GalleryTile[] = gallery.map((g) => ({
    id: g.id,
    category: g.category,
    title: pick(g.title, lang),
    location: g.location,
    image: g.image,
    width: g.size?.[0] ?? 1200,
    height: g.size?.[1] ?? 900,
    tone: getCategory(g.category)?.tone ?? "",
    sample: g.sample,
  }));

  // Only offer filters for categories that actually have gallery items.
  const filters = categories
    .filter((c) => gallery.some((g) => g.category === c.slug))
    .map((c) => ({ slug: c.slug, name: dict.categories[c.slug].name }));

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="font-serif text-5xl text-navy">{dict.gallery.title}</h1>
        <p className="mt-4 max-w-xl text-navy/70">{dict.gallery.intro}</p>
        <div className="mt-10">
          <GalleryGrid
            items={tiles}
            filters={filters}
            labels={{
              all: dict.gallery.all,
              close: dict.gallery.close,
              prev: dict.gallery.prev,
              next: dict.gallery.next,
              sample: dict.gallery.sample,
            }}
          />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-serif text-3xl text-navy">{dict.gallery.ctaTitle}</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-navy/70">{dict.gallery.ctaText}</p>
          <ContactButtons dict={dict.contact} className="mt-6" />
        </div>
      </section>
    </>
  );
}
