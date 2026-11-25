import Image from "next/image";

/**
 * The opening of an inner page: eyebrow, a large serif title that rises out of a mask,
 * and an intro. With `image` it becomes a full-bleed photo header.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  const content = (
    <>
      {eyebrow && (
        <p className={`fade-in text-[11px] uppercase tracking-[0.22em] ${image ? "text-white/70" : "text-brass"}`}>{eyebrow}</p>
      )}
      <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">
        <span className="line-mask">
          <span style={{ "--d": "150ms" } as React.CSSProperties}>{title}</span>
        </span>
      </h1>
      {intro && (
        <p
          className={`fade-in mt-6 max-w-xl text-lg leading-relaxed ${image ? "text-white/80" : "text-navy/70"}`}
          style={{ "--d": "450ms" } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
      {children}
    </>
  );

  if (!image) {
    return (
      <section className="mx-auto max-w-[90rem] px-5 pb-12 pt-20 text-navy md:px-8 md:pb-16 md:pt-28">
        {content}
      </section>
    );
  }
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ animation: "drift 12s linear both" }} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(8,13,15,0.85),rgba(8,13,15,0.3))]" />
      <div className="mx-auto max-w-[90rem] px-5 pb-16 pt-40 md:px-8 md:pb-20 md:pt-56">{content}</div>
    </section>
  );
}
