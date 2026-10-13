"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ClipboardCheck, ClipboardList, Menu, X } from "lucide-react";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/forms", label: "Explore Forms" },
  { href: "/ready", label: "Am I Ready?" },
  { href: "/tools", label: "Document Tools" },
  { href: "/find", label: "Find My Forms" },
];

const mobileOnlyLinks = [
  { href: "/checklist", label: "My Checklist" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <ClipboardCheck size={17} strokeWidth={2.25} />
          </span>
          <span className="font-display text-[19px] font-semibold tracking-tight text-ink">
            FriendForDoc
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-2.5 py-2 text-[14px] font-medium transition-colors ${
                isActive(l.href)
                  ? "text-brand-700"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/checklist"
            aria-label="My Checklist"
            title="My Checklist"
            className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
              isActive("/checklist")
                ? "border-brand-300 bg-brand-50 text-brand-700"
                : "border-line text-ink-soft hover:text-brand-700"
            }`}
          >
            <ClipboardList size={16} />
          </Link>
          <Link
            href="/forms"
            className="rounded-full bg-brand-600 px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Explore Forms
          </Link>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-md text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-5 pb-4 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {[...primaryLinks, ...mobileOnlyLinks].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-[15px] font-medium ${
                  isActive(l.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-soft"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
