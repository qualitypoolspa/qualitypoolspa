import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../[lang]/globals.css";
import "./admin.css";

const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Quality Pool & Spa admin" },
  robots: { index: false, follow: false },
};

/** The admin panel's own root layout: no site header, footer or language prefix. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} antialiased`}>
      <body className="adm min-h-screen bg-paper">{children}</body>
    </html>
  );
}
