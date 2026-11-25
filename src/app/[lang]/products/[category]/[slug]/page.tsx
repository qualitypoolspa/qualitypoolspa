import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { ProductCard, ProductImage } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import type { Product } from "@/data/products";
import { site } from "@/config/site";
import { getCategory } from "@/data/categories";
import { toCard } from "@/data/products";
import { hasLocale, href, locales, pick, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCatalog } from "@/lib/catalog";

type Spec = NonNullable<Product["specs"]>[number];

/** Groups specs by their (translated) group name, keeping the original order. */
function groupSpecs(specs: Spec[], lang: Locale): [string, Spec[]][] {
  const groups = new Map<string, Spec[]>();
  for (const s of specs) {
    const g = s.group ? pick(s.group, lang) : "";
    groups.set(g, [...(groups.get(g) ?? []), s]);
  }
  return [...groups];
}

// Products added later in /admin are rendered on first visit (dynamicParams is on).
export const generateStaticParams = async () => {
  const { products } = await getCatalog();
  return locales.flatMap((lang) => products.map((p) => ({ lang, category: p.category, slug: p.slug })));
};

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[category]/[slug]">): Promise<Metadata> {
  const { lang, category, slug } = await params;
  const product = (await getCatalog()).getProduct(category, slug);
  if (!hasLocale(lang) || !product) return {};
  return { title: product.name, description: pick(product.tagline, lang) };
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[category]/[slug]">) {
  const { lang, category, slug } = await params;
  const catalog = await getCatalog();
  const product = catalog.getProduct(category, slug);
  const cat = getCategory(category);
  if (!hasLocale(lang) || !product || !cat) notFound();
  const dict = await getDictionary(lang);
  const related = catalog.productsIn(cat.slug).filter((p) => p.slug !== product.slug).slice(0, 3);
  const url = `${site.url}${href(lang, `/products/${cat.slug}/${product.slug}`)}`;

  return (
    <>
      <div className="mx-auto max-w-[90rem] px-5 md:px-8 pt-8 text-sm text-navy/60">
        <Link href={href(lang, "/products")} className="hover:text-teal">{dict.products.title}</Link>
        {" / "}
        <Link href={href(lang, `/products/${cat.slug}`)} className="hover:text-teal">
          {dict.categories[cat.slug].name}
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-8 md:grid-cols-2">
        <div>
          {product.images?.length ? (
            <ProductGallery images={product.images} name={product.name} />
          ) : (
            <ProductImage name={product.name} category={product.category} className="aspect-[4/3] w-full" />
          )}
        </div>

        <div>
          {product.sample && (
            <span className="rounded bg-sand px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
              {dict.products.sample}
            </span>
          )}
          {product.brand && (
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brass">{product.brand}</p>
          )}
          <h1 className="mt-3 font-serif text-5xl leading-[0.98] text-navy md:text-7xl">
            <span className="line-mask"><span>{product.name}</span></span>
          </h1>
          <p className="mt-4 text-lg text-navy/80">{pick(product.tagline, lang)}</p>

          {pick(product.description, lang) !== pick(product.tagline, lang) && (
            <>
              <h2 className="eyebrow mt-8">{dict.products.description}</h2>
              <p className="mt-3 leading-relaxed text-navy/75">{pick(product.description, lang)}</p>
            </>
          )}

          <p className="eyebrow mt-8">{dict.products.askAbout}</p>
          <ContactButtons dict={dict.contact} product={product.name} url={url} className="mt-3" />
        </div>
      </section>

      {product.specs && product.specs.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-5 md:px-8 py-8">
          <h2 data-reveal="up" className="font-serif text-4xl text-navy md:text-5xl">{dict.products.specs}</h2>
          <div className="mt-6 gap-10 md:columns-2">
            {groupSpecs(product.specs, lang).map(([group, rows]) => (
              <div key={group || "specs"} data-reveal="up" className="mb-10 break-inside-avoid">
                {group && <h3 className="eyebrow mb-3">{group}</h3>}
                <dl className="divide-y divide-line border-y border-line">
                  {rows.map((s) => (
                    <div key={pick(s.label, lang)} className="grid grid-cols-2 gap-4 py-3 text-sm">
                      <dt className="text-navy/60">{pick(s.label, lang)}</dt>
                      <dd className="text-navy">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.downloads && product.downloads.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-5 md:px-8 py-8">
          <h2 className="font-serif text-2xl text-navy">{dict.products.downloads}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {product.downloads.map((d) => (
              <li key={d.url}>
                <a href={d.url} className="font-semibold text-teal underline" target="_blank" rel="noopener noreferrer">
                  {pick(d.label, lang)}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-5 md:px-8 py-12">
          <h2 data-reveal="up" className="font-serif text-4xl text-navy">{dict.products.related}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={toCard(p, lang)} lang={lang} sampleLabel={dict.products.sample} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
