import Link from "next/link";
import { ClipboardCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
                <ClipboardCheck size={15} strokeWidth={2.25} />
              </span>
              <span className="font-display text-[17px] font-semibold text-ink">
                FriendForDoc
              </span>
            </div>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ink-soft">
              Your friend before every application. Know what you need,
              avoid mistakes, apply with confidence.
            </p>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
              Navigate
            </p>
            <ul className="mt-3 space-y-2 text-[14px] text-ink-soft">
              <li><Link href="/" className="hover:text-brand-700">Home</Link></li>
              <li><Link href="/forms" className="hover:text-brand-700">Explore Forms</Link></li>
              <li><Link href="/ready" className="hover:text-brand-700">Am I Ready?</Link></li>
              <li><Link href="/tools" className="hover:text-brand-700">Document Tools</Link></li>
              <li><Link href="/find" className="hover:text-brand-700">Find My Forms</Link></li>
              <li><Link href="/checklist" className="hover:text-brand-700">My Checklist</Link></li>
              <li><Link href="/about" className="hover:text-brand-700">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
              A note on accuracy
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              We summarise public requirements to help you prepare. Always
              confirm exact dates, fees and formats on the official website
              before you submit.
            </p>
          </div>
        </div>

        <div className="perf-edge mt-10" aria-hidden="true" />

        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-[13px] text-ink-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FriendForDoc. Built for students, not by the government.</p>
          <p>Not affiliated with any official examination or government body.</p>
        </div>
      </div>
    </footer>
  );
}
