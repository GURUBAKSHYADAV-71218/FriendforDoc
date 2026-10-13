"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Gauge } from "lucide-react";
import { forms, groupByCategory } from "@/lib/forms";
import ReadinessQuiz from "@/components/ReadinessQuiz";

export default function ReadyClient() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("form");
  const [slug, setSlug] = useState(
    preselect && forms.some((f) => f.slug === preselect) ? preselect : forms[0].slug
  );

  const form = forms.find((f) => f.slug === slug) ?? forms[0];

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Gauge size={20} />
        </span>
        <div>
          <h1 className="font-display text-[26px] font-semibold text-ink">Am I Ready?</h1>
          <p className="text-[13.5px] text-ink-soft">
            A quick preparation check — not an official eligibility verdict.
          </p>
        </div>
      </div>

      <div className="mt-7">
        <label htmlFor="ready-form-select" className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
          Choose a form
        </label>
        <select
          id="ready-form-select"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[14.5px] text-ink shadow-[var(--shadow-card)] outline-none focus:border-brand-500"
        >
          {groupByCategory(forms).map(([cat, group]) => (
            <optgroup key={cat} label={cat}>
              {group.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <ReadinessQuiz form={form} key={form.slug} />
      </div>

      <p className="mt-6 text-center text-[13px] text-ink-soft">
        Want to track documents as you gather them?{" "}
        <Link href={`/checklist?form=${form.slug}`} className="font-semibold text-brand-600 hover:text-brand-700">
          Open your checklist →
        </Link>
      </p>
    </div>
  );
}
