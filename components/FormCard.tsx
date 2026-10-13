import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormRecord } from "@/lib/types";
import StatusBadge from "./StatusBadge";

const categoryStyles: Record<string, string> = {
  "Entrance Exam": "bg-brand-50 text-brand-700",
  Government: "bg-stamp-amber-100 text-stamp-amber",
  Scholarship: "bg-clip-teal-100 text-clip-teal",
  Education: "bg-flag-rose-100 text-flag-rose",
};

export default function FormCard({ form }: { form: FormRecord }) {
  return (
    <Link
      href={`/forms/${form.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[18px] font-semibold text-ink">
            {form.title}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              categoryStyles[form.category] ?? "bg-brand-50 text-brand-700"
            }`}
          >
            {form.category}
          </span>
        </div>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
          {form.description}
        </p>
        <div className="mt-3">
          <StatusBadge status={form.applicationStatus} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-[12.5px] text-ink-faint">{form.authority}</span>
        <span className="flex items-center gap-1 text-[13.5px] font-semibold text-brand-600 transition-transform group-hover:translate-x-0.5">
          View details <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

