import Link from "next/link";
import { defaultLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const { notFound: t } = await getDictionary(defaultLocale);
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-serif text-5xl text-navy">{t.title}</h1>
      <p className="mt-4 text-navy/70">{t.text}</p>
      <Link href={href(defaultLocale)} className="btn btn-primary mt-8">{t.back}</Link>
    </section>
  );
}
