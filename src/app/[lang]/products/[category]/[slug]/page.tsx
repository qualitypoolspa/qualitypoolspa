import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { ProductCard, ProductImage } from "@/components/ProductCard";
import { site } from "@/config/site";
import { getCategory } from "@/data/categories";
import { getProduct, products, productsIn } from "@/data/products";
import { hasLocale, href, locales, pick } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const generateStaticParams = () =>
  locales.flatMap((lang) => products.map((p) => ({ lang, category: p.category, slug: p.slug })));

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[category]/[slug]">): Promise<Metadata> {
  const { lang, category, slug } = await params;
  const product = getProduct(category, slug);
  if (!hasLocale(lang) || !product) return {};
  return { title: product.name, description: pick(product.tagline, lang) };
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[category]/[slug]">) {
  const { lang, category, slug } = await params;
  const product = getProduct(category, slug);
  const cat = getCategory(category);
  if (!hasLocale(lang) || !product || !cat) notFound();
  const dict = await getDictionary(lang);
  const related = productsIn(cat.slug).filter((p) => p.slug !== product.slug).slice(0, 3);
  const url = `${site.url}${href(lang, `/products/${cat.slug}/${product.slug}`)}`;

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-8 text-sm text-navy/60">
        <Link href={href(lang, "/products")} className="hover:text-teal">{dict.products.title}</Link>
        {" / "}
        <Link href={href(lang, `/products/${cat.slug}`)} className="hover:text-teal">
          {dict.categories[cat.slug].name}
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-8 md:grid-cols-2">
        <div className="space-y-3">
          <ProductImage product={product} className="aspect-[4/3] w-full rounded-lg" />
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1, 5).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={product.name} className="aspect-[4/3] rounded object-cover" />
              ))}
            </div>
          )}
        </div>

        <div>
          {product.sample && (
            <span className="rounded bg-sand px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
              {dict.products.sample}
            </span>
          )}
          <h1 className="mt-3 font-serif text-4xl text-navy">{product.name}</h1>
          {product.brand && <p className="mt-1 text-sm text-navy/60">{product.brand}</p>}
          <p className="mt-4 text-lg text-navy/80">{pick(product.tagline, lang)}</p>

          <h2 className="eyebrow mt-8">{dict.products.description}</h2>
          <p className="mt-3 leading-relaxed text-navy/75">{pick(product.description, lang)}</p>

          <p className="eyebrow mt-8">{dict.products.askAbout}</p>
          <ContactButtons dict={dict.contact} product={product.name} url={url} className="mt-3" />
        </div>
      </section>

      {product.specs && product.specs.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-8">
          <h2 className="font-serif text-2xl text-navy">{dict.products.specs}</h2>
          <dl className="mt-4 divide-y divide-line rounded-lg border border-line bg-white">
            {product.specs.map((s) => (
              <div key={pick(s.label, lang)} className="grid grid-cols-2 gap-4 px-5 py-3 text-sm">
                <dt className="text-navy/60">{pick(s.label, lang)}</dt>
                <dd className="text-navy">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {product.downloads && product.downloads.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-8">
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
        <section className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="font-serif text-2xl text-navy">{dict.products.related}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} lang={lang} dict={dict} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
