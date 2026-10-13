import { ApplicationStatus } from "@/lib/types";
import { statusLabels } from "@/lib/forms";
import { Circle, TriangleAlert, Clock, XCircle, HelpCircle, Info } from "lucide-react";

const statusStyles: Record<ApplicationStatus, string> = {
  open: "bg-clip-teal-100 text-clip-teal",
  closing_soon: "bg-flag-rose-100 text-flag-rose",
  opening_soon: "bg-stamp-amber-100 text-stamp-amber",
  closed: "bg-ink-faint/10 text-ink-faint",
  date_not_verified: "bg-brand-50 text-brand-700",
  informational: "bg-clip-teal-100 text-clip-teal",
};

const statusIcons: Record<ApplicationStatus, typeof Circle> = {
  open: Circle,
  closing_soon: TriangleAlert,
  opening_soon: Clock,
  closed: XCircle,
  date_not_verified: HelpCircle,
  informational: Info,
};

export default function StatusBadge({
  status,
  size = "sm",
}: {
  status: ApplicationStatus;
  size?: "sm" | "md";
}) {
  const Icon = statusIcons[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold ${statusStyles[status]} ${
        size === "md" ? "px-3 py-1.5 text-[12.5px]" : "px-2.5 py-1 text-[11px]"
      }`}
    >
      <Icon size={size === "md" ? 13 : 11} strokeWidth={2.5} />
      {statusLabels[status]}
    </span>
  );
}
