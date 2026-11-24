// Customer-facing products from the Fluidra Katalog 2023 (AstralPool and Zodiac brands):
// pool robots, lighting, ladders, showers and liners. Specs translated from Swedish.
// Photos: Zodiac's official pages for the robots; the catalogue itself for the rest.
// TODO(client): ask Fluidra for a dealer media pack; several catalogue photos are small.
import type { Product, ProductImage } from "../products";

const photos = (path: string, list: [number, number, boolean][]): ProductImage[] =>
  list.map(([width, height, contain], i) => ({ src: `/products/${path}/${i + 1}.webp`, width, height, contain }));

const g = (group: string, label: string, value: string) => ({ group: { en: group }, label: { en: label }, value });

const voyagerCommon = [
  g("Cleaning", "Cleans", "Floor, walls and waterline"),
  g("Cleaning", "Suction", "Patented cyclonic suction"),
  g("Cleaning", "Brushes", "Spiral brushes"),
  g("Pools", "Pool shapes", "Rectangular, oval, freeform"),
  g("Pools", "Pool floors", "Flat, gentle slope, varying slope, diamond-shaped"),
  g("Pools", "Pool surfaces", "Tile, liner, fibreglass, reinforced PVC, painted concrete"),
  g("Technical", "Drive", "Tracks, 2 motors"),
  g("Technical", "Filter", "4 L capacity, rigid basket, top access"),
  g("Technical", "Power supply", "Control unit 200–240 V AC; robot 30 V DC, 150 W"),
  g("Technical", "Robot weight", "8 kg"),
];

