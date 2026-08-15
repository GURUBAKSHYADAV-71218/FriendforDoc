import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function FormNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <FileQuestion size={26} />
      </span>
      <h1 className="mt-5 font-display text-[24px] font-semibold text-ink">
        We don&apos;t have this form yet
      </h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
        This application isn&apos;t in FriendForDoc&apos;s list right now.
        Try exploring the full list of forms we do cover.
      </p>
      <Link
        href="/forms"
        className="mt-6 rounded-full bg-brand-600 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Explore Forms
      </Link>
    </div>
  );
}
