import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { isDraft, lastUpdated, terms } from "@/content/terms";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: (await getDictionary(lang)).terms.title, robots: isDraft ? { index: false } : undefined };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const sections = terms[lang] ?? terms.en ?? [];

  return (
    <article className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">
      <PageHero title={dict.terms.title} />
      <p className="-mt-6 text-sm text-navy/55">
        {dict.terms.updated.replace("{date}", new Date(lastUpdated).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" }))}
      </p>
      {isDraft && <p className="mt-6 max-w-2xl border-l-2 border-brass bg-sand px-5 py-4 text-sm text-navy">{dict.terms.draft}</p>}
      <div className="mt-14 max-w-3xl space-y-12">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-3xl text-navy">{s.title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-navy/75">
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
