"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FormCard from "@/components/FormCard";
import { forms, categories } from "@/lib/forms";

export default function ExploreFormsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forms.filter((f) => {
      const matchesQuery =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.authority.toLowerCase().includes(q);
      const matchesCategory = category === "All" || f.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-[30px] font-semibold text-ink">Explore Forms</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Browse every application FriendForDoc covers so far. Search by name
          or filter by category to find yours.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="sm:max-w-md sm:flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                category === cat
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[13px] text-ink-faint">
        {results.length} {results.length === 1 ? "application" : "applications"} found
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((form) => (
            <FormCard key={form.slug} form={form} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <SearchX size={28} className="text-ink-faint" />
          <p className="mt-3 text-[15px] font-medium text-ink">No applications match your search</p>
          <p className="mt-1 text-[13.5px] text-ink-faint">
            Try a different keyword, like &ldquo;NEET&rdquo; or &ldquo;PAN&rdquo;, or clear the category filter.
          </p>
        </div>
      )}
    </div>
  );
}
