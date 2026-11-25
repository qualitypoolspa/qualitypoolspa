"use client";

import { useRef } from "react";

/** A horizontal, swipeable row with previous/next buttons (scroll-snap). */
export function Rail({ children, prevLabel, nextLabel }: { children: React.ReactNode; prevLabel: string; nextLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const btn =
    "flex h-12 w-12 items-center justify-center rounded-full border border-navy/30 text-navy transition duration-300 hover:border-navy hover:bg-navy hover:text-paper";
  return (
    <div>
      <div ref={ref} className="rail -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8">
        {children}
      </div>
      <div className="mt-8 flex gap-3">
        <button type="button" aria-label={prevLabel} onClick={() => move(-1)} className={btn}>
          ←
        </button>
        <button type="button" aria-label={nextLabel} onClick={() => move(1)} className={btn}>
          →
        </button>
      </div>
    </div>
  );
}
