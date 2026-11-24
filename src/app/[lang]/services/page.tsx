import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { services } = await getDictionary(lang);
  return { title: services.title, description: services.intro };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const s = dict.services;

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">{dict.nav.services}</p>
        <h1 className="mt-4 font-serif text-5xl text-navy md:text-7xl">{s.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/70">{s.intro}</p>

        <ol className="mt-16 divide-y divide-line border-y border-line">
          {s.steps.map((step, i) => (
            <li key={step.title} className="reveal grid gap-4 py-8 md:grid-cols-[8rem_1fr_2fr] md:gap-10">
              <span className="font-serif text-3xl text-brass">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-serif text-2xl text-navy">{step.title}</h2>
              <p className="leading-relaxed text-navy/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl font-serif text-4xl text-navy md:text-5xl">{s.ctaTitle}</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-navy/70">{s.ctaText}</p>
          <ContactButtons dict={dict.contact} mode="consultation" className="mt-8" />
        </div>
      </section>
    </>
  );
}
