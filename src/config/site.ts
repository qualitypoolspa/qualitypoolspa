// Central place for business details. Override with env vars (see .env.example).
// TODO(client): confirm email, WhatsApp number, phone and locations.
export const site = {
  name: "Quality Pool & Spa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://qualitypoolspa.es",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@qualitypoolspa.es",
  // Business WhatsApp number (mobile): digits only, international format, no "+".
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "34648126377",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+34 648 12 63 77",
  // Main office line / switchboard, used for "Call us" (tel:) links.
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE ?? "+34 951 17 38 06",
  get phoneTel() {
    return this.phoneDisplay.replace(/[^\d+]/g, "");
  },
  locations: ["Marbella", "Costa del Sol", "Mallorca"],
} as const;
