import { Category, DocumentItem, FormRecord, MatchProfile, OpportunityType } from "../types";

const GENERIC_DOCUMENTS: DocumentItem[] = [
  { id: "id-proof", label: "Government-issued ID proof", required: true },
  { id: "photo", label: "Recent passport-size photograph", required: true },
  { id: "signature", label: "Signature scan", required: true },
  { id: "education-certificates", label: "Relevant educational certificates", required: true },
  { id: "category-certificate", label: "Category / reservation certificate, if applicable", required: false },
];

const GENERIC_PHOTO_NOTE = [
  "Exact photo format, size and dimension rules vary by opportunity — this entry doesn't have them hand-verified yet.",
  "Use the Document Checker to inspect your photo's technical details before applying.",
];

const GENERIC_SIGNATURE_NOTE = [
  "Exact signature format rules vary by opportunity — this entry doesn't have them hand-verified yet.",
  "A clear scan on plain white paper is accepted by most Indian application portals.",
];

const GENERIC_MISTAKES = [
  "Applying with details that don't match your official ID exactly.",
  "Missing the correction window if one is offered.",
  "Uploading a photo or signature that doesn't meet the exact official specification.",
];

export interface SummaryEntryInput {
  slug: string;
  title: string;
  shortName?: string;
  authority: string;
  opportunityType: OpportunityType;
  category: Category;
  description: string;
  whoIsItFor?: string;
  eligibility: string[];
  officialUrl?: string;
  informationSource?: string;
  matchProfile: MatchProfile;
  feeNote?: string;
  verificationStatus?: "verified" | "informational" | "needs_confirmation";
  statusDetail?: string;
  examPattern?: string[];
  subjects?: string[];
  associatedExams?: string[];
  registrationSeparateFromExam?: boolean;
}

/**
 * Builds a "summary" tier catalogue entry: accurate top-level facts (name,
 * authority, category, general eligibility, official source where
 * confident) plus clearly-labelled generic guidance for the deep-detail
 * sections we haven't hand-authored per opportunity. This keeps the larger
 * catalogue honest instead of inventing specifics to fill every field.
 */
export function summaryEntry(input: SummaryEntryInput): FormRecord {
  return {
    slug: input.slug,
    title: input.title,
    shortName: input.shortName,
    authority: input.authority,
    opportunityType: input.opportunityType,
    category: input.category,
    description: input.description,
    longDescription: input.description,
    whoIsItFor: input.whoIsItFor,
    eligibility: input.eligibility,
    documents: GENERIC_DOCUMENTS,
    photoRequirements: GENERIC_PHOTO_NOTE,
    signatureRequirements: GENERIC_SIGNATURE_NOTE,
    examPattern: input.examPattern,
    subjects: input.subjects,
    importantDates: [
      {
        label: "Application window",
        verified: false,
        note: "Check the official notification for current dates.",
      },
    ],
    fee: input.feeNote ?? "Fee varies and is revised periodically — check the official notification for the current amount.",
    commonMistakes: GENERIC_MISTAKES,
    officialUrl: input.officialUrl,
    informationSource: input.informationSource,
    lastVerified: "General information only — confirm specifics on the official website.",
    verificationStatus: input.verificationStatus ?? "informational",
    glossary: [],
    applicationStatus: "date_not_verified",
    statusDetail: input.statusDetail ?? "Date not verified — check the official notification for the current window.",
    matchProfile: input.matchProfile,
    detailLevel: "summary",
    associatedExams: input.associatedExams,
    registrationSeparateFromExam: input.registrationSeparateFromExam,
  };
}
