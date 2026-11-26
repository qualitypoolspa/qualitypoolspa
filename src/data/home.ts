// Content for the home page: hero photos and the brands strip.
import type { Localized } from "@/i18n/config";

/** Hero slides: real installation photos. `product` links the caption to its page. */
export const heroSlides: { image: string; product: { category: string; slug: string; name: string }; line: Localized }[] = [
  {
    image: "/products/aquavia/spa-cube/4.webp",
    product: { category: "spas", slug: "spa-cube", name: "Cube" },
    line: { en: "Exclusive Line, terrace at dusk", es: "Exclusive Line, terraza al atardecer", sv: "Exclusive Line, terrass i skymningen", de: "Exclusive Line, Terrasse in der Abenddämmerung", fr: "Exclusive Line, terrasse au crépuscule", ru: "Exclusive Line, терраса в сумерках" },
  },
  {
    image: "/products/aquavia/spa-home/3.webp",
    product: { category: "spas", slug: "spa-home", name: "Home" },
    line: { en: "Exclusive Line, villa terrace", es: "Exclusive Line, terraza de villa", sv: "Exclusive Line, villaterrass", de: "Exclusive Line, Villenterrasse", fr: "Exclusive Line, terrasse de villa", ru: "Exclusive Line, терраса виллы" },
  },
  {
    image: "/products/aquavia/spa-oasis-40/4.webp",
    product: { category: "spas", slug: "spa-oasis-40", name: "Oasis 40" },
    line: { en: "Built-in, facing the sea", es: "Empotrado, frente al mar", sv: "Infällt, med utsikt mot havet", de: "Eingebaut, mit Blick aufs Meer", fr: "Encastré, face à la mer", ru: "Встроенный, с видом на море" },
  },
  {
    image: "/products/aquavia/hot-tub-kora/3.webp",
    product: { category: "spas", slug: "hot-tub-kora", name: "Kora" },
    line: { en: "Signature Line, garden pavilion", es: "Signature Line, pabellón de jardín", sv: "Signature Line, trädgårdspaviljong", de: "Signature Line, Gartenpavillon", fr: "Signature Line, pavillon de jardin", ru: "Signature Line, садовый павильон" },
  },
  {
    image: "/products/aquavia/spa-touch/4.webp",
    product: { category: "spas", slug: "spa-touch", name: "Touch" },
    line: { en: "Compact spa, Mediterranean garden", es: "Spa compacto, jardín mediterráneo", sv: "Kompakt spabad, medelhavsträdgård", de: "Kompakter Whirlpool, mediterraner Garten", fr: "Spa compact, jardin méditerranéen", ru: "Компактный спа, средиземноморский сад" },
  },
];

/** Brands we supply (names only, no logos). */
export const brands = ["Aquavia Spa", "AstralPool", "Zodiac", "Fluidra", "Alkorplan", "Harvia"];

/** Photos for category tiles and category page headers. Categories without one show type only. */
export const categoryImages: Record<string, string> = {
  spas: "/products/aquavia/spa-home/4.webp",
  "pool-covers": "/products/astralpool/octeo/1.webp",
  "heat-pumps": "/products/zodiac/z550iq/1.webp",
  lighting: "/products/astralpool/lumiplus-flexi/1.webp",
  "pool-robots": "/products/zodiac/voyager-re-4300/2.webp",
  "pool-accessories": "/site/garden-pool.webp",
  "pool-renovation-liners": "/products/astralpool/alkorplan-3010/1.webp",
};
