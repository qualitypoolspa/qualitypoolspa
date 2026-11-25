/** The languages product texts are translated into (English is the source). */
export const productLocales = ["es", "sv", "de", "fr", "ru"] as const;
export type ProductLocale = (typeof productLocales)[number];

/**
 * Which migration adds which languages' columns to the `products` table.
 * Code reads the database newest-first and falls back a step when a
 * migration hasn't been run yet, so deploying before migrating is safe.
 */
export const localeMigrations: { file: string; locales: readonly ProductLocale[] }[] = [
  { file: "0002_translations.sql", locales: ["es", "sv"] },
  { file: "0003_more_languages.sql", locales: ["de", "fr", "ru"] },
];
