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
} as const;
