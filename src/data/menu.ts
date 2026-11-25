import { categories, menuGroups, type CategorySlug, type MenuGroup } from "./categories";
import type { Catalog } from "@/lib/catalog";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type MenuLink = { name: string; href: string };
export type MenuColumn = { title?: string; links: MenuLink[] };
/** A top-level menu item: a plain link, or a dropdown with columns of links. */
export type NavItem = { key: string; name: string; href: string; columns: MenuColumn[] };

const groupLabel = (g: MenuGroup, dict: Dictionary) =>
  ({
    pool: dict.nav.pool,
    spas: dict.nav.spas,
    "pool-covers": dict.nav.poolCovers,
    "pool-accessories": dict.nav.poolAccessories,
    sauna: dict.nav.sauna,
  })[g];

/** Collection keys present in a category, in dict.collections order ("selection" first if any). */
function collectionKeys(cat: CategorySlug, dict: Dictionary, catalog: Catalog) {
  const order = Object.keys(dict.collections);
  const keys = [...new Set(catalog.productsIn(cat).map((p) => p.collection).filter((k): k is string => !!k))].sort(
    (a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99),
  );
  if (catalog.selectionIn(cat).length) keys.unshift("selection");
  return keys;
}

/** Links for a category: one per collection when it has several, else the category itself. */
function categoryLinks(cat: CategorySlug, lang: Locale, dict: Dictionary, catalog: Catalog): MenuLink[] {
  const base = href(lang, `/products/${cat}`);
  const keys = collectionKeys(cat, dict, catalog);
  const names = dict.collections as Record<string, string>;
  return keys.length > 1
    ? keys.map((k) => ({ name: names[k] ?? k, href: `${base}#${k}` }))
    : [{ name: dict.categories[cat].name, href: base }];
}

/** The product part of the main menu: Pool, Spas, Pool covers, Pool accessories, Sauna. */
export function productNav(lang: Locale, dict: Dictionary, catalog: Catalog): NavItem[] {
  return menuGroups.map((g) => {
    const cats = categories.filter((c) => c.group === g).map((c) => c.slug);
    const first = href(lang, `/products/${cats[0]}`);
    // Groups with several categories link to their section of the products overview.
    const overview = cats.length > 1 ? href(lang, `/products#${g}`) : first;

    if (g === "spas") {
      const seats = [...new Set(catalog.productsIn("spas").flatMap((p) => p.seats ?? []))].sort((a, b) => a - b);
      return {
        key: g,
        name: groupLabel(g, dict),
        href: first,
        columns: [
          {
            title: dict.products.bySize,
            links: seats.map((n) => ({
              name: dict.products.forPeople.replace("{n}", String(n)),
              href: `${first}#for-${n}`,
            })),
          },
          { title: dict.products.collectionsTitle, links: categoryLinks("spas", lang, dict, catalog) },
        ],
      };
    }

    // Several categories (Pool, Pool accessories): one link per category, or per collection
    // for categories split into collections (e.g. Ladders & handrails, Solar showers).
    // A single category (Pool covers): its collections. Sauna: a plain link.
    // In multi-category groups, only "Ladders & showers" is split into its collections.
    const links =
      cats.length > 1
        ? cats.flatMap((c) =>
            c === "pool-accessories"
              ? categoryLinks(c, lang, dict, catalog)
              : [{ name: dict.categories[c].name, href: href(lang, `/products/${c}`) }],
          )
        : categoryLinks(cats[0], lang, dict, catalog);
    const isPlainLink = links.length === 1;
    return { key: g, name: groupLabel(g, dict), href: overview, columns: isPlainLink ? [] : [{ links }] };
  });
}
