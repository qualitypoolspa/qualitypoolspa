import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactButtons } from "@/components/ContactButtons";
import { site } from "@/config/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: (await getDictionary(lang)).contact.title };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { contact } = await getDictionary(lang);

  return (
    <>
      <PageHero title={contact.title} intro={contact.intro}>
        <ContactButtons dict={contact} className="fade-in mt-10" />
      </PageHero>
      <section className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">
        <dl className="grid border-t border-line md:grid-cols-3">
          {[
            [
              contact.phone,
              <span key="p" className="block">
                <a className="link-line" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
                <span className="mt-3 block font-sans text-base text-navy/70">
                  WhatsApp:{" "}
                  <a className="link-line" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">{site.whatsappDisplay}</a>
                </span>
              </span>,
            ],
            [contact.email, <a key="e" className="link-line break-all" href={`mailto:${site.email}`}>{site.email}</a>],
            [contact.areas, site.locations.join(", ")],
          ].map(([label, value], i) => (
            <div key={i} data-reveal="up" style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-4 font-serif text-3xl text-navy">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
