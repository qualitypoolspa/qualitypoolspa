import type { Localized } from "@/i18n/config";

export type Campaign = {
  slug: string;
  title: Localized;
  /** One or two sentences shown on the card. */
  text: Localized;
  /** What's included, e.g. for package deals. */
  includes?: Localized[];
  /** Photo under /public (e.g. "/campaigns/spa-package.jpg") or a product photo path. */
  image?: string;
  /** ISO date; the campaign is hidden after this day. */
  validUntil?: string;
  /** Demo content: shows a "Sample" badge. Remove when real campaigns are added. */
  sample?: boolean;
};

// TODO(client): add the real campaigns and package deals here; remove the samples.
export const campaigns: Campaign[] = [
  {
    slug: "spa-package",
    title: { en: "Spa package" },
    text: { en: "A complete spa package, delivered and installed, ready for your first evening in the water." },
    includes: [
      { en: "Aquavia spa of your choice" },
      { en: "Insulated cover and cover lifter" },
      { en: "Steps and water-care starter kit" },
      { en: "Delivery and installation" },
    ],
    image: "/products/aquavia/spa-feel/1.webp",
    sample: true,
  },
  {
    slug: "pool-season-package",
    title: { en: "Pool season package" },
    text: { en: "Swim earlier in spring and later in autumn, with less cleaning and lower running costs." },
    includes: [
      { en: "Automatic slatted cover (Octéo, Sveltéa or Bellasun)" },
      { en: "Zodiac inverter heat pump" },
      { en: "Installation and start-up" },
    ],
    image: "/products/astralpool/octeo/1.webp",
    sample: true,
  },
];

/** Campaigns that haven't expired. */
export const activeCampaigns = (today = new Date().toISOString().slice(0, 10)) =>
  campaigns.filter((c) => !c.validUntil || c.validUntil >= today);
