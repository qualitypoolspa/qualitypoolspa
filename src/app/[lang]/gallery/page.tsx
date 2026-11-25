import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
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
      <PageHero title={dict.gallery.title} intro={dict.gallery.intro} />
      <section className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">
        <div>
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

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-28">
          <h2 data-reveal="up" className="font-serif text-5xl leading-[1] md:col-span-7 md:text-6xl">{dict.gallery.ctaTitle}</h2>
          <div data-reveal="up" className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-white/70">{dict.gallery.ctaText}</p>
            <ContactButtons dict={dict.contact} className="mt-8" dark />
          </div>
        </div>
      </section>
    </>
  );
}
