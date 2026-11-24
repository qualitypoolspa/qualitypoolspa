import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-5xl text-navy">{dict.terms.title}</h1>
      <p className="mt-3 text-sm text-navy/55">
        {dict.terms.updated.replace("{date}", new Date(lastUpdated).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" }))}
      </p>
      {isDraft && <p className="mt-6 rounded-lg border border-brass/40 bg-sand px-5 py-4 text-sm text-navy">{dict.terms.draft}</p>}
      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-2xl text-navy">{s.title}</h2>
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
