const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Formats a "YYYY-MM-DD" string into "25 Sep 2026" without ever
 * constructing a `Date` object. Parsing the string directly (instead of
 * `new Date(iso)`) keeps this identical on the server and in the browser
 * regardless of either environment's local timezone, avoiding the
 * server/client hydration mismatches that timezone-sensitive date parsing
 * can cause.
 */
export function formatIsoDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  const monthLabel = MONTHS[monthIndex] ?? month;
  return `${Number(day)} ${monthLabel} ${year}`;
}
