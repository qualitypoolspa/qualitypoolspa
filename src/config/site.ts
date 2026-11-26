// Central place for business details. Override with env vars (see .env.example).
// TODO(client): confirm email, WhatsApp number, phone and locations.
/** Spanish numbers given as bare digits get the usual "+34 951 17 38 06" spacing. */
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (/^\s*\+?\d+\s*$/.test(raw) && /^34\d{9}$/.test(digits)) {
    return `+34 ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
  }
  return raw.trim();
}

export const site = {
  name: "Quality Pool & Spa",
  /** The legal entity behind the site: shown in the footer and the terms (required by LSSI art. 10). */
  company: {
    name: "Scandinavian Quality Wood & Construction S.L.",
    nif: "B21956750",
    address: "Av. Puerta del Mar, 59, 29680 Estepona, Málaga",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://qualitypoolspa.es",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@qualitypoolspa.es",
  // Business WhatsApp number (mobile): digits only, international format, no "+".
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "34648126377",
  whatsappDisplay: formatPhone(process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? process.env.NEXT_PUBLIC_WHATSAPP ?? "34648126377"),
  // Main office line / switchboard, used for "Call us" (tel:) links.
  // Accepts "+34 951 17 38 06" or plain digits like "34951173806".
  phoneDisplay: formatPhone(process.env.NEXT_PUBLIC_PHONE ?? "+34 951 17 38 06"),
  get phoneTel() {
    return "+" + this.phoneDisplay.replace(/\D/g, "");
  },
  locations: ["Marbella", "Costa del Sol", "Mallorca"],
  /** Offices, shown on the contact page and in the footer. Names and addresses aren't translated. */
  offices: [
    {
      name: "Costa del Sol / Estepona",
      address: ["Av. Puerta del Mar, 59", "29680 Estepona, Málaga"],
      // The same address in parts, for search engines (src/lib/seo.ts).
      street: "Av. Puerta del Mar, 59",
      postalCode: "29680",
      locality: "Estepona",
      region: "Málaga",
    },
    {
      name: "Palma de Mallorca",
      address: ["Carrer d'Anselm Turmeda, 9, Nord", "07010 Palma, Illes Balears"],
      street: "Carrer d'Anselm Turmeda, 9, Nord",
      postalCode: "07010",
      locality: "Palma",
      region: "Illes Balears",
    },
  ],
} as const;

/** Google Maps directions to an office. */
export const mapsUrl = (address: readonly string[]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.join(", "))}`;