export const fluidraRangeProducts: Product[] = [
  // ---------- Pool robots (Zodiac Voyager) ----------
  {
    slug: "voyager-re-4600-iq",
    category: "pool-robots",
    name: "Voyager RE 4600 iQ",
    brand: "Zodiac",
    tagline: { en: "The top Voyager robot, with app control and a lift system, for pools up to 12 × 6 m." },
    description: {
      en: "The RE 4600 iQ cleans the floor, walls and waterline with patented cyclonic suction, spiral brushes front and back, and progressive two-stage filtration (150 and 60 µm). You control it from your phone with the iAqualink app. A lift system makes it easy to take out of the pool, and a transparent window shows when the filter needs emptying. Supplied with a caddy.",
    },
    specs: [
      g("Pools", "Pool size", "Up to 12 × 6 m"),
      ...voyagerCommon,
      g("Cleaning", "Cycles", "Floor only (1 h 30) or floor/walls/waterline (2 h 30)"),
      g("Technical", "Filtration", "Two-stage, 150 / 60 µm"),
      g("Technical", "Cable", "18 m with swivel"),
      g("Features", "Control", "iAqualink app"),
      g("Features", "Other", "Lift system, transparent window, caddy included"),
      g("Warranty", "Warranty", "2 years + 1 year when connected to iAqualink"),
    ],
    images: photos("zodiac/voyager-re-4600-iq", [[1680, 1092, true], [1600, 1065, false], [1680, 1189, true]]),
  },
  {
    slug: "voyager-re-4300",
    category: "pool-robots",
    name: "Voyager RE 4300",
    brand: "Zodiac",
    tagline: { en: "Powerful cleaning with two-stage filtration, for pools up to 10 × 5 m." },
    description: {
      en: "The RE 4300 combines Zodiac's patented cyclonic suction with spiral brushes and two-stage filtration (150 and 60 µm) for a thorough clean of floor, walls and waterline. Choose a quick floor-only cycle or a full clean, and see at a glance through the transparent window when the filter needs emptying.",
    },
    specs: [
      g("Pools", "Pool size", "Up to 10 × 5 m"),
      ...voyagerCommon,
      g("Cleaning", "Cycles", "Floor only (1 h 30) or floor/walls/waterline (2 h 30)"),
      g("Technical", "Filtration", "Two-stage, 150 / 60 µm"),
      g("Technical", "Cable", "15 m"),
      g("Features", "Other", "Transparent window"),
      g("Warranty", "Warranty", "2 years"),
    ],
    images: photos("zodiac/voyager-re-4300", [[1680, 1330, true], [1600, 1065, false]]),
  },
  {
    slug: "voyager-re-4100",
    category: "pool-robots",
    name: "Voyager RE 4100",
    brand: "Zodiac",
    tagline: { en: "Easy, effective automatic cleaning for pools up to 9 × 4 m." },
    description: {
      en: "The RE 4100 brings Voyager cleaning to smaller pools: cyclonic suction, spiral brushes and a fine 100 µm filter clean the floor, walls and waterline in a single two-hour cycle. The filter is emptied from the top, so it stays simple to look after.",
    },
    specs: [
      g("Pools", "Pool size", "Up to 9 × 4 m"),
      ...voyagerCommon,
      g("Cleaning", "Cycles", "Floor/walls/waterline (2 h)"),
      g("Technical", "Filtration", "100 µm"),
      g("Technical", "Cable", "15 m"),
      g("Warranty", "Warranty", "2 years"),
    ],
    images: photos("zodiac/voyager-re-4100", [[1417, 1417, true], [1600, 1065, false]]),
  },

  // ---------- Lighting (AstralPool LumiPlus) ----------
  {
    slug: "lumiplus-flexi",
    category: "lighting",
    name: "LumiPlus Flexi",
    brand: "AstralPool",
    tagline: { en: "Highly efficient LED pool lights that adapt to any pool, new or renovated." },
    description: {
      en: "LumiPlus Flexi is AstralPool's flexible LED lighting system for new and existing pools, with liner or concrete. Choose the light colour (white, warm white or RGB), the mounting (FlexiNiche, FlexiSlim or FlexiRapid) and a front to match your pool: white, beige, light grey, anthracite or stainless steel. The high-efficiency white version reaches 170 lm/W, and the front is backward-compatible with earlier standard niches, so lights can be upgraded without changing the niche. Made in Europe.",
    },
    specs: [
      g("Light", "Colours", "White (5,700 K), warm white (3,000 K) or RGB"),
      g("Light", "Output", "Up to 4,320 lm (white) / 2,544 lm (RGB)"),
      g("Light", "Efficiency", "Up to 170 lm/W (high-efficiency white)"),
      g("Light", "Power supply", "AC 12 V or DC 24 V"),
      g("Installation", "Versions", "FlexiNiche (niche Ø 180–230 mm), FlexiSlim (wall), FlexiRapid (1½\" inlet)"),
      g("Installation", "Pools", "New or renovated; liner or concrete"),
      g("Installation", "Compatibility", "Front fits earlier standard niches"),
      g("Finishes", "Front", "White, beige, light grey, anthracite, stainless steel (FlexiNiche)"),
      g("Control", "RGB control", "LumiPlus ECO / Top, Fluidra Connect, Wi-Fi LED app, wireless Control Motion or DMX"),
      g("Warranty", "Warranty", "3 years"),
      g("Warranty", "Made in", "Europe"),
    ],
    images: photos("astralpool/lumiplus-flexi", [[1600, 1067, false], [332, 359, true], [340, 383, true], [334, 375, true], [338, 381, true]]),
  },
  {
    slug: "lumiplus-fleximini",
    category: "lighting",
    name: "LumiPlus FlexiMini",
    brand: "AstralPool",
    tagline: { en: "A compact LED pool light with maximum design flexibility." },
    description: {
      en: "LumiPlus FlexiMini is the compact member of the LumiPlus Flexi family, in line with today's design trends for private pools. Mix and match the light colour, a visible front in white, beige, grey, anthracite or stainless steel, and the installation method: mini niche, large or small inlet, or installation pipe. Made in Europe.",
    },
    specs: [
      g("Light", "Colours", "White (5,700 K), warm white (3,000 K) or RGB"),
      g("Light", "Output", "V1: 450 lm white / 300 lm RGB; V2: 900 lm white / 600 lm RGB"),
      g("Light", "Power supply", "AC 12 V or DC 24 V"),
      g("Installation", "Versions", "Mini niche, inlet L (2\" / 1½\"), inlet S (2\" / 1½\"), installation pipe"),
      g("Finishes", "Front", "White, beige, light grey, anthracite (ABS) or stainless steel A316-L"),
      g("Control", "RGB control", "LumiPlus ECO / Top, Fluidra Connect, Wi-Fi LED app, wireless Control Motion or DMX"),
      g("Warranty", "Warranty", "3 years"),
      g("Warranty", "Made in", "Europe"),
    ],
    images: photos("astralpool/lumiplus-fleximini", [[829, 270, false]]),
  },
  {
    slug: "lumiplus-mini-spa-light",
    category: "lighting",
    name: "LumiPlus Mini 2.11",
    brand: "AstralPool",
    tagline: { en: "A small LED light for spas, steps and small pools." },
    description: {
      en: "LumiPlus Mini 2.11 is a compact LED light for spas and small areas of water, available in white or RGB with an ABS or stainless-steel front. It uses just 4 W, connects directly to 12 V AC and comes with a 2.5 m cable. One light is recommended per 5 m² of water surface.",
    },
    specs: [
      g("Light", "Colours", "White (315 lm) or RGB (186 lm)"),
      g("Light", "Power", "4 W, 12 V AC"),
      g("Installation", "Connection", "2\" external thread; 2.5 m H07RN-F cable"),
      g("Installation", "Recommended", "1 light per 5 m² of water surface"),
      g("Finishes", "Front", "ABS or stainless steel"),
    ],
    images: photos("astralpool/lumiplus-mini-spa-light", [[829, 587, false]]),
  },

  // ---------- Pool accessories: ladders ----------
  {
    slug: "standard-pool-ladder",
    category: "pool-accessories",
    collection: "ladders",
    name: "Stainless Steel Pool Ladder",
    brand: "AstralPool",
    tagline: { en: "A classic polished stainless-steel ladder, in wide or narrow versions." },
    description: {
      en: "A timeless pool ladder in polished stainless steel with 43 mm tubes and stainless-steel steps. Available wide or narrow with 3 or 4 steps, supplied complete with anchors for setting into the pool surround.",
    },
    specs: [
      g("General", "Material", "Polished stainless steel AISI 304, Ø 43 mm"),
      g("General", "Versions", "Wide or narrow; 3 or 4 steps"),
      g("General", "Supplied with", "Anchors for setting in"),
      g("General", "Weight", "12–15 kg"),
    ],
    images: photos("astralpool/standard-pool-ladder", [[208, 304, true], [242, 307, true]]),
  },
  {
    slug: "split-pool-ladder",
    category: "pool-accessories",
    collection: "ladders",
    name: "Split Pool Ladder",
    brand: "AstralPool",
    tagline: { en: "A high-gloss AISI-316 ladder with anti-slip steps, to EN 13451." },
    description: {
      en: "A split pool ladder in high-gloss AISI-316 stainless steel with 43 mm tubes and anti-slip steps, conforming to EN 13451-1 and EN 13451-2. It works with every type of handrail and comes with fixing plates, gaskets, screws and plugs.",
    },
    specs: [
      g("General", "Material", "High-gloss AISI-316 stainless steel, Ø 43 mm"),
      g("General", "Versions", "3 or 4 steps, double top step"),
      g("General", "Standards", "EN 13451-1 and EN 13451-2"),
      g("General", "Weight", "9–10.5 kg"),
    ],
    images: photos("astralpool/split-pool-ladder", [[184, 137, true]]),
  },
  {
    slug: "corrosion-resistant-ladder",
    category: "pool-accessories",
    collection: "ladders",
    name: "Corrosion-Resistant Ladder",
    brand: "AstralPool",
    tagline: { en: "Specially treated for salt-water pools, in white or grey." },
    description: {
      en: "A ground-anchored pool ladder in AISI-304L stainless steel with a Plascoat treatment for extra protection against corrosion and rust, ideal for pools with salt chlorination. Specially designed anti-slip steps, polished cover plate, and supplied with anchors and an earthing connection.",
    },
    specs: [
      g("General", "Material", "AISI-304L stainless steel with Plascoat coating"),
      g("General", "Versions", "3 or 4 steps"),
      g("General", "Best for", "Salt-water pools"),
      g("General", "Supplied with", "Anchors and earthing connection"),
      g("General", "Custom", "Made-to-measure ladders and rails in AISI-304L or 316L on request"),
    ],
    images: photos("astralpool/corrosion-resistant-ladder", [[133, 232, true], [138, 238, true]]),
  },
  {
    slug: "pool-handrails",
    category: "pool-accessories",
    collection: "ladders",
    name: "Pool Handrails",
    brand: "AstralPool",
    tagline: { en: "Polished AISI-316 stainless-steel handrails for steps and pool entries." },
    description: {
      en: "Polished stainless-steel handrails in AISI-316, 43 mm tube, for safe and elegant pool entries. Available as a pair (470 × 800 mm, round or rectangular fixing plates) or as a single long rail (800 × 1,250 mm), supplied with fixing plates, gaskets, screws and plugs.",
    },
    specs: [
      g("General", "Material", "Polished AISI-316 stainless steel, Ø 43 mm"),
      g("General", "Sizes", "470 × 800 mm (pair) or 800 × 1,250 mm"),
      g("General", "Fixing plates", "Round or rectangular"),
    ],
    images: photos("astralpool/pool-handrails", [[247, 213, true]]),
  },

  // ---------- Pool accessories: solar showers ----------
  {
    slug: "solar-chrome-shower",
    category: "pool-accessories",
    collection: "showers",
    name: "Solar Chrome Shower",
    brand: "AstralPool",
    tagline: { en: "An elegant solar shower with a 30-litre tank, in metallic or bright colours." },
    description: {
      en: "With its elegant, streamlined design, the Solar Chrome shower brings a modern vintage touch to the pool. A 30-litre tank warmed by the sun gives hot water without using energy. It has a self-descaling hand shower and rain head, a hot and cold mixer and a foot tap, and drains easily for winter. Available in anthracite, silver and anthracite/copper, or in blue, red, green and orange.",
    },
    specs: [
      g("General", "Tank", "30 L, solar heated"),
      g("General", "Materials", "AISI-304-L stainless-steel tube, aluminium body"),
      g("General", "Features", "Rain head, hand shower, mixer, foot tap, rear hose inlet"),
      g("General", "Finishes", "Anthracite, silver, anthracite/copper; blue, red, green, orange"),
      g("General", "Weight", "13.5 kg"),
      g("General", "Made in", "Europe"),
    ],
    images: photos("astralpool/solar-chrome-shower", [[239, 409, true]]),
  },
  {
    slug: "angel-solar-shower",
    category: "pool-accessories",
    collection: "showers",
    name: "Angel Solar Shower",
    brand: "AstralPool",
    tagline: { en: "A minimal aluminium solar shower with a 30-litre tank." },
    description: {
      en: "A clean-lined aluminium solar shower whose 30-litre tank heats the water with the sun. It has an anti-limescale shower head and a single-lever mixer for hot and cold water.",
    },
    specs: [
      g("General", "Tank", "30 L aluminium, solar heated"),
      g("General", "Features", "Anti-limescale shower head, single-lever mixer"),
      g("General", "Weight", "13 kg"),
      g("General", "Warranty", "2 years"),
    ],
    images: photos("astralpool/angel-solar-shower", [[223, 475, true]]),
  },
  {
    slug: "iguazu-solar-shower",
    category: "pool-accessories",
    collection: "showers",
    name: "Iguazu Solar Shower",
    brand: "AstralPool",
    tagline: { en: "A matt AISI-316L stainless-steel solar shower with spray jets." },
    description: {
      en: "A solar-heated shower in matt AISI-316L stainless steel with a white acrylic front panel. It has adjustable chrome shower heads and two spray jets, controlled by a two-way valve, and a 30-litre aluminium tank that uses the sun to heat the water.",
    },
    specs: [
      g("General", "Material", "Matt AISI-316L stainless steel, white acrylic front"),
      g("General", "Tank", "30 L aluminium, solar heated"),
      g("General", "Features", "Adjustable shower heads, 2 spray jets, 2-way valve"),
      g("General", "Weight", "32 kg"),
      g("General", "Warranty", "3 years"),
    ],
    images: photos("astralpool/iguazu-solar-shower", [[168, 367, true]]),
  },
  {
    slug: "pluvium-solar-shower",
    category: "pool-accessories",
    collection: "showers",
    name: "Pluvium Solar Shower",
    brand: "AstralPool",
    tagline: { en: "Tropical wood and polished stainless steel, in a minimalist solar shower." },
    description: {
      en: "Pluvium pairs tropical wood with polished AISI-316L stainless steel in a minimalist, compact design that adds an elegant, modern touch to any pool. A 30-litre aluminium tank heats the water with the sun, a mixing valve sets the temperature and the adjustable head is self-descaling. High-quality materials give long life and resistance to weather and corrosion.",
    },
    specs: [
      g("General", "Materials", "Tropical wood and polished AISI-316L stainless steel"),
      g("General", "Tank", "30 L aluminium, solar heated"),
      g("General", "Features", "Mixing valve, adjustable self-descaling head"),
      g("General", "Shower height", "2.04 m"),
      g("General", "Weight", "37 kg"),
      g("General", "Warranty", "3 years"),
    ],
    images: photos("astralpool/pluvium-solar-shower", [[129, 291, true]]),
  },

  // ---------- Liners ----------
  {
    slug: "alkorplan-2010",
    category: "pool-renovation-liners",
    collection: "liners",
    name: "Alkorplan 2010",
    brand: "AstralPool",
    tagline: { en: "A lacquered 0.75 mm pool liner in seven plain colours." },
    description: {
      en: "Prefabricated 0.75 mm liners with a lacquered surface and a welded-in liner strip for easy fitting, made to your pool's dimensions, including steps. Custom liners can also be made for pools with slatted-cover recesses, sloping floors and more. Alkorplan 2010 comes in seven plain colours.",
    },
    specs: [
      g("General", "Thickness", "0.75 mm"),
      g("General", "Surface", "Lacquered"),
      g("General", "Colours", "Blue, light blue, turquoise, beige, white, grey, dark grey"),
      g("General", "Made to measure", "Pool size (L × W × H), liner type and step dimensions"),
    ],
    images: photos("astralpool/alkorplan-2010", [[830, 360, false]]),
  },
  {
    slug: "alkorplan-3010",
    category: "pool-renovation-liners",
    collection: "liners",
    name: "Alkorplan 3010",
    brand: "AstralPool",
    tagline: { en: "A lacquered 0.75 mm liner with a mosaic look, in blue, grey or sand." },
    description: {
      en: "The look of mosaic tiles with the ease of a liner. Alkorplan 3010 is a prefabricated 0.75 mm liner with a lacquered surface and a welded-in liner strip for easy fitting, made to your pool's dimensions. Choose mosaic blue, grey or sand.",
    },
    specs: [
      g("General", "Thickness", "0.75 mm"),
      g("General", "Surface", "Lacquered, mosaic print"),
      g("General", "Colours", "Mosaic blue, mosaic grey, mosaic sand"),
      g("General", "Made to measure", "Pool size (L × W × H), liner type and step dimensions"),
    ],
    images: photos("astralpool/alkorplan-3010", [[541, 384, false]]),
  },
];
