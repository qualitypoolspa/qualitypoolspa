import { site } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary["contact"];
  /** When set, the email/WhatsApp message is prefilled about this product. */
  product?: string;
  /** Page URL to include in the message (optional). */
  url?: string;
  className?: string;
};

export function emailHref(dict: Dictionary["contact"], product?: string, url?: string) {
  const subject = product ? `${dict.productSubject} ${product}` : dict.emailSubject;
  const body = product
    ? `${dict.productBody}\n\n${product}${url ? `\n${url}` : ""}\n`
    : dict.emailBody;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function whatsappHref(dict: Dictionary["contact"], product?: string, url?: string) {
  const text = product
    ? `${dict.productWhatsapp} ${product}${url ? ` ${url}` : ""}`
    : dict.whatsappText;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function ContactButtons({ dict, product, url, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a className="btn btn-primary" href={emailHref(dict, product, url)}>
        {dict.email}
      </a>
      <a
        className="btn btn-whatsapp"
        href={whatsappHref(dict, product, url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {dict.whatsapp}
      </a>
    </div>
  );
}
