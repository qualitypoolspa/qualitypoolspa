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
    title: { en: "Spa package", es: "Paquete spa", sv: "Spapaket" },
    text: { en: "A complete spa package, delivered and installed, ready for your first evening in the water.", es: "Un paquete de spa completo, entregado e instalado, listo para tu primera noche en el agua.", sv: "Ett komplett spapaket, levererat och installerat, klart för din första kväll i vattnet." },
    includes: [
      { en: "Aquavia spa of your choice", es: "Spa Aquavia a tu elección", sv: "Valfritt spabad från Aquavia" },
      { en: "Insulated cover and cover lifter", es: "Cubierta aislante y elevador de cubierta", sv: "Isolerat lock och locklyft" },
      { en: "Steps and water-care starter kit", es: "Escalones y kit inicial de tratamiento del agua", sv: "Trappsteg och startkit för vattenvård" },
      { en: "Delivery and installation", es: "Entrega e instalación", sv: "Leverans och installation" },
    ],
    image: "/products/aquavia/spa-feel/1.webp",
    sample: true,
  },
  {
    slug: "pool-season-package",
    title: { en: "Pool season package", es: "Paquete temporada de piscina", sv: "Poolsäsongspaket" },
    text: { en: "Swim earlier in spring and later in autumn, with less cleaning and lower running costs.", es: "Báñate antes en primavera y hasta más tarde en otoño, con menos limpieza y menores costes de funcionamiento.", sv: "Bada tidigare på våren och längre in på hösten, med mindre städning och lägre driftkostnader." },
    includes: [
      { en: "Automatic slatted cover (Octéo, Sveltéa or Bellasun)", es: "Cubierta automática de lamas (Octéo, Sveltéa o Bellasun)", sv: "Automatiskt lamellskydd (Octéo, Sveltéa eller Bellasun)" },
      { en: "Zodiac inverter heat pump", es: "Bomba de calor inverter Zodiac", sv: "Zodiac inverter-värmepump" },
      { en: "Installation and start-up", es: "Instalación y puesta en marcha", sv: "Installation och driftsättning" },
    ],
    image: "/products/astralpool/octeo/1.webp",
    sample: true,
  },
];

/** Campaigns that haven't expired. */
export const activeCampaigns = (today = new Date().toISOString().slice(0, 10)) =>
  campaigns.filter((c) => !c.validUntil || c.validUntil >= today);
