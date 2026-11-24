import { categories } from "./categories";
import { productsIn, selectionIn } from "./products";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type MenuLink = { name: string; href: string };
export type MenuCategory = MenuLink & { slug: string; children: MenuLink[] };

/**
 * The Products menu: every category, with its sub-categories (collections) derived
 * from the products in it. Collections appear in the order of dict.collections.
 */
export function productMenu(lang: Locale, dict: Dictionary): MenuCategory[] {
  const order = Object.keys(dict.collections);
  const names = dict.collections as Record<string, string>;

  return categories.map((c) => {
    const base = href(lang, `/products/${c.slug}`);
    const keys = [...new Set(productsIn(c.slug).map((p) => p.collection).filter((k): k is string => !!k))].sort(
      (a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99),
    );
    if (selectionIn(c.slug).length) keys.unshift("selection");
    return {
      slug: c.slug,
      name: dict.categories[c.slug].name,
      href: base,
      children: keys.length > 1 ? keys.map((k) => ({ name: names[k] ?? k, href: `${base}#${k}` })) : [],
    };
  });
}
