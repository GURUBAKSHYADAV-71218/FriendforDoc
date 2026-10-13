import { Category } from "../types";

/**
 * Curated, ordered category list shown in Explore Forms filters and the
 * Find My Forms results. Kept intentionally shorter than the full Category
 * union so the filter row stays scannable — "Entrance Exam" still exists as
 * a legacy value on a couple of original entries but new entries use a more
 * specific category from this list.
 */
export const filterCategories: Category[] = [
  "Engineering",
  "Medical & Health Sciences",
  "Law",
  "Management",
  "Design & Architecture",
  "Defence",
  "Civil Services",
  "Banking & Finance",
  "Railways",
  "Teaching & Academic",
  "Education",
  "Scholarship",
  "Study Abroad",
  "Government",
  "Other Careers",
  "Counselling",
];

export const opportunityTypeLabels: Record<string, string> = {
  exam: "Exam",
  counselling: "Counselling",
  scholarship: "Scholarship",
  recruitment: "Recruitment",
  document: "Document / ID",
};

/**
 * Groups a list of catalogue entries by category, in filterCategories'
 * order, for use in <optgroup>-organised <select> dropdowns. Categories
 * not present in the input list are simply omitted.
 */
export function groupByCategory<T extends { category: string }>(items: T[]): [string, T[]][] {
  const byCategory = new Map<string, T[]>();
  for (const item of items) {
    const list = byCategory.get(item.category);
    if (list) {
      list.push(item);
    } else {
      byCategory.set(item.category, [item]);
    }
  }
  const orderedCategories = [...filterCategories, "Entrance Exam", "Government"];
  const ordered: [string, T[]][] = [];
  for (const cat of orderedCategories) {
    const list = byCategory.get(cat);
    if (list) {
      ordered.push([cat, list]);
      byCategory.delete(cat);
    }
  }
  // Any category not in the ordered list (shouldn't normally happen) still
  // gets shown rather than silently dropped.
  for (const [cat, list] of byCategory) {
    ordered.push([cat, list]);
  }
  return ordered;
}
