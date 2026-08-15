import Link from "next/link";
import {
  ArrowRight,
  Search as SearchIcon,
  BadgeCheck,
  FolderCheck,
  Send,
  CheckCircle2,
  Circle,
} from "lucide-react";
import FormCard from "@/components/FormCard";
import HomeHeroSearch from "@/components/HomeHeroSearch";
import { forms } from "@/lib/forms";

const popularSlugs = ["neet", "jee-main", "cuet", "scholarship", "pan-card", "driving-licence"];
const popular = popularSlugs
  .map((slug) => forms.find((f) => f.slug === slug))
  .filter((f): f is NonNullable<typeof f> => !!f);

const steps = [
  {
    n: "01",
    title: "Find",
    text: "Find your application.",
    icon: SearchIcon,
  },
  {
    n: "02",
    title: "Understand",
    text: "Check eligibility and requirements.",
    icon: BadgeCheck,
  },
  {
    n: "03",
    title: "Prepare",
    text: "Complete your document checklist.",
    icon: FolderCheck,
  },
  {
    n: "04",
    title: "Apply",
    text: "Go to the official website and apply confidently.",
    icon: Send,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[12.5px] font-medium text-ink-soft">
              For students filling out anything official
            </p>
            <h1 className="mt-5 font-display text-[38px] font-semibold leading-[1.1] tracking-tight text-ink text-balance sm:text-[46px] md:text-[52px]">
              Your friend before every application.
            </h1>
            <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-ink-soft">
              Find eligibility, documents, deadlines and requirements before
              you fill out a form.
            </p>

            <div className="mt-8 max-w-lg">
              <HomeHeroSearch />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/forms"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-[14.5px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                Explore Forms <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="text-[14.5px] font-semibold text-ink-soft hover:text-ink"
              >
                How it works
              </Link>
            </div>
          </div>

          {/* Signature element: a live-feeling readiness slip, echoing the
              product's core artifact — a document checklist. */}
          <div className="relative mx-auto w-full max-w-sm md:ml-auto">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-brand-100/60 blur-2xl" aria-hidden="true" />
            <div className="rotate-[-2deg] rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card-hover)] transition-transform hover:rotate-0">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
                  NEET Application
                </p>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                  80%
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-50">
                <div className="h-full w-4/5 rounded-full bg-brand-600" />
              </div>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "Identity proof", done: true },
                  { label: "Photograph", done: true },
                  { label: "Signature", done: true },
                  { label: "Class 10 certificate", done: true },
                  { label: "Category certificate", done: false },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5 text-[13.5px]">
                    {item.done ? (
                      <CheckCircle2 size={16} className="shrink-0 text-brand-600" />
                    ) : (
                      <Circle size={16} className="shrink-0 text-ink-faint" />
                    )}
                    <span className={item.done ? "text-ink-soft line-through" : "text-ink"}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="perf-edge mt-5" aria-hidden="true" />
              <p className="mt-3 text-[11.5px] text-ink-faint">
                Tracked privately on your device — see /checklist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular applications */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-[26px] font-semibold text-ink">
            Popular Applications
          </h2>
          <Link
            href="/forms"
            className="hidden shrink-0 items-center gap-1 text-[14px] font-semibold text-brand-600 hover:text-brand-700 sm:flex"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((form) => (
            <FormCard key={form.slug} form={form} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-[26px] font-semibold text-ink">How it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.n} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-[13px] font-bold text-white">
                    {step.n}
                  </span>
                  <step.icon size={18} className="text-brand-600" />
                </div>
                <h3 className="mt-4 font-display text-[17px] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{step.text}</p>
                {i < steps.length - 1 && (
                  <div
                    className="field-dashed absolute right-[-16px] top-5 hidden w-8 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
