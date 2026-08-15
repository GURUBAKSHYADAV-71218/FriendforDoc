"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { forms } from "@/lib/forms";
import ChecklistWidget from "@/components/Checklist";

export default function ChecklistClient() {
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
          <ClipboardList size={20} />
        </span>
        <div>
          <h1 className="font-display text-[26px] font-semibold text-ink">My Checklist</h1>
          <p className="text-[13.5px] text-ink-soft">
            Pick a form, tick off documents as you gather them. No login needed.
          </p>
        </div>
      </div>

      <div className="mt-7">
        <label htmlFor="form-select" className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
          Choose a form
        </label>
        <select
          id="form-select"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[14.5px] text-ink shadow-[var(--shadow-card)] outline-none focus:border-brand-500"
        >
          {forms.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <ChecklistWidget form={form} key={form.slug} />
      </div>

      <p className="mt-6 text-center text-[13px] text-ink-soft">
        Want the full requirement details?{" "}
        <Link href={`/forms/${form.slug}`} className="font-semibold text-brand-600 hover:text-brand-700">
          Open the {form.title} page →
        </Link>
      </p>
    </div>
  );
}
