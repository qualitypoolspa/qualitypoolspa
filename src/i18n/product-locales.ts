/** The languages product texts are translated into (English is the source). */
export const productLocales = ["es", "sv"] as const;
export type ProductLocale = (typeof productLocales)[number];
