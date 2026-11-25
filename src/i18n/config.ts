// All languages the site is designed for.
export const allLocales = ["en", "es", "sv", "fr", "de", "ru"] as const;
export type Locale = (typeof allLocales)[number];

// Languages that are live. To launch a language: add its dictionary in
// ./dictionaries.ts + ./dictionaries/<lang>.json, then add it here.
export const locales: readonly Locale[] = ["en", "es", "sv", "de", "fr", "ru"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  sv: "Svenska",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Locale-prefixed internal link, e.g. href("en", "/products") -> "/en/products" */
export const href = (lang: Locale, path = "") =>
  `/${lang}${path === "/" ? "" : path}`;

/** A string translated per language; English is the required fallback. */
export type Localized = { en: string } & Partial<Record<Locale, string>>;
export const pick = (value: Localized, lang: Locale) => value[lang] ?? value.en;
