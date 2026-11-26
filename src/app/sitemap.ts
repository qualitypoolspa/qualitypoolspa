import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { guideSlugs, locationSlugs } from "@/data/content";
import { locales } from "@/i18n/config";
import { getCatalog } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await getCatalog();
  const paths = [
    "",
    "/products",
    "/gallery",
    "/services",
    "/campaigns",
    "/terms",
    ...guideSlugs.map((g) => `/guides/${g}`),
    ...locationSlugs.map((l) => `/locations/${l}`),
    "/about",
    "/contact",
    ...categories.map((c) => `/products/${c.slug}`),
    ...products.map((p) => `/products/${p.category}/${p.slug}`),
  ];
  // Each page lists its other language versions, so search engines show the right one.
  const languages = (p: string) => Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${p}`]));
  return locales.flatMap((l) => paths.map((p) => ({ url: `${site.url}/${l}${p}`, alternates: { languages: languages(p) } })));
}
