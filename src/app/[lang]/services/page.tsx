import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
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
      <PageHero eyebrow={dict.nav.services} title={s.title} intro={s.intro} image="/products/aquavia/hot-tub-kora/4.webp" />
      <section className="mx-auto max-w-[90rem] px-5 py-20 md:px-8 md:py-28">
        <ol className="border-t border-line">
          {s.steps.map((step, i) => (
            <li key={step.title} data-reveal="up" style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-10">
              <span className="font-serif text-4xl italic text-brass md:col-span-2">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-serif text-3xl text-navy md:col-span-4 md:text-4xl">{step.title}</h2>
              <p className="leading-relaxed text-navy/70 md:col-span-5 md:col-start-8">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-28">
          <h2 data-reveal="up" className="font-serif text-5xl leading-[1] md:col-span-7 md:text-6xl">{s.ctaTitle}</h2>
          <div data-reveal="up" className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-white/70">{s.ctaText}</p>
            <ContactButtons dict={dict.contact} mode="consultation" className="mt-8" dark />
          </div>
        </div>
      </section>
    </>
  );
}
