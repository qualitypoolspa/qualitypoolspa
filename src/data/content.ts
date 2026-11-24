// Slugs for guides and location pages. Their text lives in the dictionaries
// (dict.guides.items[slug], dict.locations.items[slug]). Guide slugs match category slugs.
export const guideSlugs = ["pool-covers", "spas", "saunas-hammam"] as const;
export type GuideSlug = (typeof guideSlugs)[number];

export const locationSlugs = ["marbella", "costa-del-sol", "mallorca"] as const;
export type LocationSlug = (typeof locationSlugs)[number];
