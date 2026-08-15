import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  ListChecks,
  Image as ImageIcon,
  PenLine,
  CalendarClock,
  Wallet,
  TriangleAlert,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { forms, getFormBySlug } from "@/lib/forms";
import RequirementSection from "@/components/RequirementSection";
import ExplainButton from "@/components/ExplainButton";

export function generateStaticParams() {
  return forms.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const form = getFormBySlug(slug);
  if (!form) return { title: "Form not found — FriendForDoc" };
  return { title: `${form.title} — FriendForDoc` };
}

const categoryStyles: Record<string, string> = {
  "Entrance Exam": "bg-brand-50 text-brand-700",
  Government: "bg-stamp-amber-100 text-stamp-amber",
  Scholarship: "bg-clip-teal-100 text-clip-teal",
  Education: "bg-flag-rose-100 text-flag-rose",
};

export default async function FormDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const form = getFormBySlug(slug);

  if (!form) {
    notFound();
  }

  const glossaryFor = (word: string) =>
    form.glossary.find((g) => word.toLowerCase().includes(g.term.toLowerCase()));

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Link
        href="/forms"
        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-soft hover:text-brand-700"
      >
        <ArrowLeft size={14} /> Back to all forms
      </Link>

      {/* Header */}
      <div className="mt-5 rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className={`inline-block rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
                categoryStyles[form.category] ?? "bg-brand-50 text-brand-700"
              }`}
            >
              {form.category}
            </span>
            <h1 className="mt-3 font-display text-[30px] font-semibold leading-tight text-ink sm:text-[34px]">
              {form.title}
            </h1>
            <p className="mt-1.5 text-[14px] text-ink-faint">{form.authority}</p>
          </div>
          <a
            href={form.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Official website <ExternalLink size={14} />
          </a>
        </div>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          {form.longDescription}
        </p>
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-paper px-3.5 py-2.5 text-[12.5px] text-ink-faint">
          <ShieldCheck size={15} className="shrink-0 text-clip-teal" />
          {form.lastVerified}. Always verify the latest requirements on the official website.
        </div>
      </div>

      {/* Sections */}
      <div className="mt-6 grid gap-6">
        <RequirementSection icon={ListChecks} title="Eligibility" id="eligibility">
          <ul className="space-y-2.5">
            {form.eligibility.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </RequirementSection>

        <RequirementSection icon={ListChecks} title="Documents Required" id="documents">
          <ul className="divide-y divide-line">
            {form.documents.map((doc) => {
              const g = glossaryFor(doc.label);
              return (
                <li key={doc.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <span className="flex items-center gap-2 text-[14.5px] text-ink">
                    {doc.label}
                    {!doc.required && (
                      <span className="rounded-full bg-paper px-2 py-0.5 text-[10.5px] font-semibold text-ink-faint">
                        If applicable
                      </span>
                    )}
                  </span>
                  {g && <ExplainButton term={g.term} context={g.hint} />}
                </li>
              );
            })}
          </ul>
        </RequirementSection>

        <div className="grid gap-6 md:grid-cols-2">
          <RequirementSection icon={ImageIcon} title="Photograph Requirements" id="photo">
            <ul className="space-y-2.5">
              {form.photoRequirements.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </RequirementSection>

          <RequirementSection icon={PenLine} title="Signature Requirements" id="signature">
            <ul className="space-y-2.5">
              {form.signatureRequirements.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </RequirementSection>
        </div>

        <RequirementSection icon={CalendarClock} title="Important Dates" id="dates">
          <div className="grid gap-3 sm:grid-cols-2">
            {form.importantDates.map((d, i) => (
              <div
                key={i}
                className="field-dashed rounded-xl bg-paper p-4"
              >
                <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
                  {d.label}
                </p>
                <p
                  className={`mt-1 text-[14.5px] font-medium ${
                    d.known ? "text-ink" : "text-stamp-amber"
                  }`}
                >
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </RequirementSection>

        <div className="grid gap-6 md:grid-cols-2">
          <RequirementSection icon={Wallet} title="Application Fee" id="fee">
            <p className="text-[14.5px] leading-relaxed text-ink-soft">{form.fee}</p>
          </RequirementSection>

          <RequirementSection icon={TriangleAlert} title="Common Mistakes" id="mistakes">
            <ul className="space-y-2.5">
              {form.commonMistakes.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                  <TriangleAlert size={14} className="mt-0.5 shrink-0 text-flag-rose" />
                  {item}
                </li>
              ))}
            </ul>
          </RequirementSection>
        </div>

        {/* Official source */}
        <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-[var(--shadow-card)] sm:p-8">
          <h2 className="font-display text-[19px] font-semibold text-ink">Ready to apply?</h2>
          <p className="mx-auto mt-1.5 max-w-md text-[13.5px] text-ink-soft">
            FriendForDoc only prepares you — the actual application happens on
            the official site.
          </p>
          <a
            href={form.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-[14.5px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Visit Official Website <ExternalLink size={15} />
          </a>
          <p className="mt-3 text-[12px] text-ink-faint">
            Always verify the latest requirements on the official website.
          </p>
          <Link
            href="/checklist"
            className="mt-4 block text-[13px] font-medium text-brand-600 hover:text-brand-700"
          >
            Build your document checklist for {form.title} →
          </Link>
        </div>
      </div>
    </div>
  );
}
