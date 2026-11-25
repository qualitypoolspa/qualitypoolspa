import "server-only";
import { categories } from "@/data/categories";
import { getDictionary } from "@/i18n/dictionaries";

/** Category and collection names as the site shows them, for the panel's menus. */
export async function adminNames() {
  const dict = await getDictionary("en");
  return {
    categories: categories.map((c) => ({ slug: c.slug as string, name: dict.categories[c.slug].name })),
    collections: dict.collections as Record<string, string>,
  };
}
