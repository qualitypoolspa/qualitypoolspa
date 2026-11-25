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
    title: { en: "Spa package", es: "Paquete spa", sv: "Spapaket", de: "Whirlpool-Paket", fr: "Pack spa", ru: "Спа-пакет" },
    text: { en: "A complete spa package, delivered and installed, ready for your first evening in the water.", es: "Un paquete de spa completo, entregado e instalado, listo para tu primera noche en el agua.", sv: "Ett komplett spapaket, levererat och installerat, klart för din första kväll i vattnet.", de: "Ein komplettes Whirlpool-Paket, geliefert und installiert, bereit für Ihren ersten Abend im Wasser.", fr: "Un pack spa complet, livré et installé, prêt pour votre première soirée dans l’eau.", ru: "Полный спа-пакет с доставкой и установкой — всё готово к вашему первому вечеру в воде." },
    includes: [
      { en: "Aquavia spa of your choice", es: "Spa Aquavia a tu elección", sv: "Valfritt spabad från Aquavia", de: "Aquavia-Whirlpool Ihrer Wahl", fr: "Spa Aquavia au choix", ru: "Спа Aquavia на ваш выбор" },
      { en: "Insulated cover and cover lifter", es: "Cubierta aislante y elevador de cubierta", sv: "Isolerat lock och locklyft", de: "Isolierte Abdeckung und Abdeckungslift", fr: "Couverture isolante et lève-couverture", ru: "Теплоизоляционная крышка и подъёмник крышки" },
      { en: "Steps and water-care starter kit", es: "Escalones y kit inicial de tratamiento del agua", sv: "Trappsteg och startkit för vattenvård", de: "Stufen und Starterset für die Wasserpflege", fr: "Marches et kit de démarrage pour l’entretien de l’eau", ru: "Ступени и стартовый набор для ухода за водой" },
      { en: "Delivery and installation", es: "Entrega e instalación", sv: "Leverans och installation", de: "Lieferung und Installation", fr: "Livraison et installation", ru: "Доставка и установка" },
    ],
    image: "/products/aquavia/spa-feel/1.webp",
    sample: true,
  },
  {
    slug: "pool-season-package",
    title: { en: "Pool season package", es: "Paquete temporada de piscina", sv: "Poolsäsongspaket", de: "Poolsaison-Paket", fr: "Pack saison piscine", ru: "Пакет «Купальный сезон»" },
    text: { en: "Swim earlier in spring and later in autumn, with less cleaning and lower running costs.", es: "Báñate antes en primavera y hasta más tarde en otoño, con menos limpieza y menores costes de funcionamiento.", sv: "Bada tidigare på våren och längre in på hösten, med mindre städning och lägre driftkostnader.", de: "Schwimmen Sie früher im Frühjahr und länger im Herbst, mit weniger Reinigung und niedrigeren Betriebskosten.", fr: "Baignez-vous plus tôt au printemps et plus tard à l’automne, avec moins de nettoyage et des coûts de fonctionnement réduits.", ru: "Купайтесь раньше весной и дольше осенью, тратя меньше времени на уборку и меньше денег на эксплуатацию." },
    includes: [
      { en: "Automatic slatted cover (Octéo, Sveltéa or Bellasun)", es: "Cubierta automática de lamas (Octéo, Sveltéa o Bellasun)", sv: "Automatiskt lamellskydd (Octéo, Sveltéa eller Bellasun)", de: "Automatische Lamellenabdeckung (Octéo, Sveltéa oder Bellasun)", fr: "Volet automatique à lames (Octéo, Sveltéa ou Bellasun)", ru: "Автоматическое ламельное покрытие (Octéo, Sveltéa или Bellasun)" },
      { en: "Zodiac inverter heat pump", es: "Bomba de calor inverter Zodiac", sv: "Zodiac inverter-värmepump", de: "Zodiac Inverter-Wärmepumpe", fr: "Pompe à chaleur inverter Zodiac", ru: "Инверторный тепловой насос Zodiac" },
      { en: "Installation and start-up", es: "Instalación y puesta en marcha", sv: "Installation och driftsättning", de: "Installation und Inbetriebnahme", fr: "Installation et mise en service", ru: "Установка и ввод в эксплуатацию" },
    ],
    image: "/products/astralpool/octeo/1.webp",
    sample: true,
  },
];

/** Campaigns that haven't expired. */
export const activeCampaigns = (today = new Date().toISOString().slice(0, 10)) =>
  campaigns.filter((c) => !c.validUntil || c.validUntil >= today);
