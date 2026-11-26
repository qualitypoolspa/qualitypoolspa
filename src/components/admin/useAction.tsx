"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/app/admin/actions";

/**
 * Runs a server action and tracks the outcome for the button next to it:
 * pending while it runs, then "Saved ✓" or the error message.
 */
export function useAction() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function run(action: (fd: FormData) => Promise<ActionResult>, fd: FormData, onDone?: () => void) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await action(fd);
      // An action that redirects (create, delete) navigates away instead of returning.
      if (!res) return;
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        router.refresh();
        onDone?.();
      } else {
        setError(res.error);
      }
    });
  }

  /** Convenience for one-click buttons: builds the FormData from an object. */
  function click(action: (fd: FormData) => Promise<ActionResult>, entries: Record<string, string>) {
    const fd = new FormData();
    for (const [k, v] of Object.entries(entries)) fd.set(k, v);
    run(action, fd);
  }

  // The refresh after a save runs inside the same transition, so `pending`
  // stays true until the page has re-rendered; only then say "Saved".
  return { pending, saved: saved && !pending, error, run, click };
}

export function Status({ saved, error }: { saved: boolean; error: string | null }) {
  if (error) return <span className="adm-err" role="alert">{error}</span>;
  if (saved) return <span className="adm-saved">Saved ✓</span>;
  return null;
}
