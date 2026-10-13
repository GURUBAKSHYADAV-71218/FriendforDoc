"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, RotateCcw, Compass, SearchX } from "lucide-react";
import { EDUCATION_LEVELS, STREAMS, INTEREST_AREAS } from "@/lib/matchOptions";
import { findMatchingForms } from "@/lib/forms";
import StatusBadge from "./StatusBadge";

export default function FindFormsQuiz() {
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function restart() {
    setEducationLevel("");
    setStream("");
    setInterests([]);
    setSubmitted(false);
  }

  if (submitted) {
    const matches = findMatchingForms({ educationLevel, stream, interestAreas: interests });
    const shown = matches.slice(0, 20);

    return (
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
        <p className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
          Your possible matches
        </p>
        <p className="mt-1 text-[13px] text-ink-faint">
          These are potential matches based on what you selected — not a confirmation of eligibility.
        </p>

        {matches.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-line bg-paper py-12 text-center">
            <SearchX size={26} className="text-ink-faint" />
            <p className="mt-3 text-[14px] font-medium text-ink">No close matches found</p>
            <p className="mt-1 max-w-sm text-[13px] text-ink-faint">
              Try selecting a broader interest area, or browse the full list of forms instead.
            </p>
            <Link
              href="/forms"
              className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-700"
            >
              Explore all forms
            </Link>
          </div>
        ) : (
          <ul className="mt-5 space-y-4">
            {shown.map(({ form, reasons }) => (
              <li key={form.slug} className="rounded-xl border border-line p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/forms/${form.slug}`}
                      className="font-display text-[16.5px] font-semibold text-ink hover:text-brand-700"
                    >
                      {form.title}
                    </Link>
                    <p className="text-[12.5px] text-ink-faint">{form.description}</p>
                  </div>
                  <StatusBadge status={form.applicationStatus} />
                </div>

                <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-wide text-ink-faint">
                  Why this form?
                </p>
                <ul className="mt-1.5 space-y-1">
                  {reasons
                    .filter((r) => r.matched)
                    .map((r) => (
                      <li key={r.label} className="flex items-center gap-2 text-[13px] text-ink-soft">
                        <CheckCircle2 size={13} className="shrink-0 text-clip-teal" />
                        {r.label}
                      </li>
                    ))}
                </ul>

                <Link
                  href={`/forms/${form.slug}`}
                  className="mt-3 inline-block text-[13px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  View requirements →
                </Link>
              </li>
            ))}
          </ul>
        )}

        {matches.length > shown.length && (
          <p className="mt-4 text-[12.5px] text-ink-faint">
            Showing the top {shown.length} of {matches.length} potential matches. Narrow your interests for a shorter list.
          </p>
        )}

        <p className="mt-6 text-[12px] text-ink-faint">
          FriendForDoc suggests forms that may be relevant — always check official eligibility
          criteria before applying.
        </p>

        <button
          onClick={restart}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          <RotateCcw size={13} /> Start over
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
      <p className="flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
        <Compass size={14} className="text-brand-600" /> Tell us a little about you
      </p>

      <fieldset className="mt-5">
        <legend className="text-[14px] font-semibold text-ink">Education level</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {EDUCATION_LEVELS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setEducationLevel(opt.value)}
              aria-pressed={educationLevel === opt.value}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                educationLevel === opt.value
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-[14px] font-semibold text-ink">Stream</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {STREAMS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStream(opt.value)}
              aria-pressed={stream === opt.value}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                stream === opt.value
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-[14px] font-semibold text-ink">
          What are you interested in? <span className="font-normal text-ink-faint">(pick any)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTEREST_AREAS.map((opt) => {
            const active = interests.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleInterest(opt.value)}
                aria-pressed={active}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {active ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                {opt.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        onClick={() => setSubmitted(true)}
        disabled={!educationLevel || !stream || interests.length === 0}
        className="mt-7 w-full rounded-full bg-brand-600 px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Show my possible matches
      </button>
      {(!educationLevel || !stream || interests.length === 0) && (
        <p className="mt-2 text-center text-[12px] text-ink-faint">
          Pick an education level, a stream, and at least one interest area.
        </p>
      )}
    </div>
  );
}
