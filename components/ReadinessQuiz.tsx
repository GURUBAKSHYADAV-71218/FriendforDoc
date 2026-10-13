"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, RotateCcw, Gauge } from "lucide-react";
import { FormRecord } from "@/lib/types";
import { buildReadinessQuestions, scoreReadiness } from "@/lib/readiness";

function ringColor(percent: number) {
  if (percent >= 80) return "var(--color-clip-teal)";
  if (percent >= 45) return "var(--color-stamp-amber)";
  return "var(--color-flag-rose)";
}

export default function ReadinessQuiz({ form }: { form: FormRecord }) {
  const questions = useMemo(() => buildReadinessQuestions(form), [form]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const current = questions[step];
  const result = useMemo(() => scoreReadiness(questions, answers), [questions, answers]);

  function answer(value: boolean) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setFinished(false);
  }

  if (finished) {
    const circumference = 2 * Math.PI * 42;
    const offset = circumference - (result.percent / 100) * circumference;

    return (
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
        <p className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
          {form.title} — Your application readiness
        </p>

        <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative h-32 w-32 shrink-0">
            <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-line)" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={ringColor(result.percent)}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[26px] font-bold text-ink">{result.percent}%</span>
              <span className="text-[11px] text-ink-faint">Ready</span>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[14.5px] leading-relaxed text-ink">{result.recommendation}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {result.ready.length > 0 && (
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-clip-teal">Ready</p>
                  <ul className="mt-2 space-y-1.5">
                    {result.ready.map((q) => (
                      <li key={q.id} className="flex items-start gap-2 text-[13px] text-ink-soft">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-clip-teal" />
                        {shortLabel(q.label)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.needsAttention.length > 0 && (
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-flag-rose">
                    Needs attention
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {result.needsAttention.map((q) => (
                      <li key={q.id} className="flex items-start gap-2 text-[13px] text-ink-soft">
                        <Circle size={14} className="mt-0.5 shrink-0 text-flag-rose" />
                        {shortLabel(q.label)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-[12px] text-ink-faint">
          This is a preparation check, not a legal or official eligibility verdict — always confirm
          against the official notification.
        </p>

        <button
          onClick={restart}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          <RotateCcw size={13} /> Restart
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
          <Gauge size={14} className="text-brand-600" /> {form.title} readiness check
        </p>
        <span className="text-[12px] text-ink-faint">
          {step + 1} / {questions.length}
        </span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-50">
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-300 ease-out"
          style={{ width: `${((step) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="mt-6 font-display text-[19px] font-semibold leading-snug text-ink">
        {current.label}
      </h3>
      {current.helpText && (
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{current.helpText}</p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => answer(true)}
          className="flex-1 rounded-xl border-2 border-clip-teal bg-clip-teal-100 px-4 py-3 text-[14.5px] font-semibold text-clip-teal transition-transform hover:scale-[1.01]"
        >
          Yes, I have this ready
        </button>
        <button
          onClick={() => answer(false)}
          className="flex-1 rounded-xl border-2 border-line px-4 py-3 text-[14.5px] font-semibold text-ink-soft transition-colors hover:border-flag-rose hover:text-flag-rose"
        >
          Not yet
        </button>
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 text-[12.5px] font-medium text-ink-faint hover:text-ink-soft"
        >
          ← Back to previous question
        </button>
      )}
    </div>
  );
}

function shortLabel(label: string) {
  const cleaned = label
    .replace(/^Do you have( \(if applicable\))?: /, "")
    .replace(/^Is your |^Are your |^Have you /, "")
    .replace(/\?$/, "");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
