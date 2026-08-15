import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Compass size={26} />
      </span>
      <h1 className="mt-5 font-display text-[24px] font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-brand-600 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Back to home
      </Link>
    </div>
  );
}
