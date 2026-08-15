"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search an application...",
  size = "md",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  size?: "md" | "lg";
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-line bg-white shadow-[var(--shadow-card)] transition-shadow focus-within:shadow-[var(--shadow-card-hover)] ${
        size === "lg" ? "px-5 py-4" : "px-4 py-2.5"
      }`}
    >
      <Search size={size === "lg" ? 20 : 17} className="shrink-0 text-ink-faint" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent text-ink outline-none placeholder:text-ink-faint ${
          size === "lg" ? "text-[16px]" : "text-[14px]"
        }`}
      />
    </div>
  );
}
