import type { Localized } from "@/i18n/config";
import type { CategorySlug } from "./categories";

export type GalleryItem = {
  id: string;
  category: CategorySlug;
  title: Localized;
  location?: string;
  /** Path under /public, e.g. "/gallery/marbella-spa.jpg". Missing = placeholder tile. */
  image?: string;
  /** [width, height] of the image, used for sizing. Defaults to 4:3. */
  size?: [number, number];
  sample?: boolean;
};

// To add a project: drop the photo in /public/gallery and add an entry here.
// TODO(client): replace the sample entries with real installation photos.
export const gallery: GalleryItem[] = [
  { id: "g1", category: "spas", title: { en: "Hot tub on a terrace", es: "Jacuzzi en una terraza", sv: "Bubbelpool på en terrass" }, location: "Marbella", sample: true },
  { id: "g2", category: "saunas-hammam", title: { en: "Garden barrel sauna", es: "Sauna barril en el jardín", sv: "Tunnbastu i trädgården" }, location: "Mallorca", sample: true },
  { id: "g3", category: "pool-covers", title: { en: "Automatic pool cover", es: "Cubierta automática de piscina", sv: "Automatiskt poolskydd" }, location: "Costa del Sol", sample: true },
  { id: "g4", category: "fibreglass-pools", title: { en: "Fibreglass pool installation", es: "Instalación de piscina de fibra de vidrio", sv: "Installation av glasfiberpool" }, location: "Marbella", sample: true },
  { id: "g5", category: "spas", title: { en: "Swim spa by the sea", es: "Spa de nado junto al mar", sv: "Simspa vid havet" }, location: "Mallorca", sample: true },
  { id: "g6", category: "pool-renovation-liners", title: { en: "Renovated pool with new liner", es: "Piscina renovada con liner nuevo", sv: "Renoverad pool med ny liner" }, location: "Costa del Sol", sample: true },
  { id: "g7", category: "saunas-hammam", title: { en: "Indoor infrared cabin", es: "Cabina de infrarrojos de interior", sv: "Infraröd kabin inomhus" }, location: "Marbella", sample: true },
  { id: "g8", category: "thermopool", title: { en: "Thermopool installation", es: "Instalación de Thermopool", sv: "Installation av Thermopool" }, location: "Mallorca", sample: true },
  { id: "g9", category: "pool-covers", title: { en: "Solar cover in use", es: "Manta solar en uso", sv: "Solskydd i användning" }, location: "Costa del Sol", sample: true },
];
