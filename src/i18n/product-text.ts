// Spanish and Swedish for the bundled catalogue's texts, as phrase lists:
// English text -> translation (src/i18n/product-text/<lang>.json). One entry
// covers every product that uses the same text, e.g. a spec label like "Weight".
//
// These are the starting translations. Once the catalogue lives in Supabase,
// the client edits translations in /admin; migration 0002 copies these in.
import type { Localized } from "@/i18n/config";
import type { Product, SupplierProduct } from "@/data/products";
import es from "./product-text/es.json";
import sv from "./product-text/sv.json";

import { productLocales, type ProductLocale } from "./product-locales";

export { productLocales, type ProductLocale };

const phrases: Record<ProductLocale, Record<string, string>> = { es, sv };

/** English text -> all its translations. Missing ones fall back to English on the site. */
export function localize(en: string): Localized {
  const out: Localized = { en };
  for (const l of productLocales) {
    const t = phrases[l][en];
    if (t) out[l] = t;
  }
  return out;
}

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

export function translateProduct(p: SupplierProduct): Product {
  const description = localize(p.description.en);
  const tagline = localize(p.tagline.en);
  // Some imports use the description's first sentence as the tagline: translate it the same way.
  if (p.tagline.en === firstSentence(p.description.en)) {
    for (const l of productLocales) {
      const d = description[l];
      if (!tagline[l] && d) tagline[l] = firstSentence(d);
    }
  }
  return {
    ...p,
    tagline,
    description,
    specs: p.specs?.map((s) => ({
      group: s.group ? localize(s.group.en) : undefined,
      label: localize(s.label.en),
      value: localize(s.value),
    })),
  };
}
