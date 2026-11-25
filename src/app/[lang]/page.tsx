import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tile } from "@/components/CategoryGrid";
import { ContactButtons } from "@/components/ContactButtons";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ProductCard } from "@/components/ProductCard";
import { Rail } from "@/components/Rail";
import { site } from "@/config/site";
import type { CategorySlug } from "@/data/categories";
import { brands, heroSlides } from "@/data/home";
import { toCard } from "@/data/products";
import { hasLocale, href, pick } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCatalog } from "@/lib/catalog";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const h = dict.home;
  const featured = (await getCatalog()).featuredProducts(6);
  const slides = heroSlides.map((s) => ({
    image: s.image,
    href: href(lang, `/products/${s.product.category}/${s.product.slug}`),
    name: s.product.name,
    line: pick(s.line, lang),
  }));
  // Categories shown as a typographic index under the photo tiles.
  const more: CategorySlug[] = ["fibreglass-pools", "thermopool", "ep-pools", "pool-accessories", "pool-renovation-liners", "saunas-hammam"];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <HeroSlideshow slides={slides}>
        <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-end px-5 pb-14 pt-48 md:px-8 md:pb-20">
          <p className="fade-in text-[11px] uppercase tracking-[0.24em] text-white/75" style={d(200)}>
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.2rem,8.2vw,8rem)] leading-[0.92]">
            <span className="line-mask">
              <span style={d(300)}>{dict.hero.line1}</span>
            </span>
            <span className="line-mask">
              <em className="font-normal" style={d(450)}>
                {dict.hero.line2}
              </em>
            </span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="fade-in max-w-md text-[15px] leading-relaxed text-white/80" style={d(900)}>
              {dict.hero.body}
            </p>
            <div className="fade-in flex flex-wrap items-center gap-7" style={d(1100)}>
              <Link href={href(lang, "/products")} className="btn btn-light">
                {dict.hero.ctaProducts} <span className="arrow">→</span>
              </Link>
              <Link href={href(lang, "/products/thermopool")} className="link-line text-[12px] font-semibold uppercase tracking-[0.18em]">
                {dict.hero.ctaBuilder}
              </Link>
            </div>
          </div>
        </div>
      </HeroSlideshow>

      {/* ---------- Brands ---------- */}
      <section className="overflow-hidden border-b border-line">
        <div className="mx-auto flex max-w-[90rem] items-center gap-10 px-5 py-7 md:px-8">
          <p className="hidden shrink-0 text-[11px] uppercase tracking-[0.2em] text-navy/50 md:block">{h.brandsLabel}</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee flex w-max gap-14">
              {[...brands, ...brands].map((b, i) => (
                <span key={i} className="flex items-center gap-14 whitespace-nowrap font-serif text-3xl italic text-navy/75">
                  {b}
                  <span aria-hidden="true" className="text-base not-italic text-brass">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-36">
        <h2 data-reveal="up" className="font-serif text-4xl leading-[1.05] text-navy md:col-span-8 md:text-6xl">
          {h.introTitle}
        </h2>
        <div data-reveal="up" style={d(150)} className="md:col-span-4 md:pt-3">
          <p className="leading-relaxed text-navy/70">{h.introText}</p>
          <Link href={href(lang, "/services")} className="link-line mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-navy">
            {h.introLink} →
          </Link>
        </div>
      </section>

      {/* ---------- Collection ---------- */}
      <section className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div data-reveal="up">
            <p className="eyebrow">{h.collectionEyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl text-navy md:text-5xl">{h.collectionTitle}</h2>
          </div>
          <Link href={href(lang, "/products")} data-reveal="up" className="link-line text-[12px] font-semibold uppercase tracking-[0.18em] text-navy">
            {h.viewAll} →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-12">
          <Tile slug="spas" lang={lang} dict={dict} large className="h-[30rem] md:col-span-7 md:h-[40rem]" />
          <Tile slug="pool-covers" lang={lang} dict={dict} large className="h-[30rem] md:col-span-5 md:h-[40rem]" delay={120} />
          <Tile slug="heat-pumps" lang={lang} dict={dict} className="h-[24rem] md:col-span-4" />
          <Tile slug="lighting" lang={lang} dict={dict} className="h-[24rem] md:col-span-4" delay={120} />
          <Tile slug="pool-robots" lang={lang} dict={dict} className="h-[24rem] md:col-span-4" delay={240} />
        </div>

        <div className="mt-20 md:mt-28">
          <p data-reveal="up" className="eyebrow">{h.moreTitle}</p>
          <ul className="mt-5 border-t border-line">
            {more.map((slug, i) => (
              <li key={slug} data-reveal="up" style={d(i * 60)} className="border-b border-line">
                <Link href={href(lang, `/products/${slug}`)} className="group grid items-center gap-2 py-6 md:grid-cols-12 md:gap-6">
                  <span className="font-serif text-3xl text-navy transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                    {dict.categories[slug].name}
                  </span>
                  <span className="text-sm text-navy/60 md:col-span-6">{dict.categories[slug].blurb}</span>
                  <span aria-hidden="true" className="hidden justify-self-end text-xl text-navy transition-transform duration-500 group-hover:translate-x-1 md:col-span-1 md:block">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Selected models ---------- */}
      {featured.length > 0 && (
        <section className="mt-28 overflow-hidden bg-sand py-24 md:mt-36 md:py-32">
          <div className="mx-auto max-w-[90rem] px-5 md:px-8">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div data-reveal="up">
                <p className="eyebrow">{h.selectedEyebrow}</p>
                <h2 className="mt-3 font-serif text-4xl text-navy md:text-5xl">{h.selectedTitle}</h2>
              </div>
            </div>
            <Rail prevLabel={h.prev} nextLabel={h.next}>
              {featured.map((p, i) => (
                <div key={p.slug} data-reveal="up" style={d(i * 90)} className="w-[80vw] shrink-0 snap-start sm:w-[22rem] lg:w-[26rem]">
                  <ProductCard product={toCard(p, lang)} lang={lang} sampleLabel={dict.products.sample} />
                </div>
              ))}
            </Rail>
          </div>
        </section>
      )}

      {/* ---------- Story ---------- */}
      <section className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-28 md:grid-cols-12 md:px-8 md:py-36">
        <div data-reveal="img" className="relative aspect-[4/5] overflow-hidden md:col-span-6">
          <div className="absolute inset-0">
            <Image src="/products/aquavia/hot-tub-cala/5.webp" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p data-reveal="up" className="eyebrow">{h.storyEyebrow}</p>
          <h2 data-reveal="up" style={d(100)} className="mt-4 font-serif text-4xl leading-[1.05] text-navy md:text-6xl">
            {h.storyTitle}
          </h2>
          <p data-reveal="up" style={d(200)} className="mt-7 leading-relaxed text-navy/70">
            {h.storyText}
          </p>
          <ol className="mt-10 border-t border-line">
            {h.steps.map((s, i) => (
              <li key={s} data-reveal="up" style={d(250 + i * 80)} className="flex items-baseline gap-6 border-b border-line py-4">
                <span className="font-serif text-lg italic text-brass">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-navy">{s}</span>
              </li>
            ))}
          </ol>
          <Link href={href(lang, "/services")} data-reveal="up" className="btn btn-outline mt-10">
            {h.introLink} <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* ---------- Pool builder ---------- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div>
            <p data-reveal="up" className="eyebrow !text-[#c2a477]">{h.builderEyebrow}</p>
            <h2 data-reveal="up" style={d(100)} className="mt-4 font-serif text-5xl leading-[1] md:text-7xl">
              {h.builderTitle}
            </h2>
            <p data-reveal="up" style={d(200)} className="mt-7 max-w-md leading-relaxed text-white/70">
              {h.builderText}
            </p>
            <Link href={href(lang, "/products/thermopool")} data-reveal="up" style={d(300)} className="btn btn-light mt-10">
              {h.builderCta} <span className="arrow">→</span>
            </Link>
          </div>
          {/* A pool outline that draws itself when scrolled into view. */}
          <div data-reveal="up" style={d(200)} className="draw">
            <svg viewBox="0 0 540 300" className="w-full" aria-hidden="true">
              <rect x="20" y="40" width="480" height="220" rx="6" fill="none" stroke="#c2a477" strokeWidth="1.2" pathLength={1} className="draw-path" />
              <path d="M20 110 A70 70 0 0 1 20 190" fill="none" stroke="#c2a477" strokeWidth="1.2" pathLength={1} className="draw-path" style={d(500)} />
              <path d="M20 125 A55 55 0 0 1 20 175 M20 140 A40 40 0 0 1 20 160" fill="none" stroke="#c2a477" strokeOpacity="0.6" strokeWidth="1" pathLength={1} className="draw-path" style={d(700)} />
              <path d="M70 150 q35 -12 70 0 t70 0 t70 0 t70 0 t70 0" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" pathLength={1} className="draw-path" style={d(900)} />
              <g fill="rgba(255,255,255,0.5)" fontSize="11" letterSpacing="2.5">
                <text x="260" y="28" textAnchor="middle">8.0 M</text>
                <text x="520" y="150" textAnchor="middle" transform="rotate(90 520 150)">4.0 M</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="mx-auto max-w-[90rem] px-5 py-28 md:px-8 md:py-36">
        <h2 data-reveal="up" className="max-w-4xl font-serif text-5xl leading-[1] text-navy md:text-8xl">
          {h.ctaTitle}
        </h2>
        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
          <div data-reveal="up" className="md:col-span-5">
            <p className="leading-relaxed text-navy/70">{h.ctaText}</p>
            <ContactButtons dict={dict.contact} className="mt-8" />
          </div>
          <dl data-reveal="up" style={d(150)} className="grid gap-6 text-sm sm:grid-cols-3 md:col-span-6 md:col-start-7">
            <div>
              <dt className="eyebrow">{dict.contact.phone}</dt>
              <dd className="mt-2">
                <a href={`tel:+${site.whatsapp}`} className="link-line text-navy">{site.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">{dict.contact.email}</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="link-line break-all text-navy">{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">{h.areas}</dt>
              <dd className="mt-2 text-navy">{site.locations.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
