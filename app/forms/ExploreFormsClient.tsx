"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FormCard from "@/components/FormCard";
import { forms, statusLabels, filterCategories, opportunityTypeLabels } from "@/lib/forms";
import { ApplicationStatus, OpportunityType } from "@/lib/types";

const statusFilters: ApplicationStatus[] = ["open", "closing_soon", "opening_soon", "closed", "date_not_verified", "informational"];
const typeFilters: OpportunityType[] = ["exam", "counselling", "scholarship", "recruitment", "document"];

const PAGE_SIZE = 24;

export default function ExploreFormsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forms.filter((f) => {
      const matchesQuery =
        !q ||
        f.title.toLowerCase().includes(q) ||
        (f.shortName?.toLowerCase().includes(q) ?? false) ||
        f.description.toLowerCase().includes(q) ||
        f.authority.toLowerCase().includes(q);
      const matchesCategory = category === "All" || f.category === category;
      const matchesStatus = status === "All" || f.applicationStatus === status;
      const matchesType = type === "All" || f.opportunityType === type;
      return matchesQuery && matchesCategory && matchesStatus && matchesType;
    });
  }, [query, category, status, type]);

  // Reset pagination whenever a filter narrows or widens the result set.
  // Computed during render (comparing against the previous filter
  // signature) rather than in an effect, so it doesn't trigger an extra
  // render pass.
  const filterSignature = `${query}|${category}|${status}|${type}`;
  const [lastFilterSignature, setLastFilterSignature] = useState(filterSignature);
  let effectiveVisibleCount = visibleCount;
  if (filterSignature !== lastFilterSignature) {
    effectiveVisibleCount = PAGE_SIZE;
    setLastFilterSignature(filterSignature);
    setVisibleCount(PAGE_SIZE);
  }

  const visibleResults = results.slice(0, effectiveVisibleCount);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-[30px] font-semibold text-ink">Explore Forms</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Browse every exam, counselling process, scholarship and recruitment
          opportunity FriendForDoc covers so far. Search by name or filter to
          find yours.
        </p>
      </div>

      <div className="mt-8 sm:max-w-md">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Type:</span>
        {["All", ...typeFilters].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
              type === t
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {t === "All" ? "All" : opportunityTypeLabels[t]}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Category:</span>
        {["All", ...filterCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
              category === cat
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
          Deadline Radar:
        </span>
        {["All", ...statusFilters].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
              status === s
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {s === "All" ? "All" : statusLabels[s as ApplicationStatus]}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[13px] text-ink-faint">
        {results.length} {results.length === 1 ? "opportunity" : "opportunities"} found
      </p>

      {results.length > 0 ? (
        <>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleResults.map((form) => (
              <FormCard key={form.slug} form={form} />
            ))}
          </div>
          {effectiveVisibleCount < results.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Show more ({results.length - effectiveVisibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <SearchX size={28} className="text-ink-faint" />
          <p className="mt-3 text-[15px] font-medium text-ink">No opportunities match your search</p>
          <p className="mt-1 text-[13.5px] text-ink-faint">
            Try a different keyword, like &ldquo;JEE&rdquo; or &ldquo;banking&rdquo;, or clear a filter.
          </p>
        </div>
      )}
    </div>
  );
}
