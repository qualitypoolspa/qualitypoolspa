import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactButtons } from "@/components/ContactButtons";
import { mapsUrl, site } from "@/config/site";
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
            [contact.phone, <a key="p" className="link-line" href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a>],
            [contact.email, <a key="e" className="link-line break-all" href={`mailto:${site.email}`}>{site.email}</a>],
            [contact.areas, site.locations.join(", ")],
          ].map(([label, value], i) => (
            <div key={i} data-reveal="up" style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-4 font-serif text-3xl text-navy">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 data-reveal="up" className="eyebrow mt-20">{contact.offices}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {site.offices.map((o, i) => (
            <address
              key={o.name}
              data-reveal="up"
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className="border border-line p-8 not-italic md:p-10"
            >
              <p className="font-serif text-3xl text-navy">{o.name}</p>
              <p className="mt-4 leading-relaxed text-navy/70">
                {o.address.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </p>
              <a
                href={mapsUrl(o.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-teal"
              >
                {contact.directions} ↗
              </a>
            </address>
          ))}
        </div>
      </section>
    </>
  );
}
