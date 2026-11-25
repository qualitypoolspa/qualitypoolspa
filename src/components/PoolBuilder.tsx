"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { depths, extras, finishes, locations, sizes, stairs, timeframes, type Option } from "@/data/poolBuilder";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { lang: Locale; t: Dictionary["builder"] };

const pill = (active: boolean) =>
  `border px-4 py-4 text-left transition duration-300 ${
    active ? "border-navy bg-navy text-paper" : "border-line text-navy hover:border-navy"
  }`;

function Choice({ list, value, onChange, lang }: { list: Option[]; value: string; onChange: (id: string) => void; lang: Locale }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {list.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)} className={pill(value === o.id)}>
          <span className="block text-sm font-semibold">{pick(o.label, lang)}</span>
          {o.note && <span className={`block text-xs ${value === o.id ? "text-white/70" : "text-navy/55"}`}>{pick(o.note, lang)}</span>}
        </button>
      ))}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="flex items-baseline gap-4 font-serif text-3xl text-navy">
        <span className="font-serif text-xl italic text-brass">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Thermopool builder: the customer picks options and sends a request (no prices). */
export function PoolBuilder({ lang, t }: Props) {
  const [size, setSize] = useState(sizes[2].id);
  const [depth, setDepth] = useState(depths[1].id);
  const [stair, setStair] = useState(stairs[1].id);
  const [finish, setFinish] = useState(finishes[0].id);
  const [chosen, setChosen] = useState<string[]>([]);
  const [location, setLocation] = useState(locations[0].id);
  const [timeframe, setTimeframe] = useState(timeframes[1].id);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState(false);

  const label = (list: Option[], id: string) => pick(list.find((o) => o.id === id)!.label, lang);
  const sz = sizes.find((s) => s.id === size)!;
  const fin = finishes.find((f) => f.id === finish)!;
  const extrasText = chosen.length ? chosen.map((id) => label(extras, id)).join(", ") : t.noneSelected;

  const summary: [string, string][] = [
    [t.steps.size, label(sizes, size)],
    [t.steps.depth, label(depths, depth)],
    [t.steps.stairs, label(stairs, stair)],
    [t.steps.finish, label(finishes, finish)],
    [t.steps.extras, extrasText],
    [t.location, label(locations, location)],
    [t.timeframe, label(timeframes, timeframe)],
  ];

  const message = () => {
    const lines = [t.greeting, "", ...summary.map(([k, v]) => `${k}: ${v}`)];
    if (notes.trim()) lines.push(`${t.notes} ${notes.trim()}`);
    lines.push("", `${t.name}: ${contact.name}`);
    if (contact.email) lines.push(`${t.email}: ${contact.email}`);
    if (contact.phone) lines.push(`${t.phone}: ${contact.phone}`);
    return lines.join("\n");
  };

  const valid = () => {
    const ok = contact.name.trim() !== "" && (contact.email.trim() !== "" || contact.phone.trim() !== "");
    setError(!ok);
    return ok;
  };
  const sendEmail = () => {
    if (!valid()) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${t.subject}: ${label(sizes, size)}`)}&body=${encodeURIComponent(message())}`;
  };
  const sendWhatsapp = () => {
    if (!valid()) return;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message())}`, "_blank", "noopener");
  };

  const field = "w-full border-b border-navy/25 bg-transparent px-0 py-3 text-[15px] text-navy outline-none transition focus:border-navy";

  // Simple top view: pool scaled to the largest size, stairs drawn at one end.
  const scale = 300 / 10;
  const w = sz.length * scale;
  const h = sz.width * scale;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-10">
        <p className="max-w-2xl text-lg leading-relaxed text-navy/75">{t.intro}</p>

        <Step n={1} title={t.steps.size}>
          <Choice list={sizes} value={size} onChange={setSize} lang={lang} />
        </Step>
        <Step n={2} title={t.steps.depth}>
          <Choice list={depths} value={depth} onChange={setDepth} lang={lang} />
        </Step>
        <Step n={3} title={t.steps.stairs}>
          <Choice list={stairs} value={stair} onChange={setStair} lang={lang} />
        </Step>
        <Step n={4} title={t.steps.finish}>
          <div className="flex flex-wrap gap-3">
            {finishes.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={finish === f.id}
                onClick={() => setFinish(f.id)}
                className={`flex items-center gap-3 border py-2 pl-2 pr-4 text-sm transition duration-300 ${
                  finish === f.id ? "border-navy" : "border-line hover:border-navy"
                }`}
              >
                <span className="h-7 w-7 border border-black/10" style={{ background: f.hex }} />
                {pick(f.label, lang)}
              </button>
            ))}
          </div>
        </Step>
        <Step n={5} title={t.steps.extras}>
          <p className="-mt-2 mb-4 text-sm text-navy/55">{t.extrasHint}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {extras.map((o) => {
              const on = chosen.includes(o.id);
              return (
                <label key={o.id} className={`flex cursor-pointer items-center gap-3 border px-4 py-4 text-sm transition duration-300 ${on ? "border-navy" : "border-line hover:border-navy"}`}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setChosen((c) => (on ? c.filter((x) => x !== o.id) : [...c, o.id]))}
                    className="h-4 w-4 accent-[#0b1f2a]"
                  />
                  {pick(o.label, lang)}
                </label>
              );
            })}
          </div>
        </Step>
        <Step n={6} title={t.steps.project}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-[11px] uppercase tracking-[0.16em] text-navy/55">
              {t.location}
              <select value={location} onChange={(e) => setLocation(e.target.value)} className={`${field} mt-1`}>
                {locations.map((o) => <option key={o.id} value={o.id}>{pick(o.label, lang)}</option>)}
              </select>
            </label>
            <label className="text-[11px] uppercase tracking-[0.16em] text-navy/55">
              {t.timeframe}
              <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className={`${field} mt-1`}>
                {timeframes.map((o) => <option key={o.id} value={o.id}>{pick(o.label, lang)}</option>)}
              </select>
            </label>
            <label className="text-[11px] uppercase tracking-[0.16em] text-navy/55 sm:col-span-2">
              {t.notes}
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder={t.notesPlaceholder} className={`${field} mt-1`} />
            </label>
          </div>
        </Step>
        <Step n={7} title={t.steps.contact}>
          <div className="grid gap-4 sm:grid-cols-3">
            {(["name", "email", "phone"] as const).map((k) => (
              <label key={k} className="text-[11px] uppercase tracking-[0.16em] text-navy/55">
                {t[k]}
                <input
                  type={k === "email" ? "email" : k === "phone" ? "tel" : "text"}
                  autoComplete={k === "phone" ? "tel" : k}
                  value={contact[k]}
                  onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))}
                  className={`${field} mt-1`}
                />
              </label>
            ))}
          </div>
        </Step>
      </div>

      {/* Summary: sticky on desktop */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="bg-ink p-7 text-white">
          <p className="eyebrow !text-[#c2a477]">{t.summary}</p>
          <p className="mt-2 font-serif text-4xl">Thermopool {label(sizes, size)}</p>

          <figure className="mt-5">
            <svg viewBox="0 0 320 170" className="w-full" role="img" aria-label={t.drawing}>
              <rect x="0" y="0" width="320" height="170" fill="rgba(255,255,255,0.04)" />
              <g transform={`translate(${(320 - w) / 2} ${(170 - h) / 2})`}>
                <rect width={w} height={h} rx="3" fill={fin.hex} stroke="#c2a477" strokeOpacity="0.8" />
                <rect width={w} height={h} rx="3" fill="url(#water)" />
                {stair === "corner" && <path d={`M0 0 h${h * 0.45} L0 ${h * 0.45} Z`} fill="#fff" opacity="0.75" />}
                {stair === "full-width" && <rect width={h * 0.28} height={h} fill="#fff" opacity="0.75" />}
                {stair === "roman" && <path d={`M0 ${h * 0.25} a${h * 0.25} ${h * 0.25} 0 0 1 0 ${h * 0.5} Z`} transform={`translate(0 0)`} fill="#fff" opacity="0.75" />}
              </g>
              <defs>
                <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#0e7c86" stopOpacity="0.25" />
                </linearGradient>
              </defs>
            </svg>
            <figcaption className="mt-1 text-center text-[11px] text-white/40">{t.drawing}</figcaption>
          </figure>

          <dl className="mt-5 divide-y divide-white/10 text-sm">
            {summary.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2">
                <dt className="text-white/50">{k}</dt>
                <dd className="text-white">{v}</dd>
              </div>
            ))}
          </dl>

          {error && <p role="alert" className="mt-4 text-sm text-[#f0b4a0]">{t.required}</p>}
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={sendEmail} className="btn btn-light w-full">{t.send} <span className="arrow">→</span></button>
            <button type="button" onClick={sendWhatsapp} className="btn btn-ghost w-full">{t.sendWhatsapp}</button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/45">{t.sendNote}</p>
        </div>
      </aside>
    </div>
  );
}
