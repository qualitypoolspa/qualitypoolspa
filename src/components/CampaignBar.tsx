import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Slim bar above the header pointing to the campaigns page. */
export function CampaignBar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="bg-ink px-5 py-2 text-center text-[12px] text-white/80">
      <span className="mr-2 rounded bg-[#c9a96b] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
        {dict.nav.campaigns}
      </span>
      {dict.campaigns.bar}{" "}
      <Link href={href(lang, "/campaigns")} className="font-semibold text-white underline-offset-4 hover:underline">
        {dict.campaigns.barLink} →
      </Link>
    </div>
  );
}
