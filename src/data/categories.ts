// Names/descriptions live in the dictionaries (dict.categories[slug]).
// `priority` categories are shown first and larger. Order here = display order
// (home page, products page and the Products menu).
export const categories = [
  { slug: "pool-covers", priority: true, tone: "from-[#0e5a66] to-[#1d8b95]" },
  { slug: "spas", priority: true, tone: "from-[#0f3a4c] to-[#2a7f8e]" },
  { slug: "saunas-hammam", priority: true, tone: "from-[#6b5546] to-[#a07d63]" },
  { slug: "heat-pumps", priority: false, tone: "from-[#7a4b33] to-[#c0805a]" },
  { slug: "pool-robots", priority: false, tone: "from-[#123a52] to-[#3a7fa0]" },
  { slug: "lighting", priority: false, tone: "from-[#1a2440] to-[#4a5f9a]" },
  { slug: "pool-accessories", priority: false, tone: "from-[#1f5d73] to-[#5aa3b5]" },
  { slug: "pool-renovation-liners", priority: false, tone: "from-[#2f6f7a] to-[#6fb0b6]" },
  { slug: "epp-pools", priority: false, tone: "from-[#1b6a78] to-[#4aa0a8]" },
  { slug: "fibreglass-pools", priority: false, tone: "from-[#14566a] to-[#3b95a3]" },
  { slug: "concrete-pools", priority: false, tone: "from-[#3f5d6a] to-[#7f9ba5]" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
