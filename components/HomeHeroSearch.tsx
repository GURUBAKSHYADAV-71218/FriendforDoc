"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "./SearchBar";

const EXAMPLES = ["NEET", "JEE Main", "CUET", "Scholarship", "PAN"];

export default function HomeHeroSearch() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function go(term: string) {
    const q = term.trim();
    router.push(q ? `/forms?q=${encodeURIComponent(q)}` : "/forms");
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
      >
        <SearchBar value={value} onChange={setValue} size="lg" />
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-ink-faint">
        <span>Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => go(ex)}
            className="rounded-full border border-line bg-white px-3 py-1 font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
