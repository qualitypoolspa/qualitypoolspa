// DRAFT terms of purchase. Placeholders in [brackets] must be filled in, and the whole
// text reviewed by the client's lawyer or accountant before it is published as final.
// Set `isDraft` to false once approved (removes the draft notice on the page).
import type { Locale } from "@/i18n/config";

export const isDraft = true;
export const lastUpdated = "2026-11-24";

type Section = { title: string; paragraphs: string[] };

const en: Section[] = [
  {
    title: "1. About us",
    paragraphs: [
      "These terms apply to purchases of products and services from [COMPANY LEGAL NAME], trading as Quality Pool & Spa, with tax number (NIF/CIF) [NUMBER], registered address [ADDRESS], Spain. Email: info@qualitypoolspa.es. Phone: [PHONE].",
      "By placing an order with us you accept these terms. If a written quote or order confirmation says something different, the quote or order confirmation applies.",
    ],
  },
  {
    title: "2. Quotes and orders",
    paragraphs: [
      "Our website presents products and information only. It is not a web shop, and the information on it is not a binding offer. Product images, dimensions and specifications come from the manufacturers and may change without notice.",
      "Prices are given in a written quote. A quote is valid for [30] days unless it states otherwise. A purchase agreement is formed when you accept the quote in writing and we confirm the order in writing.",
    ],
  },
  {
    title: "3. Prices and payment",
    paragraphs: [
      "Prices are in euros. The quote states whether VAT (IVA) is included. Delivery, installation, groundwork, electrical work and permits are only included when the quote says so.",
      "Unless agreed otherwise, a deposit of [X] % is paid when the order is confirmed, and the balance is paid [before delivery / on completion of installation]. Payment is made by [bank transfer / card / other]. Ownership of the goods passes to you when they are paid in full.",
    ],
  },
  {
    title: "4. Delivery",
    paragraphs: [
      "Delivery times in quotes and order confirmations are estimates and depend on the manufacturer. We will tell you as soon as possible if a delivery is delayed.",
      "You must make sure there is safe access for delivery vehicles and, where needed, lifting equipment, and that the delivery address and any access restrictions are correct. Extra costs caused by insufficient access or incorrect information may be charged.",
      "Please check the goods on delivery and note any visible damage on the delivery note, and tell us within [48 hours].",
    ],
  },
  {
    title: "5. Installation and site preparation",
    paragraphs: [
      "When installation is included, we or our installation partners carry out the work described in the quote. Unless the quote says otherwise, you are responsible for any building or planning permits, a suitable and level base, the electrical supply to the installation point, and access to the site.",
      "If the site conditions differ from what was agreed or assumed in the quote, we will agree any changes and extra costs with you before continuing.",
    ],
  },
  {
    title: "6. Right of withdrawal",
    paragraphs: [
      "If you are a consumer and the contract was concluded at a distance or off our business premises, you may withdraw from it within 14 calendar days without giving a reason. The period starts on the day you receive the goods, or for service contracts, on the day the contract is concluded. To withdraw, send us a clear statement by email or letter before the period ends.",
      "The right of withdrawal does not apply to goods made to your specifications or clearly personalised, such as made-to-measure liners, pools built to your dimensions or custom orders, nor to services that have been fully performed with your prior agreement. If you ask us to start a service within the withdrawal period, you pay for the part already performed.",
      "If you withdraw, we refund all payments received, including standard delivery costs, within 14 days of receiving your notice. We may wait to refund until the goods are returned. You pay the direct cost of returning the goods unless we agree otherwise.",
    ],
  },
  {
    title: "7. Guarantee and warranty",
    paragraphs: [
      "As a consumer you have the legal guarantee of conformity under Spanish consumer law (currently three years for new goods from delivery). If a product does not conform to the contract, we will repair or replace it or, where that is not possible, reduce the price or refund it, as the law provides.",
      "In addition, many products come with the manufacturer's own warranty, as stated on the product page or in the documentation. Manufacturer warranties do not limit your legal rights.",
      "The guarantee does not cover damage caused by incorrect installation by others, misuse, lack of maintenance, unsuitable water chemistry, frost, or normal wear and tear.",
    ],
  },
  {
    title: "8. Complaints",
    paragraphs: [
      "If something is wrong, contact us at info@qualitypoolspa.es and describe the problem, ideally with photos and your order number. We aim to reply within [5] working days. Complaint forms (hojas de reclamaciones) are available on request.",
    ],
  },
  {
    title: "9. Liability",
    paragraphs: [
      "We are not liable for indirect losses or for delays caused by circumstances beyond our reasonable control, such as manufacturer delays, extreme weather or transport disruption. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    title: "10. Personal data",
    paragraphs: [
      "We use the personal data you give us (such as your name, contact details and address) to handle your enquiries, quotes, orders and deliveries, in line with the GDPR and Spanish data protection law. We do not sell your data. You can ask to see, correct or delete your data at any time by contacting us. [Link to the privacy policy.]",
    ],
  },
  {
    title: "11. Applicable law and disputes",
    paragraphs: [
      "These terms are governed by Spanish law. We will always try to resolve disagreements directly with you. If you are a consumer, you may also contact your local consumer office (Oficina Municipal de Información al Consumidor) or the consumer arbitration system, and you keep the right to bring a claim before the courts of your place of residence.",
    ],
  },
];

export const terms: Record<Locale, Section[] | undefined> = { en, es: undefined, sv: undefined, fr: undefined, de: undefined, ru: undefined };
