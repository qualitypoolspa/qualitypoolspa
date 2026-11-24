import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    "/gallery",
    "/about",
    "/contact",
    ...categories.map((c) => `/products/${c.slug}`),
    ...products.map((p) => `/products/${p.category}/${p.slug}`),
  ];
  return locales.flatMap((l) => paths.map((p) => ({ url: `${site.url}/${l}${p}` })));
}
