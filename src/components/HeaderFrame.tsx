"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Wraps the header. On the home page it floats over the hero photo, transparent with
 * light text, and turns solid after a short scroll. On other pages it is always solid.
 */
export function HeaderFrame({ home, children }: { home: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === home || pathname === `${home}/`;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = isHome && !scrolled;
  return (
    <header
      data-overlay={overlay}
      className={`group/header inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-500 ${
        isHome ? "fixed" : "sticky"
      } ${overlay ? "bg-transparent text-white" : "bg-paper/95 text-navy shadow-[0_1px_0_rgba(16,25,29,0.08)] backdrop-blur-md"}`}
    >
      {children}
    </header>
  );
}
