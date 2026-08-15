"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { FormRecord } from "@/lib/types";

const STORAGE_KEY = "friendfordoc:checklist";

type StoredState = Record<string, Record<string, boolean>>;

function loadState(): StoredState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : {};
  } catch {
    return {};
  }
}

function saveState(state: StoredState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable — checklist just won't persist this session
  }
}

export default function Checklist({ form }: { form: FormRecord }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  // Reading localStorage (an external system) after mount, then syncing it
  // into state, is the supported pattern for browser-only storage and can't
  // be done during render because the server has no window object.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const state = loadState();
    setChecked(state[form.slug] ?? {});
    setHydrated(true);
  }, [form.slug]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const state = loadState();
      state[form.slug] = next;
      saveState(state);
      return next;
    });
  }

  const total = form.documents.length;
  const done = form.documents.filter((d) => checked[d.id]).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
            {form.title}
          </p>
          <h3 className="mt-1 font-display text-[20px] font-semibold text-ink">
            Application Readiness — {percent}%
          </h3>
        </div>
        <div className="text-right text-[13px] text-ink-soft">
          <span className="font-semibold text-ink">{done}</span> completed ·{" "}
          <span className="font-semibold text-ink">{total - done}</span> remaining
        </div>
      </div>

      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-brand-50">
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-500 ease-out"
          style={{ width: `${hydrated ? percent : 0}%` }}
        />
      </div>

      <ul className="mt-6 divide-y divide-line">
        {form.documents.map((doc) => {
          const isChecked = !!checked[doc.id];
          return (
            <li key={doc.id}>
              <button
                type="button"
                onClick={() => toggle(doc.id)}
                className="flex w-full items-start gap-3 py-3 text-left"
              >
                {isChecked ? (
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-600" />
                ) : (
                  <Circle size={20} className="mt-0.5 shrink-0 text-ink-faint" />
                )}
                <span>
                  <span
                    className={`block text-[14.5px] font-medium ${
                      isChecked ? "text-ink-faint line-through" : "text-ink"
                    }`}
                  >
                    {doc.label}
                    {!doc.required && (
                      <span className="ml-2 rounded-full bg-paper px-2 py-0.5 text-[10.5px] font-semibold text-ink-faint">
                        Optional
                      </span>
                    )}
                  </span>
                  {doc.note && (
                    <span className="mt-0.5 block text-[12.5px] text-ink-faint">{doc.note}</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[12.5px] text-ink-faint">
        Saved automatically on this device. No account needed.
      </p>
    </div>
  );
}
