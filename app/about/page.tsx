import Link from "next/link";
import { HeartHandshake, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About — FriendForDoc",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Built for students",
    text: "No jargon, no walls of legal text — just what you actually need to know before you start filling out a form.",
  },
  {
    icon: ShieldCheck,
    title: "Honest about limits",
    text: "We never invent dates, fees or eligibility numbers. Where we're unsure, we say so and point you to the official source.",
  },
  {
    icon: Sparkles,
    title: "A little AI help",
    text: "Confusing terms like \"self-attested\" get a plain-language explanation, without replacing the official rules.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-[12.5px] font-semibold uppercase tracking-wide text-brand-600">About</p>
      <h1 className="mt-2 font-display text-[30px] font-semibold leading-tight text-ink sm:text-[34px]">
        Your friend before every application.
      </h1>
      <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
        Know what you need. Avoid mistakes. Apply with confidence.
      </p>

      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        <p>
          Every year, students lose time — and sometimes a whole application
          cycle — to small, avoidable mistakes: a photo in the wrong format, a
          missing certificate, a deadline nobody flagged in time. FriendForDoc
          exists to catch those problems before they happen.
        </p>
        <p>
          For each application, we lay out eligibility, required documents,
          photo and signature specifications, key dates, fees and the
          mistakes people commonly make — so you walk in prepared, not
          guessing.
        </p>
        <p>
          FriendForDoc is not a government service and does not submit
          applications on your behalf. Every form page links straight to the
          real, official website, and we always tell you when to double-check
          something there yourself.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <v.icon size={17} />
            </span>
            <h3 className="mt-3 font-display text-[15.5px] font-semibold text-ink">{v.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-white p-7 text-center shadow-[var(--shadow-card)]">
        <h2 className="font-display text-[19px] font-semibold text-ink">Ready to check your next application?</h2>
        <Link
          href="/forms"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Explore Forms <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
