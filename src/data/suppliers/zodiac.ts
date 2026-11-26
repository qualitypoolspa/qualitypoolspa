// Zodiac (Fluidra) heat pumps. Specs: Fluidra Katalog 2023, pages 166–177 (translated from Swedish).
// Photos: Zodiac's official product pages (dam.fluidra.com). Performance figures are per model
// range, measured at air 28 °C / water 28 °C / 80 % humidity unless stated otherwise.
import type { SupplierProduct, ProductImage } from "../products";

const photos = (slug: string, list: [number, number, boolean?][]): ProductImage[] =>
  list.map(([width, height, contain = true], i) => ({
    src: `/products/zodiac/${slug}/${i + 1}.webp`,
    width,
    height,
    contain,
  }));

const g = (group: string, label: string, value: string) => ({ group: { en: group }, label: { en: label }, value });

const modes =
  "Full inverter with three modes: Boost (maximum power for fast heating), Smart (adjusts automatically) and Ecosilence (lowest energy use and noise)";

export const zodiacProducts: SupplierProduct[] = [
  {
    slug: "z550iq",
    category: "heat-pumps",
    collection: "inverter-heat-pumps",
    name: "Z550iQ",
    brand: "Zodiac",
    tagline: { en: "A quiet, compact full-inverter heat pump with Wi-Fi, for pools up to 120 m³." },
    description: {
      en: "The Z550iQ combines full-inverter technology with a compact, vertical design that fits in tight spaces. It adjusts its output to what the pool needs, keeping running costs and noise low, and it can be controlled from your phone over built-in Wi-Fi. A titanium heat exchanger makes it compatible with salt-water pools, and it can also cool the pool on the hottest days. Made in Italy.",
    },
    specs: [
      g("Performance", "Pool size", "Up to about 120 m³"),
      g("Performance", "Heating output", "12.5 to 20 kW (by model)"),
      g("Performance", "COP", "Up to 10.9"),
      g("Performance", "Sound pressure at 10 m", "From 23 dB(A)"),
      g("Performance", "Works down to", "−12 °C air temperature"),
      g("Features", "Technology", modes),
      g("Features", "Connectivity", "Built-in Wi-Fi and app; on/off via remote control or home automation"),
      g("Features", "Heat exchanger", "Titanium, salt-water compatible"),
      g("Features", "Other", "Heating priority mode, automatic cooling mode, automatic defrost"),
      g("Models", "Versions", "MD4, MD5, MD8 (230 V single-phase); TD5, TD8 (400 V three-phase)"),
      g("Models", "Weight", "54–70 kg"),
      g("Models", "Dimensions", "615 × 706 × 997 mm"),
      g("Warranty", "Warranty", "3 years; compressor 5 years; condenser 10 years (anti-corrosion)"),
      g("Warranty", "Made in", "Italy"),
    ],
    images: photos("z550iq", [[1600, 1092, false], [1044, 1044], [1600, 1065, false]]),
  },
  {
    slug: "z350iq",
    category: "heat-pumps",
    collection: "inverter-heat-pumps",
    name: "Z350iQ",
    brand: "Zodiac",
    tagline: { en: "A discreet full-inverter heat pump with a swivelling top, for pools up to 95 m³." },
    description: {
      en: "The Z350iQ is designed to blend in. Its innovative swivelling top and 45° water connections make it easy to integrate and install, and it blows air vertically, away from neighbours and seating areas. Full-inverter technology, built-in Wi-Fi with app control and a titanium heat exchanger make it efficient, connected and salt-water compatible. Made in Italy.",
    },
    specs: [
      g("Performance", "Pool size", "Up to about 95 m³"),
      g("Performance", "Heating output", "11 to 16 kW (by model)"),
      g("Performance", "COP", "Up to 10.3"),
      g("Performance", "Sound pressure at 10 m", "From 32 dB(A)"),
      g("Performance", "Works down to", "−7 °C air temperature"),
      g("Features", "Technology", modes),
      g("Features", "Design", "Swivelling top and 45° water connections; vertical air outlet"),
      g("Features", "Connectivity", "Built-in Wi-Fi and app"),
      g("Features", "Heat exchanger", "Titanium, salt-water compatible"),
      g("Models", "Versions", "MD4, MD5, MD6 (230 V single-phase)"),
      g("Models", "Weight", "41–47 kg"),
      g("Models", "Dimensions", "500 × 500 × 883 mm"),
      g("Warranty", "Warranty", "3 years; compressor 5 years; condenser 10 years (anti-corrosion)"),
      g("Warranty", "Made in", "Italy"),
    ],
    images: photos("z350iq", [[1624, 1287]]),
  },
  {
    slug: "z250",
    category: "heat-pumps",
    collection: "inverter-heat-pumps",
    name: "Z250",
    brand: "Zodiac",
    tagline: { en: "Simple, efficient full-inverter heating that extends your pool season." },
    description: {
      en: "The Z250 is a straightforward, efficient way to heat most private pools up to about 90 m³. Full-inverter technology adapts its output to the pool, with Boost, Smart and Ecosilence modes, and it can also cool the water in summer. A titanium heat exchanger makes it compatible with salt-water pools.",
    },
    specs: [
      g("Performance", "Pool size", "Up to about 90 m³"),
      g("Performance", "Heating output", "7 to 15 kW (by model)"),
      g("Performance", "COP", "Up to 16.4"),
      g("Performance", "Sound pressure at 10 m", "From 19 dB(A)"),
      g("Performance", "Works down to", "−7 °C air temperature"),
      g("Features", "Technology", modes),
      g("Features", "Design", "Horizontal air outlet; painted galvanised steel casing; LCD display"),
      g("Features", "Heat exchanger", "Titanium, salt-water compatible"),
      g("Features", "Other", "Heating priority mode, timer, automatic cooling mode, automatic defrost"),
      g("Models", "Versions", "MD3, MD4, MD5, MD6 (230 V single-phase)"),
      g("Models", "Weight", "42.5–56 kg"),
      g("Warranty", "Warranty", "3 years; compressor 5 years; condenser 10 years (anti-corrosion)"),
    ],
    images: photos("z250", [[1624, 1624], [1624, 1057]]),
  },
  {
    slug: "z400iq",
    category: "heat-pumps",
    collection: "on-off-heat-pumps",
    name: "Z400iQ",
    brand: "Zodiac",
    tagline: { en: "A distinctive, quiet heat pump for pools up to 145 m³, in aluminium grey or stainless steel." },
    description: {
      en: "The Z400iQ stands out with its unique furniture-like design, and it is quiet and discreet in use, with a two-speed fan and automatic noise reduction. Built-in Wi-Fi lets you control it from your phone, and it can be switched on and off from a remote control or home-automation system. It is available in aluminium grey or with a 316L stainless-steel front panel, and it works down to −12 °C. Made in Europe.",
    },
    specs: [
      g("Performance", "Pool size", "Up to about 145 m³"),
      g("Performance", "Heating output", "9.8 to 22 kW (by model)"),
      g("Performance", "COP", "4.9 to 5.9"),
      g("Performance", "Sound pressure at 10 m", "From 30 dB(A) in silent mode"),
      g("Performance", "Works down to", "−12 °C air temperature"),
      g("Features", "Design", "Vertical air outlet; aluminium grey (RAL 7006) or 316L stainless-steel front"),
      g("Features", "Connectivity", "Built-in Wi-Fi and app; on/off via remote control or home automation"),
      g("Features", "Fan", "Two speeds with automatic noise reduction; standard and silent modes"),
      g("Features", "Heat exchanger", "Titanium, salt-water compatible"),
      g("Models", "Versions", "MD4–MD9 (230 V single-phase); TD7–TD9 (400 V three-phase)"),
      g("Models", "Weight", "70–110 kg"),
      g("Warranty", "Warranty", "3 years; condenser 5 years"),
      g("Warranty", "Certification", "NF heat pump certification (MD4, MD5)"),
      g("Warranty", "Made in", "Europe"),
    ],
    images: photos("z400iq", [[1492, 1321], [1624, 1572]]),
  },
  {
    slug: "power-force",
    category: "heat-pumps",
    collection: "large-pool-heat-pumps",
    name: "Power Force",
    brand: "Zodiac",
    tagline: { en: "A powerful three-phase heat pump for large pools up to 305 m³, working year-round." },
    description: {
      en: "Power Force is built for large pools. With up to 45.5 kW of heating output, it keeps big pools warm all year round, working down to −12 °C. A variable-speed DC fan keeps it quiet and energy-efficient, and a titanium heat exchanger makes it compatible with salt-water pools. Made in Europe.",
    },
    specs: [
      g("Performance", "Pool size", "Up to about 305 m³"),
      g("Performance", "Heating output", "33 kW (TD25) or 45.5 kW (TD35)"),
      g("Performance", "COP", "5.3–5.4"),
      g("Performance", "Sound pressure at 10 m", "38–39 dB(A)"),
      g("Performance", "Works down to", "−12 °C, year-round"),
      g("Features", "Fan", "Variable-speed DC fan with automatic noise reduction"),
      g("Features", "Casing", "Epoxy-painted galvanised steel; horizontal air outlet"),
      g("Features", "Heat exchanger", "Titanium, salt-water compatible"),
      g("Models", "Versions", "TD25, TD35 (400 V three-phase)"),
      g("Models", "Weight", "205 kg"),
      g("Warranty", "Warranty", "2 years; condenser 5 years"),
      g("Warranty", "Made in", "Europe"),
    ],
    // TODO(client): only a small catalogue photo exists; ask Fluidra for a larger one.
    images: photos("power-force", [[184, 212]]),
  },
];
