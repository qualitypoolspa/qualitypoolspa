// Options for the Thermopool pool builder (/products/thermopool).
// TODO(client): confirm the four Thermopool sizes and which options apply.
import type { Localized } from "@/i18n/config";

export type Option = { id: string; label: Localized; note?: Localized };

/** The four sizes: length × width in metres (used for the drawing too). */
export const sizes: (Option & { length: number; width: number })[] = [
  { id: "3x6", length: 6, width: 3, label: { en: "3 × 6 m" }, note: { en: "Compact" } },
  { id: "3.5x7", length: 7, width: 3.5, label: { en: "3.5 × 7 m" }, note: { en: "Family" } },
  { id: "4x8", length: 8, width: 4, label: { en: "4 × 8 m" }, note: { en: "Classic" } },
  { id: "5x10", length: 10, width: 5, label: { en: "5 × 10 m" }, note: { en: "Large" } },
];

export const depths: Option[] = [
  { id: "1.2", label: { en: "1.2 m" }, note: { en: "Relaxing and playing" } },
  { id: "1.4", label: { en: "1.4 m" }, note: { en: "Most popular" } },
  { id: "1.5", label: { en: "1.5 m" }, note: { en: "For swimming" } },
  { id: "slope", label: { en: "Sloping floor" }, note: { en: "Shallow to deep end" } },
];

export const stairs: Option[] = [
  { id: "none", label: { en: "No stairs" }, note: { en: "Ladder entry" } },
  { id: "corner", label: { en: "Corner stairs" } },
  { id: "full-width", label: { en: "Full-width stairs" } },
  { id: "roman", label: { en: "Roman stairs" }, note: { en: "Rounded, centred" } },
];

/** Liner colours (Alkorplan 2010 plain and 3010 mosaic). `hex` is for the colour swatch. */
export const finishes: (Option & { hex: string })[] = [
  { id: "white", label: { en: "White" }, hex: "#eef3f4" },
  { id: "sand", label: { en: "Beige / sand" }, hex: "#e5d8bd" },
  { id: "light-blue", label: { en: "Light blue" }, hex: "#9fd6ec" },
  { id: "blue", label: { en: "Blue" }, hex: "#3e8fd6" },
  { id: "turquoise", label: { en: "Turquoise" }, hex: "#22aeb8" },
  { id: "grey", label: { en: "Grey" }, hex: "#a8b0b4" },
  { id: "dark-grey", label: { en: "Dark grey" }, hex: "#4c555b" },
  { id: "mosaic", label: { en: "Mosaic (blue, grey or sand)" }, hex: "#5aa7c4" },
];

export const extras: Option[] = [
  { id: "slatted-cover", label: { en: "Automatic slatted cover" } },
  { id: "bubble-cover", label: { en: "Solar bubble cover" } },
  { id: "heat-pump", label: { en: "Heat pump" } },
  { id: "lighting", label: { en: "LED lighting" } },
  { id: "robot", label: { en: "Robotic cleaner" } },
  { id: "ladder", label: { en: "Ladder and handrails" } },
  { id: "shower", label: { en: "Solar shower" } },
  { id: "salt", label: { en: "Salt chlorination" } },
];

export const locations: Option[] = [
  { id: "marbella", label: { en: "Marbella" } },
  { id: "costa-del-sol", label: { en: "Elsewhere on the Costa del Sol" } },
  { id: "mallorca", label: { en: "Mallorca" } },
  { id: "other", label: { en: "Other" } },
];

export const timeframes: Option[] = [
  { id: "asap", label: { en: "As soon as possible" } },
  { id: "3-months", label: { en: "Within 3 months" } },
  { id: "6-months", label: { en: "Within 6 months" } },
  { id: "exploring", label: { en: "Just exploring" } },
];
