// Names/descriptions live in the dictionaries (dict.categories[slug]).
// `group` = the top-level menu item the category belongs to (see menuGroups).
// `priority` categories are shown first and larger on the home and products pages.
export const categories = [
  { slug: "pool-covers", group: "pool-covers", priority: true, tone: "from-[#0e5a66] to-[#1d8b95]" },
  { slug: "spas", group: "spas", priority: true, tone: "from-[#0f3a4c] to-[#2a7f8e]" },
  { slug: "saunas-hammam", group: "sauna", priority: true, tone: "from-[#6b5546] to-[#a07d63]" },
  { slug: "ep-pools", group: "pool", priority: false, tone: "from-[#1b6a78] to-[#4aa0a8]" },
  { slug: "fibreglass-pools", group: "pool", priority: false, tone: "from-[#14566a] to-[#3b95a3]" },
  { slug: "thermopool", group: "pool", priority: false, tone: "from-[#3f5d6a] to-[#7f9ba5]" },
  { slug: "heat-pumps", group: "pool-accessories", priority: false, tone: "from-[#7a4b33] to-[#c0805a]" },
  { slug: "pool-robots", group: "pool-accessories", priority: false, tone: "from-[#123a52] to-[#3a7fa0]" },
  { slug: "lighting", group: "pool-accessories", priority: false, tone: "from-[#1a2440] to-[#4a5f9a]" },
  { slug: "pool-accessories", group: "pool-accessories", priority: false, tone: "from-[#1f5d73] to-[#5aa3b5]" },
  { slug: "pool-renovation-liners", group: "pool-accessories", priority: false, tone: "from-[#2f6f7a] to-[#6fb0b6]" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

/** Top-level product menu items, in menu order. Names live in dict.nav. */
export const menuGroups = ["pool", "spas", "pool-covers", "pool-accessories", "sauna"] as const;
export type MenuGroup = (typeof menuGroups)[number];

/** Categories with a pool builder instead of a product list. */
export const builderCategories: readonly CategorySlug[] = ["thermopool"];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
