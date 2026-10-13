// ---------------------------------------------------------------------------
// FriendForDoc catalogue types.
//
// `FormRecord` is kept as the name for a single catalogue entry (exam,
// counselling process, scholarship, or recruitment opportunity) so existing
// components (FormCard, RequirementSection, Checklist, ReadinessQuiz, etc.)
// did not need to be renamed for V3 — only extended.
// ---------------------------------------------------------------------------

export type Category =
  | "Entrance Exam"
  | "Government"
  | "Scholarship"
  | "Education"
  | "Engineering"
  | "Medical & Health Sciences"
  | "Law"
  | "Management"
  | "Design & Architecture"
  | "Defence"
  | "Civil Services"
  | "Banking & Finance"
  | "Railways"
  | "Teaching & Academic"
  | "Study Abroad"
  | "Other Careers"
  | "Counselling";

/** What kind of opportunity this entry represents. */
export type OpportunityType = "exam" | "counselling" | "scholarship" | "recruitment" | "document";

/**
 * How confident FriendForDoc is in an entry's information.
 * - verified: name, authority and general facts checked against a reliable
 *   current source at the time of writing.
 * - informational: stable, well-established public facts (e.g. "NTA
 *   conducts JEE Main") that don't depend on a current date or cycle.
 * - needs_confirmation: included because the opportunity is genuinely real
 *   and useful to know about, but specific current-cycle details should be
 *   confirmed on the official site before relying on them.
 */
export type VerificationStatus = "verified" | "informational" | "needs_confirmation";

/**
 * A single important date. `date` is only ever set when we are confident in
 * an ISO value; otherwise it stays undefined and `note` carries guidance
 * such as "Check the official notification" instead of a guessed date.
 */
export interface ImportantDate {
  label: string;
  date?: string; // ISO 8601 (YYYY-MM-DD), only when confidently verified
  verified: boolean;
  note?: string;
}

export interface DocumentItem {
  id: string;
  label: string;
  note?: string;
  required: boolean;
}

/**
 * Deadline Radar status. Never derived from a guessed date — only ever set
 * to "open" / "closing_soon" / "opening_soon" / "closed" when the
 * underlying date is itself verified, or when a process is genuinely
 * year-round. Everything else is "date_not_verified" or "informational".
 */
export type ApplicationStatus =
  | "open"
  | "closing_soon"
  | "opening_soon"
  | "closed"
  | "date_not_verified"
  | "informational";

export interface EducationLevel {
  value: string;
  label: string;
}

/**
 * Lightweight signals used by "Find My Forms" to suggest — never certify —
 * potentially relevant opportunities. None of these fields represent
 * verified eligibility.
 */
export interface MatchProfile {
  educationLevels: string[]; // e.g. "class-12", "undergraduate", "any"
  streams: string[]; // e.g. "science-pcb", "commerce", "any"
  interestAreas: string[]; // e.g. "medical", "engineering", "scholarship"
  statesNote: string; // human-readable coverage note, e.g. "All India"
}

/**
 * How much depth this entry's detail page has. "full" entries have
 * form-specific photo/signature specs, a glossary and curated common
 * mistakes. "summary" entries carry accurate top-level facts (name,
 * authority, category, general eligibility, official source) plus clearly
 * labelled generic guidance for sections we haven't hand-authored yet —
 * rather than inventing specifics to fill every field.
 */
export type DetailLevel = "full" | "summary";

export interface FormRecord {
  slug: string;
  title: string;
  shortName?: string; // common abbreviation, e.g. "JEE Main"
  authority: string;
  opportunityType: OpportunityType;
  category: Category;
  description: string;
  longDescription: string;
  whoIsItFor?: string;
  eligibility: string[];
  documents: DocumentItem[];
  photoRequirements: string[];
  signatureRequirements: string[];
  examPattern?: string[];
  subjects?: string[];
  importantDates: ImportantDate[];
  fee: string;
  commonMistakes: string[];
  /** Omitted (not guessed) when we are not confident in the current URL. */
  officialUrl?: string;
  informationSource?: string;
  lastVerified: string;
  verificationStatus: VerificationStatus;
  glossary: { term: string; hint: string }[];
  /** Deadline Radar status — never derived from a guessed date. */
  applicationStatus: ApplicationStatus;
  statusDetail: string;
  matchProfile: MatchProfile;
  detailLevel: DetailLevel;
  /** For counselling entries: which exams typically feed into it. */
  associatedExams?: string[];
  /** For counselling entries: whether registering is separate from the exam. */
  registrationSeparateFromExam?: boolean;
}
