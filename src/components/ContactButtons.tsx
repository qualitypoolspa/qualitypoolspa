import { site } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary["contact"];
  /** When set, the email/WhatsApp message is prefilled about this product. */
  product?: string;
  /** Page URL to include in the message (optional). */
  url?: string;
  /** "consultation" prefills a private-consultation request. */
  mode?: "default" | "consultation";
  className?: string;
};

export function emailHref(
  dict: Dictionary["contact"],
  product?: string,
  url?: string,
  mode: "default" | "consultation" = "default",
) {
  let subject = product ? `${dict.productSubject} ${product}` : dict.emailSubject;
  let body = product
    ? `${dict.productBody}\n\n${product}${url ? `\n${url}` : ""}\n`
    : dict.emailBody;
  if (mode === "consultation") {
    subject = dict.consultationSubject;
    body = dict.consultationBody;
  }
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function whatsappHref(
  dict: Dictionary["contact"],
  product?: string,
  url?: string,
  mode: "default" | "consultation" = "default",
) {
  let text = product
    ? `${dict.productWhatsapp} ${product}${url ? ` ${url}` : ""}`
    : dict.whatsappText;
  if (mode === "consultation") text = dict.consultationWhatsapp;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function ContactButtons({ dict, product, url, mode = "default", className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a className="btn btn-primary" href={emailHref(dict, product, url, mode)}>
        {mode === "consultation" ? dict.consultation : dict.email}
      </a>
      <a
        className="btn btn-whatsapp"
        href={whatsappHref(dict, product, url, mode)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {dict.whatsapp}
      </a>
    </div>
  );
}
