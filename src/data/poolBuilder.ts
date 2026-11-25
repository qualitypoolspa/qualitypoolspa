// Options for the Thermopool pool builder (/products/thermopool).
// TODO(client): confirm the four Thermopool sizes and which options apply.
import type { Localized } from "@/i18n/config";

export type Option = { id: string; label: Localized; note?: Localized };

/** The four sizes: length × width in metres (used for the drawing too). */
export const sizes: (Option & { length: number; width: number })[] = [
  { id: "3x6", length: 6, width: 3, label: { en: "3 × 6 m" }, note: { en: "Compact", es: "Compacta", sv: "Kompakt" } },
  { id: "3.5x7", length: 7, width: 3.5, label: { en: "3.5 × 7 m", es: "3,5 × 7 m", sv: "3,5 × 7 m" }, note: { en: "Family", es: "Familiar", sv: "Familj" } },
  { id: "4x8", length: 8, width: 4, label: { en: "4 × 8 m" }, note: { en: "Classic", es: "Clásica", sv: "Klassisk" } },
  { id: "5x10", length: 10, width: 5, label: { en: "5 × 10 m" }, note: { en: "Large", es: "Grande", sv: "Stor" } },
];

export const depths: Option[] = [
  { id: "1.2", label: { en: "1.2 m", es: "1,2 m", sv: "1,2 m" }, note: { en: "Relaxing and playing", es: "Para relajarse y jugar", sv: "För avkoppling och lek" } },
  { id: "1.4", label: { en: "1.4 m", es: "1,4 m", sv: "1,4 m" }, note: { en: "Most popular", es: "La más popular", sv: "Populärast" } },
  { id: "1.5", label: { en: "1.5 m", es: "1,5 m", sv: "1,5 m" }, note: { en: "For swimming", es: "Para nadar", sv: "För simning" } },
  { id: "slope", label: { en: "Sloping floor", es: "Fondo inclinado", sv: "Sluttande botten" }, note: { en: "Shallow to deep end", es: "De poco a más profundo", sv: "Från grunt till djupt" } },
];

export const stairs: Option[] = [
  { id: "none", label: { en: "No stairs", es: "Sin escalera", sv: "Ingen trappa" }, note: { en: "Ladder entry", es: "Acceso por escalerilla", sv: "Nedstigning med stege" } },
  { id: "corner", label: { en: "Corner stairs", es: "Escalera en esquina", sv: "Hörntrappa" } },
  { id: "full-width", label: { en: "Full-width stairs", es: "Escalera de ancho completo", sv: "Trappa i full bredd" } },
  { id: "roman", label: { en: "Roman stairs", es: "Escalera romana", sv: "Romersk trappa" }, note: { en: "Rounded, centred", es: "Redondeada, centrada", sv: "Rundad, centrerad" } },
];

/** Liner colours (Alkorplan 2010 plain and 3010 mosaic). `hex` is for the colour swatch. */
export const finishes: (Option & { hex: string })[] = [
  { id: "white", label: { en: "White", es: "Blanco", sv: "Vit" }, hex: "#eef3f4" },
  { id: "sand", label: { en: "Beige / sand", es: "Beige / arena", sv: "Beige / sand" }, hex: "#e5d8bd" },
  { id: "light-blue", label: { en: "Light blue", es: "Azul claro", sv: "Ljusblå" }, hex: "#9fd6ec" },
  { id: "blue", label: { en: "Blue", es: "Azul", sv: "Blå" }, hex: "#3e8fd6" },
  { id: "turquoise", label: { en: "Turquoise", es: "Turquesa", sv: "Turkos" }, hex: "#22aeb8" },
  { id: "grey", label: { en: "Grey", es: "Gris", sv: "Grå" }, hex: "#a8b0b4" },
  { id: "dark-grey", label: { en: "Dark grey", es: "Gris oscuro", sv: "Mörkgrå" }, hex: "#4c555b" },
  { id: "mosaic", label: { en: "Mosaic (blue, grey or sand)", es: "Mosaico (azul, gris o arena)", sv: "Mosaik (blå, grå eller sand)" }, hex: "#5aa7c4" },
];

export const extras: Option[] = [
  { id: "slatted-cover", label: { en: "Automatic slatted cover", es: "Cubierta automática de lamas", sv: "Automatiskt lamellskydd" } },
  { id: "bubble-cover", label: { en: "Solar bubble cover", es: "Manta solar de burbujas", sv: "Solskydd med bubblor" } },
  { id: "heat-pump", label: { en: "Heat pump", es: "Bomba de calor", sv: "Värmepump" } },
  { id: "lighting", label: { en: "LED lighting", es: "Iluminación LED", sv: "LED-belysning" } },
  { id: "robot", label: { en: "Robotic cleaner", es: "Robot limpiafondos", sv: "Poolrobot" } },
  { id: "ladder", label: { en: "Ladder and handrails", es: "Escalera y pasamanos", sv: "Stege och ledstänger" } },
  { id: "shower", label: { en: "Solar shower", es: "Ducha solar", sv: "Soldusch" } },
  { id: "salt", label: { en: "Salt chlorination", es: "Cloración salina", sv: "Saltklorering" } },
];

export const locations: Option[] = [
  { id: "marbella", label: { en: "Marbella" } },
  { id: "costa-del-sol", label: { en: "Elsewhere on the Costa del Sol", es: "Otro lugar de la Costa del Sol", sv: "Annan plats på Costa del Sol" } },
  { id: "mallorca", label: { en: "Mallorca" } },
  { id: "other", label: { en: "Other", es: "Otro", sv: "Annat" } },
];

export const timeframes: Option[] = [
  { id: "asap", label: { en: "As soon as possible", es: "Lo antes posible", sv: "Så snart som möjligt" } },
  { id: "3-months", label: { en: "Within 3 months", es: "En los próximos 3 meses", sv: "Inom 3 månader" } },
  { id: "6-months", label: { en: "Within 6 months", es: "En los próximos 6 meses", sv: "Inom 6 månader" } },
  { id: "exploring", label: { en: "Just exploring", es: "Solo estoy mirando", sv: "Jag undersöker bara" } },
];
