import Image from "next/image";
import { team } from "@/config/team";
import type { Dictionary } from "@/i18n/dictionaries";

type TeamDict = Dictionary["about"]["team"];

// Same backdrop as the prepared photos, so a member without a photo still matches.
const backdrop = "radial-gradient(ellipse 70% 45% at 50% 30%, rgba(255,255,255,0.35), transparent 70%), linear-gradient(#f1ede5, #ddd4c4)";

export function TeamSection({ dict }: { dict: TeamDict }) {
  return (
    <section className="mx-auto max-w-[90rem] px-5 pb-28 md:px-8">
      <div className="border-t border-line pt-16 md:pt-20">
        <p className="eyebrow">{dict.eyebrow}</p>
        <div className="mt-4 grid gap-6 md:grid-cols-12">
          <h2 className="font-serif text-4xl leading-[1.1] text-navy md:col-span-6 md:text-5xl">{dict.title}</h2>
          <p className="leading-relaxed text-navy/70 md:col-span-4 md:col-start-9 md:pt-3">{dict.intro}</p>
        </div>
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:gap-x-6 lg:grid-cols-4">
        {team.map((m, i) => (
          <li key={m.name} data-reveal="up" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
            <div className="group relative aspect-[4/5] overflow-hidden" style={{ background: backdrop }}>
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <span aria-hidden className="absolute inset-0 grid place-items-center font-serif text-7xl text-navy/25 md:text-8xl">
                  {m.name.charAt(0)}
                </span>
              )}
            </div>
            <p className="eyebrow mt-5">
              {dict.roles[m.role]}
              {m.location ? ` · ${m.location}` : ""}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-navy md:text-3xl">{m.name}</h3>
            {m.phone && (
              <a href={`tel:${m.phone.replace(/[^\d+]/g, "")}`} className="link-line mt-2 inline-block text-sm text-navy/70" aria-label={`${dict.call} ${m.name}, ${m.phone}`}>
                {m.phone}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
