import type { CategorySlug } from "@/data/categories";
import type { Product, ProductImage } from "@/data/products";
import type { Localized } from "@/i18n/config";
import { localeMigrations, productLocales, type ProductLocale } from "@/i18n/product-locales";

/**
 * A row of the `products` table (supabase/migrations/0001_products.sql,
 * 0002_translations.sql and 0003_more_languages.sql).
 *
 * English is the main text; translations sit in `*_es`, `*_sv`, `*_de`, `*_fr`
 * and `*_ru` twin columns (the Fat Mama pattern). Blank means "not translated" and the site
 * shows the English. Specs and photos are JSON lists so a product can be
 * edited and saved in one go; each spec row carries its own translations.
 */
export type SpecRow = {
  group: string;
  label: string;
  value: string;
} & Partial<Record<`${"group" | "label" | "value"}_${ProductLocale}`, string>>;

type Translations = Partial<Record<`${"tagline" | "description"}_${ProductLocale}`, string | null>>;

export type ProductRow = {
  id: string;
  slug: string;
  category: string;
  collection: string | null;
  name: string;
  brand: string | null;
  tagline: string;
  description: string;
  seats: number[] | null;
  specs: SpecRow[];
  images: ProductImage[];
  is_visible: boolean;
  is_featured: boolean;
  is_selection: boolean;
  sort_order: number;
} & Translations;

export const PRODUCT_COLS_BASE =
  "id, slug, category, collection, name, brand, tagline, description, seats, specs, images, is_visible, is_featured, is_selection, sort_order";

/** A language's translation columns (added by migrations 0002 and 0003). */
export const translationCols = (locales: readonly ProductLocale[]) =>
  locales.flatMap((l) => [`tagline_${l}`, `description_${l}`]);

export const TRANSLATION_COLS = translationCols(productLocales);

/**
 * What to select, newest schema first. A database that hasn't had the latest
 * migration run errors on the missing columns; the reader then tries the
 * next set, so the site keeps the translations it does have.
 */
export const COLUMN_SETS: { locales: ProductLocale[]; cols: string }[] = localeMigrations
  .map((_, i) => localeMigrations.slice(0, localeMigrations.length - i).flatMap((m) => m.locales))
  .concat([[]])
  .map((locales) => ({ locales, cols: [PRODUCT_COLS_BASE, ...translationCols(locales)].join(", ") }));

const list = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

/** English plus whichever translations are filled in. */
function localized(en: string, get: (l: ProductLocale) => string | null | undefined): Localized {
  const out: Localized = { en };
  for (const l of productLocales) {
    const t = get(l)?.trim();
    if (t) out[l] = t;
  }
  return out;
}

export function rowToProduct(r: ProductRow): Product {
  return {
    slug: r.slug,
    category: r.category as CategorySlug,
    collection: r.collection ?? undefined,
    seats: r.seats?.length ? r.seats : undefined,
    name: r.name,
    brand: r.brand ?? undefined,
    tagline: localized(r.tagline, (l) => r[`tagline_${l}`]),
    description: localized(r.description, (l) => r[`description_${l}`]),
    specs: list<SpecRow>(r.specs).map((s) => ({
      group: s.group ? localized(s.group, (l) => s[`group_${l}`]) : undefined,
      label: localized(s.label, (l) => s[`label_${l}`]),
      value: localized(s.value, (l) => s[`value_${l}`]),
    })),
    images: list<ProductImage>(r.images),
    featured: r.is_featured,
    selection: r.is_selection,
  };
}

/** Spec rows as stored: English plus a key per filled-in translation. */
export function specToRow(s: NonNullable<Product["specs"]>[number]): SpecRow {
  const row: SpecRow = { group: s.group?.en ?? "", label: s.label.en, value: s.value.en };
  for (const l of productLocales) {
    if (s.group?.[l]) row[`group_${l}`] = s.group[l];
    if (s.label[l]) row[`label_${l}`] = s.label[l];
    if (s.value[l]) row[`value_${l}`] = s.value[l];
  }
  return row;
}

/** The other way round: used to turn the bundled catalogue into seed data. */
export function productToRow(p: Product, sortOrder: number): Omit<ProductRow, "id"> {
  const translations: Translations = {};
  for (const l of productLocales) {
    translations[`tagline_${l}`] = p.tagline[l] ?? null;
    translations[`description_${l}`] = p.description[l] ?? null;
  }
  return {
    slug: p.slug,
    category: p.category,
    collection: p.collection ?? null,
    name: p.name,
    brand: p.brand ?? null,
    tagline: p.tagline.en,
    description: p.description.en,
    ...translations,
    seats: p.seats ?? null,
    specs: (p.specs ?? []).map(specToRow),
    images: p.images ?? [],
    is_visible: true,
    is_featured: Boolean(p.featured),
    is_selection: Boolean(p.selection),
    sort_order: sortOrder,
  };
}
