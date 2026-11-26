// AstralPool (Fluidra) pool covers. Source: Fluidra Katalog 2023 (pages 135–145, 155)
// and AstralPool's product leaflets for the photos. Specs translated from Swedish.
import type { SupplierProduct, ProductImage } from "../products";

const photos = (slug: string, sizes: [number, number][]): ProductImage[] =>
  sizes.map(([width, height], i) => ({ src: `/products/astralpool/${slug}/${i + 1}.webp`, width, height }));

// Shared by all three slatted covers.
const slatSpecs = [
  { group: { en: "Slats" }, label: { en: "Material" }, value: "Stain- and UV-resistant PVC" },
  { group: { en: "Slats" }, label: { en: "Slat size" }, value: "71 mm wide, 17 mm thick" },
  { group: { en: "Slats" }, label: { en: "Slat colours" }, value: "Mid grey, Grey, White, Sand" },
  { group: { en: "Slats" }, label: { en: "Thermal resistance" }, value: "0.18 m²·K/W" },
  { group: { en: "Slats" }, label: { en: "Supplied" }, value: "7 slats pre-assembled (0.5 m) to save installation time" },
];

export const astralpoolProducts: SupplierProduct[] = [
  {
    slug: "octeo",
    category: "pool-covers",
    collection: "slatted-covers",
    name: "Octéo",
    brand: "AstralPool",
    tagline: { en: "AstralPool's design-led automatic slatted cover for pools up to 7.5 × 15 m." },
    description: {
      en: "Octéo is an above-ground automatic slatted cover. The roller sits on the pool deck between two sculpted cast-aluminium legs that house the 24 V motor, and the cover glides over the water at the turn of a key or from your phone. It keeps the pool clean, reduces heat loss and evaporation, and secures the pool to the French NF P90-308 safety standard. Choose from four leg finishes and four slat colours, with optional solar-powered LED lighting in both legs.",
    },
    specs: [
      { group: { en: "General" }, label: { en: "Max pool size (inside)" }, value: "7.5 × 15 m" },
      { group: { en: "General" }, label: { en: "Type" }, value: "Above-ground, fixed legs" },
      { group: { en: "General" }, label: { en: "Motor" }, value: "24 V tubular motor with limit switch" },
      { group: { en: "General" }, label: { en: "Power" }, value: "Mains connection" },
      { group: { en: "General" }, label: { en: "Salt chlorinator contact" }, value: "Included" },
      { group: { en: "General" }, label: { en: "Manual operation" }, value: "Motor can be disengaged to open or close by hand" },
      { group: { en: "General" }, label: { en: "Structure" }, value: "Cast aluminium" },
      ...slatSpecs,
      { group: { en: "Options" }, label: { en: "Leg finishes" }, value: "White/white, White/anthracite, Anthracite/white, Anthracite/anthracite" },
      { group: { en: "Options" }, label: { en: "Control" }, value: "Key switch on the leg; optional Cover Connect app, wall keypad or key-fob remote" },
      { group: { en: "Options" }, label: { en: "Lighting" }, value: "Optional solar-powered LED lighting on both legs" },
      { group: { en: "Warranty & standards" }, label: { en: "Warranty" }, value: "5 years on motor and control box" },
      { group: { en: "Warranty & standards" }, label: { en: "Safety standard" }, value: "NF P90-308 (with key switch, app or wall keypad)" },
    ],
    images: photos("octeo", [[1600, 932], [1600, 538], [597, 890], [604, 900], [599, 893], [486, 724]]),
  },
  {
    slug: "sveltea",
    category: "pool-covers",
    collection: "slatted-covers",
    name: "Sveltéa",
    brand: "AstralPool",
    tagline: { en: "A slim, compact automatic slatted cover for pools up to 5 × 10 m." },
    description: {
      en: "Sveltéa brings automatic covering to smaller pools in a slim, compact design. The aluminium axle is built into the leg for a cleaner look and to protect the motor in bad weather, and an extra ball bearing gives smoother running. The cover keeps the pool clean, warmer and safe to the NF P90-308 standard. Four two-tone leg finishes are available, including white with turquoise.",
    },
    specs: [
      { group: { en: "General" }, label: { en: "Max pool size (inside)" }, value: "5 × 10 m" },
      { group: { en: "General" }, label: { en: "Type" }, value: "Above-ground, fixed legs" },
      { group: { en: "General" }, label: { en: "Motor" }, value: "24 V tubular motor with limit switch" },
      { group: { en: "General" }, label: { en: "Power" }, value: "Mains connection" },
      { group: { en: "General" }, label: { en: "Salt chlorinator contact" }, value: "Optional" },
      { group: { en: "General" }, label: { en: "Manual operation" }, value: "Motor can be disengaged to open or close by hand" },
      ...slatSpecs,
      { group: { en: "Options" }, label: { en: "Leg finishes" }, value: "White/white, White/anthracite, White/light grey, White/turquoise" },
      { group: { en: "Options" }, label: { en: "Control" }, value: "Key switch on the leg; optional Cover Connect app, wall keypad or key-fob remote" },
      { group: { en: "Warranty & standards" }, label: { en: "Warranty" }, value: "3 years on motor and control box" },
      { group: { en: "Warranty & standards" }, label: { en: "Safety standard" }, value: "NF P90-308 (with key switch, app or wall keypad)" },
    ],
    images: photos("sveltea", [[1572, 1600], [1600, 565], [669, 998], [685, 1020], [672, 1001], [673, 1003]]),
  },
  {
    slug: "bellasun",
    category: "pool-covers",
    collection: "slatted-covers",
    name: "Bellasun",
    brand: "AstralPool",
    tagline: { en: "A solar-powered automatic slatted cover: no electrical installation needed." },
    description: {
      en: "Bellasun opens and closes using energy from a discreet black solar panel built into its leg, so no electrical connection is needed. That makes it ideal for existing pools. A fully charged battery gives about 20 openings and closings, and a charge regulator protects the battery from deep discharge. The leg is Rilsan-coated aluminium for excellent corrosion resistance. Made in France, it covers pools up to 6 × 12 m. The solar panel needs a sunny position, away from shade.",
    },
    specs: [
      { group: { en: "General" }, label: { en: "Max pool size (inside)" }, value: "6.03 × 12 m" },
      { group: { en: "General" }, label: { en: "Type" }, value: "Above-ground, fixed legs" },
      { group: { en: "General" }, label: { en: "Motor" }, value: "24 V tubular motor with limit switch" },
      { group: { en: "General" }, label: { en: "Power" }, value: "Solar panel + 24 V battery (2 × 12 V); no mains connection" },
      { group: { en: "General" }, label: { en: "Battery capacity" }, value: "About 20 openings/closings on a full charge" },
      { group: { en: "General" }, label: { en: "Axle" }, value: "Anodised aluminium, Ø 146 or 196 mm" },
      { group: { en: "General" }, label: { en: "Leg" }, value: "Rilsan-coated aluminium, white with black solar panel" },
      { group: { en: "General" }, label: { en: "Manual operation" }, value: "Motor can be disengaged to open or close by hand" },
      { group: { en: "General" }, label: { en: "Control" }, value: "Key switch on the leg" },
      ...slatSpecs,
      { group: { en: "Warranty & standards" }, label: { en: "Warranty" }, value: "5 years on motor; 1 year on battery and solar panel" },
      { group: { en: "Warranty & standards" }, label: { en: "Safety standard" }, value: "NF P90-308" },
      { group: { en: "Warranty & standards" }, label: { en: "Made in" }, value: "France" },
    ],
    images: photos("bellasun", [[1240, 721]]),
  },
  {
    slug: "solar-bubble-cover",
    category: "pool-covers",
    collection: "solar-covers",
    name: "Solar Bubble Cover",
    brand: "AstralPool",
    tagline: { en: "A 400 µm solar cover that warms the water and cuts evaporation." },
    description: {
      en: "A simple, effective bubble cover that lets the sun warm your pool while reducing evaporation and keeping debris out. 400 µm thick, blue, and available ready-cut in three sizes. Pair it with a stainless-steel reel stand for easy rolling on and off.",
    },
    specs: [
      { group: { en: "General" }, label: { en: "Thickness" }, value: "400 µm" },
      { group: { en: "General" }, label: { en: "Colour" }, value: "Blue/blue" },
      { group: { en: "General" }, label: { en: "Ready-cut sizes" }, value: "3 × 6 m, 4 × 8 m, 5 × 10 m" },
      { group: { en: "Accessories" }, label: { en: "Reel stand" }, value: "Stainless steel (AISI 304), on wheels, with 8 straps" },
      { group: { en: "Accessories" }, label: { en: "Telescopic tube" }, value: "Ø 80 mm, 4.0–5.5 m or 5.0–6.6 m" },
    ],
    // TODO(client): no usable photo in the catalogue (too small). Ask Fluidra for one.
    images: [],
  },
];
