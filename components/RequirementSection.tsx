import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export default function RequirementSection({
  icon: Icon,
  title,
  children,
  id,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon size={16} strokeWidth={2.25} />
        </span>
        <h2 className="font-display text-[19px] font-semibold text-ink">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
