"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = { image: string; href: string; name: string; line: string };

const INTERVAL = 6500;

/** Full-bleed photo slideshow: slow crossfade with a gentle drift on the active photo. */
export function HeroSlideshow({ slides, children }: { slides: Slide[]; children: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, slides.length]);

  const current = slides[i];

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      {slides.map((s, n) => (
        <div
          key={s.image}
          aria-hidden={n !== i}
          className={`absolute inset-0 -z-20 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            n === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={n === 0}
            sizes="100vw"
            className="object-cover"
            style={n === i ? { animation: `drift ${INTERVAL + 1600}ms linear both` } : undefined}
          />
        </div>
      ))}
      {/* Legibility: darker at the bottom-left where the text sits. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(8,13,15,0.85)_0%,rgba(8,13,15,0.35)_45%,rgba(8,13,15,0.2)_70%,rgba(8,13,15,0.45)_100%)]" />

      {children}

      {/* Caption, counter and controls */}
      <div className="mx-auto flex w-full max-w-[90rem] items-end justify-between gap-6 px-5 pb-8 md:px-8">
        <div className="fade-in flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-white/70" style={{ "--d": "1600ms" } as React.CSSProperties}>
          <span className="tabular-nums text-white">
            {String(i + 1).padStart(2, "0")} <span className="text-white/40">/ {String(slides.length).padStart(2, "0")}</span>
          </span>
          <div className="hidden gap-2 sm:flex">
            {slides.map((s, n) => (
              <button
                key={s.image}
                type="button"
                aria-label={`${n + 1}: ${s.name}`}
                aria-current={n === i}
                onClick={() => setI(n)}
                className="relative h-px w-10 overflow-hidden bg-white/25"
              >
                {n === i && (
                  <span
                    key={`${i}-${paused}`}
                    className="absolute inset-0 origin-left bg-white"
                    style={{ animation: paused ? undefined : `progress ${INTERVAL}ms linear both` }}
                  />
                )}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setPaused((p) => !p)} className="link-line hidden sm:inline" aria-pressed={paused}>
            {paused ? "Play" : "Pause"}
          </button>
        </div>
        <Link
          href={current.href}
          className="fade-in group hidden text-right md:block"
          style={{ "--d": "1700ms" } as React.CSSProperties}
        >
          <span className="block font-serif text-2xl italic">{current.name}</span>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-white/65 group-hover:text-white">
            {current.line} →
          </span>
        </Link>
      </div>
      <style>{`@keyframes progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}
