import type { Metadata } from "next";
import { site } from "@/config/site";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/** Open Graph locale per language (what Facebook, WhatsApp etc. expect). */
const ogLocale: Record<Locale, string> = {
  en: "en_GB",
  es: "es_ES",
  sv: "sv_SE",
  fr: "fr_FR",
  de: "de_DE",
  ru: "ru_RU",
};

/** The preview image for shared links when a page has no photo of its own (1200 × 630). */
export const DEFAULT_OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630 };

type PageSeo = {
  lang: Locale;
  /** The path after the language, e.g. "/products/spas" ("" for the home page). */
  path: string;
  /** Page title; the layout's template adds " | Quality Pool & Spa". */
  title?: string;
  description?: string;
  /** A photo of this page's subject, e.g. the product. Defaults to DEFAULT_OG_IMAGE. */
  image?: { url: string; width?: number; height?: number };
  /** Set for the home page: the title is used as is, without the template. */
  absoluteTitle?: boolean;
};

/**
 * Metadata every public page shares:
 * - its canonical address, so search engines treat /en/x and /en/x/ etc. as one page;
 * - its other language versions (hreflang), with English as the default for
 *   everyone else, so Google shows Spanish searchers the Spanish page;
 * - complete Open Graph data for link previews. Next replaces (not merges) a
 *   layout's openGraph when a page sets its own, so each page gets the full set.
 */
export function pageMetadata({ lang, path, title, description, image, absoluteTitle }: PageSeo): Metadata {
  const url = `/${lang}${path}`;
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));
  languages["x-default"] = `/${defaultLocale}${path}`;
  const fullTitle = title ? (absoluteTitle ? title : `${title} | ${site.name}`) : site.name;

  return {
    ...(title ? { title: absoluteTitle ? { absolute: title } : title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      url,
      title: fullTitle,
      ...(description ? { description } : {}),
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [image ?? DEFAULT_OG_IMAGE],
    },
  };
}

/**
 * The business for search engines (schema.org): the company with its two
 * offices as local businesses. Shown on the home and contact pages; it helps
 * local searches like "spa Estepona" and the business panel in Google.
 */
export function businessJsonLd(lang: Locale, description: string) {
  const { company } = site;
  const offices = site.offices.map((o) => ({
    "@type": "HomeAndConstructionBusiness",
    name: `${site.name} ${o.name}`,
    url: `${site.url}/${lang}`,
    image: `${site.url}${DEFAULT_OG_IMAGE.url}`,
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      postalCode: o.postalCode,
      addressLocality: o.locality,
      addressRegion: o.region,
      addressCountry: "ES",
    },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: company.name,
    taxID: company.nif,
    url: site.url,
    logo: `${site.url}/brand/logo.png`,
    description,
    email: site.email,
    telephone: site.phoneDisplay,
    areaServed: site.locations.map((name) => ({ "@type": "Place", name })),
    department: offices,
  };
}

/** Serialises JSON-LD for a <script> tag; "<" is escaped so the data can't close the tag. */
export const jsonLdHtml = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
