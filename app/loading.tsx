export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-line/70" />
      <div className="mt-4 h-4 w-72 animate-pulse rounded-lg bg-line/50" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-white shadow-[var(--shadow-card)]" />
        ))}
      </div>
    </div>
  );
}
