export const EDUCATION_LEVELS = [
  { value: "class-10", label: "Class 10 or below" },
  { value: "class-12", label: "Class 11 / 12" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate / Postgraduate" },
  { value: "any", label: "Any / not sure" },
] as const;

export const STREAMS = [
  { value: "science-pcb", label: "Science (PCB)" },
  { value: "science-pcm", label: "Science (PCM)" },
  { value: "commerce", label: "Commerce" },
  { value: "arts", label: "Arts / Humanities" },
  { value: "any", label: "Any / not applicable" },
] as const;

export const INTEREST_AREAS = [
  { value: "engineering", label: "Engineering" },
  { value: "medical", label: "Medical & health sciences" },
  { value: "general-admission", label: "General college admission" },
  { value: "law", label: "Law" },
  { value: "management", label: "Management / business" },
  { value: "design", label: "Design & architecture" },
  { value: "defence", label: "Defence" },
  { value: "civil-services", label: "Government / civil services" },
  { value: "banking", label: "Banking & finance" },
  { value: "railways", label: "Railways" },
  { value: "teaching", label: "Teaching & academic" },
  { value: "scholarship", label: "Financial aid / scholarship" },
  { value: "study-abroad", label: "Study abroad" },
  { value: "government-id", label: "Government ID / documents" },
  { value: "other-careers", label: "Other careers (maritime, aviation, etc.)" },
] as const;

export type EducationLevelValue = (typeof EDUCATION_LEVELS)[number]["value"];
export type StreamValue = (typeof STREAMS)[number]["value"];
export type InterestAreaValue = (typeof INTEREST_AREAS)[number]["value"];
