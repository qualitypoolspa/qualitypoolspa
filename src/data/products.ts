import type { Localized } from "@/i18n/config";
import type { CategorySlug } from "./categories";

export type Product = {
  slug: string;
  category: CategorySlug;
  /** Model name (not translated) */
  name: string;
  /** Optional supplier / brand, shown on the product page when set */
  brand?: string;
  tagline: Localized;
  description: Localized;
  specs?: { label: Localized; value: string }[];
  /** Paths under /public, e.g. "/products/spa-nordic/1.jpg". Empty = placeholder art. */
  images?: string[];
  downloads?: { label: Localized; url: string }[];
  featured?: boolean;
  /** Demo content: shows a "Sample product" badge. Remove when real data is added. */
  sample?: boolean;
};

// TODO(client): replace the sample products with real ones once the sources
// and reuse permission (images, specs, PDFs) are confirmed per supplier.
export const products: Product[] = [
  {
    slug: "automatic-roller-cover",
    category: "pool-covers",
    name: "Automatic Roller Cover",
    tagline: { en: "Cover or open your pool at the touch of a button." },
    description: {
      en: "An automatic pool cover that keeps debris out, reduces evaporation and heat loss, and adds safety. Sample text, replace with the real product description.",
    },
    specs: [
      { label: { en: "Type" }, value: "Automatic, above or below water" },
      { label: { en: "Control" }, value: "Key switch or remote" },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "solar-bubble-cover",
    category: "pool-covers",
    name: "Solar Bubble Cover",
    tagline: { en: "Free heat from the sun, less evaporation." },
    description: {
      en: "A cost-effective cover that captures solar heat and cuts water loss. Sample text, replace with the real product description.",
    },
    sample: true,
  },
  {
    slug: "nordic-4-hot-tub",
    category: "spas",
    name: "Nordic 4",
    tagline: { en: "A compact spa for up to four people." },
    description: {
      en: "A comfortable spa with hydrotherapy jets, LED lighting and an insulated cover. Sample text, replace with the real product description.",
    },
    specs: [
      { label: { en: "Seats" }, value: "4" },
      { label: { en: "Voltage" }, value: "230 V" },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "swim-spa-6",
    category: "spas",
    name: "Swim Spa 6 m",
    tagline: { en: "Swim, train and relax all year round." },
    description: {
      en: "A swim spa with adjustable current for training, plus a lounge area. Sample text, replace with the real product description.",
    },
    sample: true,
  },
  {
    slug: "barrel-sauna",
    category: "saunas-hammam",
    name: "Barrel Sauna",
    tagline: { en: "Classic outdoor sauna with a Nordic feel." },
    description: {
      en: "A heat-treated timber barrel sauna for gardens and terraces. Sample text, replace with the real product description.",
    },
    specs: [{ label: { en: "Capacity" }, value: "4 to 6 people" }],
    featured: true,
    sample: true,
  },
  {
    slug: "infrared-cabin",
    category: "saunas-hammam",
    name: "Infrared Cabin",
    tagline: { en: "Gentle infrared warmth for indoor wellness." },
    description: {
      en: "An indoor infrared cabin that heats up fast and uses little energy. Sample text, replace with the real product description.",
    },
    sample: true,
  },
];

export const getProduct = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);

export const productsIn = (category: CategorySlug) =>
  products.filter((p) => p.category === category);
