import { FormRecord, ApplicationStatus } from "../types";
import { coreOpportunities } from "./core";
import { engineeringExams, universityExams } from "./exams-engineering";
import { medicalExams, lawExams, managementExams, designExams } from "./exams-medical-law-mgmt-design";
import { defenceExams, teachingExams, studyAbroadTests, otherCareerExams } from "./exams-defence-teaching-abroad";
import { sscExams, bankingExams, railwayExams, defenceRecruitment } from "./recruitment";
import { scholarships } from "./scholarships";
import { counsellingProcesses } from "./counselling";

export { filterCategories, opportunityTypeLabels, groupByCategory } from "./categories";
export type { SummaryEntryInput } from "./helpers";

/**
 * The full FriendForDoc catalogue: hand-authored "full" detail entries plus
 * the larger summary-tier catalogue, merged into one array. Every entry is
 * either genuinely verified in general terms or clearly labelled
 * "informational" / "needs_confirmation" — nothing here is a fabricated
 * placeholder used only to inflate the count.
 */
export const forms: FormRecord[] = [
  ...coreOpportunities,
  ...engineeringExams,
  ...universityExams,
  ...medicalExams,
  ...lawExams,
  ...managementExams,
  ...designExams,
  ...defenceExams,
  ...teachingExams,
  ...studyAbroadTests,
  ...otherCareerExams,
  ...sscExams,
  ...bankingExams,
  ...railwayExams,
  ...defenceRecruitment,
  ...scholarships,
  ...counsellingProcesses,
];

// Fail fast in development if a slug is accidentally duplicated.
if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const f of forms) {
    if (seen.has(f.slug)) {
      throw new Error(`Duplicate FriendForDoc catalogue slug: "${f.slug}"`);
    }
    seen.add(f.slug);
  }
}

export function getFormBySlug(slug: string): FormRecord | undefined {
  return forms.find((f) => f.slug === slug);
}

export function searchForms(query: string, category?: string): FormRecord[] {
  const q = query.trim().toLowerCase();
  return forms.filter((f) => {
    const matchesQuery =
      !q ||
      f.title.toLowerCase().includes(q) ||
      (f.shortName?.toLowerCase().includes(q) ?? false) ||
      f.description.toLowerCase().includes(q) ||
      f.authority.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.opportunityType.toLowerCase().includes(q);
    const matchesCategory = !category || category === "All" || f.category === category;
    return matchesQuery && matchesCategory;
  });
}

/** Legacy export name kept for existing components; prefer filterCategories for new UI. */
export const categories = [
  "Entrance Exam",
  "Government",
  "Scholarship",
  "Education",
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
  "Study Abroad",
  "Other Careers",
  "Counselling",
] as const;

export interface MatchReason {
  label: string;
  matched: boolean;
}

export interface FormMatch {
  form: FormRecord;
  score: number;
  reasons: MatchReason[];
}

/**
 * Suggest — never certify — opportunities that may be relevant to a
 * student profile. This is a lightweight heuristic over the catalogue's
 * tagged data, not an eligibility check.
 *
 * With a catalogue this size, education-level and stream overlap alone are
 * too common to be a useful signal on their own (most Class 12 PCM entries
 * would match every engineering exam regardless of what the student is
 * actually interested in). So at least one selected interest area must
 * match for an opportunity to appear at all; education level and stream
 * only refine the ranking within that relevant set.
 */
export function findMatchingForms(profile: {
  educationLevel: string;
  stream: string;
  interestAreas: string[];
}): FormMatch[] {
  const matches = forms.map((form) => {
    const mp = form.matchProfile;
    const reasons: MatchReason[] = [];
    let score = 0;

    const interestMatch = mp.interestAreas.some((a) =>
      profile.interestAreas.includes(a)
    );
    reasons.push({ label: "Matches an interest area you picked", matched: interestMatch });
    if (interestMatch) score += 3;

    const educationMatch =
      mp.educationLevels.includes("any") ||
      mp.educationLevels.includes(profile.educationLevel);
    reasons.push({ label: "Matches your education level", matched: educationMatch });
    if (educationMatch) score += 1;

    const streamMatch =
      mp.streams.includes("any") || mp.streams.includes(profile.stream);
    reasons.push({ label: "Matches your stream", matched: streamMatch });
    if (streamMatch) score += 1;

    return { form, score, reasons, interestMatch };
  });

  return matches
    .filter((m) => m.interestMatch)
    .sort((a, b) => b.score - a.score)
    .map(({ form, score, reasons }) => ({ form, score, reasons }));
}

export const statusLabels: Record<ApplicationStatus, string> = {
  open: "Open",
  closing_soon: "Closing soon",
  opening_soon: "Opening soon",
  closed: "Closed",
  date_not_verified: "Date not verified",
  informational: "Informational",
};
