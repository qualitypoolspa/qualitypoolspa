import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ContactButtons } from "@/components/ContactButtons";
import { HeroArt } from "@/components/HeroArt";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-navy md:text-6xl">
              {dict.hero.title1}
              <br />
              <em className="text-teal">{dict.hero.title2}</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-navy/75">{dict.hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(lang, "/products")} className="btn btn-primary">{dict.hero.ctaProducts} →</Link>
              <Link href={href(lang, "/contact")} className="btn btn-outline">{dict.hero.ctaAdvice}</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <HeroArt />
            <div className="absolute bottom-4 left-4 rounded bg-white px-4 py-3 shadow">
              <p className="font-serif text-navy">{dict.hero.badge}</p>
              <p className="text-xs text-navy/60">{dict.hero.badgeSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-6 md:grid-cols-3">
          {[dict.trust.one, dict.trust.two, dict.trust.three].map((t) => (
            <div key={t.title}>
              <p className="text-sm font-semibold text-navy">{t.title}</p>
              <p className="text-xs text-navy/60">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="eyebrow">{dict.home.assortmentEyebrow}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl text-navy">
            {dict.home.assortmentTitle} <em className="text-teal">{dict.home.assortmentTitleAccent}</em>
          </h2>
          <p className="max-w-xs text-sm text-navy/65">{dict.home.assortmentText}</p>
        </div>
        <div className="mt-8">
          <CategoryGrid lang={lang} dict={dict} />
        </div>
        <p className="mt-6 text-center text-sm text-navy/60">
          {dict.home.notSure}{" "}
          <Link href={href(lang, "/contact")} className="font-semibold text-teal underline">{dict.home.talkToUs}</Link>
        </p>
      </section>

      {/* Experience band */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <div className="flex aspect-[4/3] items-end rounded-lg bg-gradient-to-br from-[#2a8f99] to-[#0e5a66] p-5">
            <div className="rounded bg-sand px-4 py-3 text-navy">
              <p className="font-serif">{dict.home.bandCard}</p>
              <p className="text-[10px] uppercase tracking-widest text-navy/60">{dict.home.bandCardSub}</p>
            </div>
          </div>
          <div>
            <p className="eyebrow !text-teal">{dict.home.bandEyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight">
              {dict.home.bandTitle} <em className="text-[#6fd0d6]">{dict.home.bandTitleAccent}</em>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75">{dict.home.bandText}</p>
            <ul className="mt-5 space-y-2 text-sm text-white/85">
              {dict.home.bandBullets.map((b) => (
                <li key={b}>✓ {b}</li>
              ))}
            </ul>
            <Link href={href(lang, "/contact")} className="btn mt-7 bg-white text-navy hover:bg-sand">
              {dict.home.bandCta} →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow">{dict.home.featuredEyebrow}</p>
          <div className="mt-3 flex items-end justify-between">
            <h2 className="font-serif text-4xl text-navy">{dict.home.featuredTitle}</h2>
            <Link href={href(lang, "/products")} className="text-sm font-semibold text-teal">{dict.home.viewAll} →</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} lang={lang} dict={dict} />
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow">{dict.home.ctaEyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl text-navy">
            {dict.home.ctaTitle} <em className="text-teal">{dict.home.ctaTitleAccent}</em>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-navy/70">{dict.home.ctaText}</p>
          <ContactButtons dict={dict.contact} className="mt-7" />
        </div>
      </section>
    </>
  );
}
