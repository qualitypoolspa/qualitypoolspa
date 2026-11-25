import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactButtons } from "@/components/ContactButtons";
import { site } from "@/config/site";
import { activeCampaigns } from "@/data/campaigns";
import { hasLocale, pick } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/campaigns">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { campaigns } = await getDictionary(lang);
  return pageMetadata({ lang, path: "/campaigns", title: campaigns.title, description: campaigns.intro });
}

export default async function CampaignsPage({ params }: PageProps<"/[lang]/campaigns">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.campaigns;
  const list = activeCampaigns();

  return (
    <>
      <PageHero eyebrow={dict.nav.campaigns} title={t.title} intro={t.intro} />

      <section className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">
        {list.length ? (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {list.map((c) => {
              const title = pick(c.title, lang);
              return (
                <article key={c.slug} data-reveal="up">
                  {c.image && (
                    <div data-reveal="img" className="relative aspect-[16/10] overflow-hidden bg-sand"><div className="absolute inset-0"><div className="absolute inset-0">
                      <Image src={c.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                      </div></div>
                      {c.sample && (
                        <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
                          {t.sample}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="pt-7">
                    <h2 className="font-serif text-4xl text-navy md:text-5xl">{title}</h2>
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
