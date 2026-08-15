export type Category =
  | "Entrance Exam"
  | "Government"
  | "Scholarship"
  | "Education";

export interface ImportantDate {
  label: string;
  value: string; // human string; "TBA" style values are allowed
  known: boolean;
}

export interface DocumentItem {
  id: string;
  label: string;
  note?: string;
  required: boolean;
}

export interface FormRecord {
  slug: string;
  title: string;
  authority: string;
  category: Category;
  description: string;
  longDescription: string;
  eligibility: string[];
  documents: DocumentItem[];
  photoRequirements: string[];
  signatureRequirements: string[];
  importantDates: ImportantDate[];
  fee: string;
  commonMistakes: string[];
  officialUrl: string;
  lastVerified: string;
  glossary: { term: string; hint: string }[];
}
