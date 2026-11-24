import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ContactButtons } from "@/components/ContactButtons";
import { ProductCard } from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { heroImage, publicImage } from "@/lib/assets";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const featured = featuredProducts(6);
  const hero = heroImage();
  const bandImg = publicImage("/hero/project.jpg", "/hero/project.webp", "/hero/project.png");

  return (
    <>
      {/* Hero: full-bleed. Drop a photo at public/hero/hero.jpg to replace the backdrop. */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {hero ? (
          <Image src={hero} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        ) : (
          <div className="hero-water absolute inset-0 -z-20" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div className="mx-auto flex min-h-[84vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-32 md:pb-28">
          <p className="eyebrow !text-white/70">{dict.hero.eyebrow}</p>
          <h1 className="mt-6 max-w-3xl font-serif text-6xl leading-[0.98] tracking-tight md:text-8xl">
            {dict.hero.title1}
            <br />
            <em className="font-normal text-[#9fe0e6]">{dict.hero.title2}</em>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/80">{dict.hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={href(lang, "/products")} className="btn btn-light">{dict.hero.ctaProducts}</Link>
            <Link href={href(lang, "/contact")} className="btn btn-ghost">{dict.hero.ctaAdvice}</Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3">
          {[dict.trust.one, dict.trust.two, dict.trust.three].map((t) => (
            <div key={t.title} className="reveal">
              <p className="font-serif text-lg text-navy">{t.title}</p>
              <p className="mt-1 text-sm text-navy/60">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="eyebrow">{dict.home.assortmentEyebrow}</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-4xl leading-tight text-navy md:text-6xl">
            {dict.home.assortmentTitle} <em className="font-normal text-teal">{dict.home.assortmentTitleAccent}</em>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-navy/60">{dict.home.assortmentText}</p>
        </div>
        <div className="mt-14">
          <CategoryGrid lang={lang} dict={dict} />
        </div>
        <p className="mt-10 text-center text-sm text-navy/60">
          {dict.home.notSure}{" "}
          <Link href={href(lang, "/contact")} className="border-b border-navy/40 pb-0.5 font-semibold text-navy hover:border-teal hover:text-teal">
            {dict.home.talkToUs}
          </Link>
        </p>
      </section>

      {/* Experience band. Optional photo at public/hero/project.jpg */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-2">
          <div className="reveal relative aspect-[4/5] overflow-hidden">
            {bandImg ? (
              <Image src={bandImg} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            ) : (
              <div className="hero-water absolute inset-0" />
            )}
            <div className="absolute bottom-0 left-0 bg-sand px-6 py-4 text-navy">
              <p className="font-serif text-lg">{dict.home.bandCard}</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-navy/60">{dict.home.bandCardSub}</p>
            </div>
          </div>
          <div className="reveal">
            <p className="eyebrow !text-[#c9a96b]">{dict.home.bandEyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
              {dict.home.bandTitle} <em className="font-normal text-[#9fe0e6]">{dict.home.bandTitleAccent}</em>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">{dict.home.bandText}</p>
            <ul className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm text-white/85">
              {dict.home.bandBullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-[#c9a96b]">—</span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href={href(lang, "/contact")} className="btn btn-light mt-10">{dict.home.bandCta}</Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className="eyebrow">{dict.home.featuredEyebrow}</p>
          <div className="mt-4 flex items-end justify-between gap-6">
            <h2 className="font-serif text-4xl text-navy md:text-6xl">{dict.home.featuredTitle}</h2>
            <Link href={href(lang, "/products")} className="hidden border-b border-navy/40 pb-0.5 text-sm font-semibold text-navy hover:text-teal sm:block">
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} lang={lang} dict={dict} />
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-sand">
        <div className="reveal mx-auto max-w-6xl px-5 py-24">
          <p className="eyebrow">{dict.home.ctaEyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-navy md:text-6xl">
            {dict.home.ctaTitle} <em className="font-normal text-teal">{dict.home.ctaTitleAccent}</em>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-navy/70">{dict.home.ctaText}</p>
          <ContactButtons dict={dict.contact} className="mt-10" />
        </div>
      </section>
    </>
  );
}
