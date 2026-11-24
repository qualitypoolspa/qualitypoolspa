import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <section className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-serif text-5xl text-navy">{contact.title}</h1>
      <p className="mt-4 text-lg text-navy/70">{contact.intro}</p>
      <ContactButtons dict={contact} className="mt-8" />

      <dl className="mt-10 divide-y divide-line rounded-lg border border-line bg-white text-sm">
        <div className="grid grid-cols-3 gap-4 px-5 py-4">
          <dt className="text-navy/60">{contact.phone}</dt>
          <dd className="col-span-2"><a className="text-teal" href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a></dd>
        </div>
        <div className="grid grid-cols-3 gap-4 px-5 py-4">
          <dt className="text-navy/60">{contact.email}</dt>
          <dd className="col-span-2"><a className="text-teal" href={`mailto:${site.email}`}>{site.email}</a></dd>
        </div>
        <div className="grid grid-cols-3 gap-4 px-5 py-4">
          <dt className="text-navy/60">{contact.areas}</dt>
          <dd className="col-span-2">{site.locations.join(", ")}</dd>
        </div>
      </dl>
    </section>
  );
}
