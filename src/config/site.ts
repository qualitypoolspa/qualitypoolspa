// Central place for business details. Override with env vars (see .env.example).
// TODO(client): confirm email, WhatsApp number, phone and locations.
export const site = {
  name: "Quality Pool & Spa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://qualitypoolspa.es",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@qualitypoolspa.es",
  // Business WhatsApp number: digits only, international format, no "+".
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "34951173806",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE ?? "+34 951 17 38 06",
  locations: ["Marbella", "Costa del Sol", "Mallorca"],
  /** Offices, shown on the contact page and in the footer. Names and addresses aren't translated. */
  offices: [
    { name: "Costa del Sol / Estepona", address: ["Av. Puerta del Mar, 59", "29680 Estepona, Málaga"] },
    { name: "Palma de Mallorca", address: ["Carrer d'Anselm Turmeda, 9, Nord", "07010 Palma, Illes Balears"] },
  ],
} as const;

/** Google Maps directions to an office. */
export const mapsUrl = (address: readonly string[]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.join(", "))}`;
