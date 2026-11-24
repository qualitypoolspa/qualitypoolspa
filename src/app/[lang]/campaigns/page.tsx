import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { site } from "@/config/site";
import { activeCampaigns } from "@/data/campaigns";
import { hasLocale, pick } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/campaigns">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { campaigns } = await getDictionary(lang);
  return { title: campaigns.title, description: campaigns.intro };
}

export default async function CampaignsPage({ params }: PageProps<"/[lang]/campaigns">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.campaigns;
  const list = activeCampaigns();

  return (
    <>
      <section className="hero-water text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow !text-[#c9a96b]">{dict.nav.campaigns}</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">{t.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        {list.length ? (
          <div className="grid gap-8 md:grid-cols-2">
            {list.map((c) => {
              const title = pick(c.title, lang);
              return (
                <article key={c.slug} className="overflow-hidden bg-white">
                  {c.image && (
                    <div className="relative aspect-[16/10] bg-sand">
                      <Image src={c.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                      {c.sample && (
                        <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
                          {t.sample}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-7">
                    <h2 className="font-serif text-3xl text-navy">{title}</h2>
                    {c.validUntil && (
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brass">
                        {t.validUntil.replace("{date}", new Date(c.validUntil).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" }))}
                      </p>
                    )}
                    <p className="mt-3 leading-relaxed text-navy/75">{pick(c.text, lang)}</p>
                    {c.includes && (
                      <>
                        <p className="eyebrow mt-6">{t.includes}</p>
                        <ul className="mt-3 space-y-1.5 text-sm text-navy/80">
                          {c.includes.map((i) => (
                            <li key={pick(i, lang)} className="flex gap-3">
                              <span className="text-brass">—</span>
                              {pick(i, lang)}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <ContactButtons dict={{ ...dict.contact, productSubject: dict.contact.campaignSubject, productWhatsapp: dict.contact.campaignWhatsapp }} product={title} url={`${site.url}/${lang}/campaigns`} className="mt-7" />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xl">
            <p className="text-navy/75">{t.empty}</p>
            <ContactButtons dict={dict.contact} className="mt-6" />
          </div>
        )}
      </section>
    </>
  );
}
