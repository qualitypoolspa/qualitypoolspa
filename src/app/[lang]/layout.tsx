import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/config/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "./globals.css";

// Display: an elegant, high-contrast serif. Body: a clean, modern sans. Both cover Cyrillic for Russian.
const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-body" });

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

// Rebuild public pages at least hourly. Saves in /admin refresh them at once;
// this covers a page built while the database couldn't be read (it then shows
// the bundled catalogue) so it doesn't stay that way.
export const revalidate = 3600;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${dict.meta.title}` },
    description: dict.meta.description,
    openGraph: { title: dict.meta.title, description: dict.meta.description, type: "website" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${display.variable} ${body.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Enables the scroll animations only when JavaScript runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <RevealObserver />
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <WhatsAppFab dict={dict.contact} />
      </body>
    </html>
  );
}
