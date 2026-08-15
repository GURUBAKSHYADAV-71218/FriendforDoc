"use client";

import { useState } from "react";
import { Sparkles, X, Loader2, TriangleAlert } from "lucide-react";

export default function ExplainButton({ term, context }: { term: string; context?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState(false);

  async function handleOpen() {
    setOpen(true);
    if (answer || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, context }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      if (!data.explanation) throw new Error("empty");
      setAnswer(data.explanation);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-1 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[12px] font-medium text-brand-700 transition-colors hover:bg-brand-100"
      >
        <Sparkles size={12} />
        Explain with AI
      </button>

      {open && (
        <span
          role="dialog"
          className="absolute left-0 top-full z-30 mt-2 block w-72 rounded-xl border border-line bg-white p-4 text-left shadow-[var(--shadow-card-hover)] sm:w-80"
        >
          <span className="flex items-start justify-between gap-2">
            <span className="text-[13px] font-semibold text-ink">{term}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-ink-faint hover:text-ink"
            >
              <X size={14} />
            </button>
          </span>

          <span className="mt-2 block text-[13.5px] leading-relaxed text-ink-soft">
            {loading && (
              <span className="flex items-center gap-2 text-ink-faint">
                <Loader2 size={14} className="animate-spin" />
                Thinking of a simple way to explain this...
              </span>
            )}
            {!loading && error && (
              <span className="flex items-start gap-2 text-ink-soft">
                <TriangleAlert size={14} className="mt-0.5 shrink-0 text-stamp-amber" />
                We couldn&apos;t reach the AI helper right now. In short:{" "}
                {context ?? "please check the official notification for the exact meaning of this term."}
              </span>
            )}
            {!loading && !error && answer}
          </span>
        </span>
      )}
    </span>
  );
}
