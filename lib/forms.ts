import { FormRecord } from "./types";

const VERIFY = "Check the latest official notification.";

export const forms: FormRecord[] = [
  {
    slug: "neet",
    title: "NEET (UG)",
    authority: "National Testing Agency (NTA)",
    category: "Entrance Exam",
    description: "National entrance test for MBBS, BDS and other medical courses.",
    longDescription:
      "NEET (UG) is the single entrance exam for undergraduate medical, dental, and AYUSH courses at institutions across India. Scores are used by central and state counselling bodies to allot seats.",
    eligibility: [
      "Completed or appearing in Class 12 with Physics, Chemistry and Biology/Biotechnology.",
      "Minimum aggregate marks in qualifying subjects as prescribed by NTA for your category.",
      "Age criteria as specified in the official information bulletin for the exam year.",
    ],
    documents: [
      { id: "d1", label: "Class 10 certificate (for date of birth proof)", required: true },
      { id: "d2", label: "Class 12 marksheet or admit card (appearing candidates)", required: true },
      { id: "d3", label: "Passport-size photograph (postcard size for exam day)", required: true },
      { id: "d4", label: "Signature scan", required: true },
      { id: "d5", label: "Category certificate (SC/ST/OBC/EWS/PwD, where applicable)", required: false, note: "Only if claiming reservation" },
      { id: "d6", label: "Valid photo ID for exam day", required: true },
    ],
    photoRequirements: [
      "Recent passport-size colour photograph, plain light background.",
      "No cap, goggles, or dark glasses; borderless photograph preferred.",
      "A separate postcard-size photograph is usually required to carry on exam day — check the current information bulletin for exact size.",
    ],
    signatureRequirements: [
      "Signature in running handwriting on white paper, scanned in black ink.",
      "Same signature style should be used consistently on the form and admit card.",
    ],
    importantDates: [
      { label: "Application opens", value: VERIFY, known: false },
      { label: "Last date to apply", value: VERIFY, known: false },
      { label: "Correction window", value: VERIFY, known: false },
      { label: "Exam date", value: VERIFY, known: false },
    ],
    fee: "Fee varies by category (General/OBC/SC/ST/PwD) and is revised each year — confirm the exact amount in the current information bulletin.",
    commonMistakes: [
      "Name spelling not matching Class 10 certificate exactly.",
      "Uploading a photo with a coloured or busy background.",
      "Choosing the wrong exam city preference and being unable to change it later.",
      "Entering an incorrect category or sub-category, affecting fee and eligibility checks.",
    ],
    officialUrl: "https://neet.nta.nic.in",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "Information bulletin", hint: "The official rulebook PDF published for each exam cycle with exact rules, dates and formats." },
      { term: "Postcard-size photo", hint: "A slightly larger photo print, distinct from the passport-size photo, often needed only for exam day." },
    ],
  },
  {
    slug: "jee-main",
    title: "JEE Main",
    authority: "National Testing Agency (NTA)",
    category: "Entrance Exam",
    description: "National entrance exam for admission to NITs, IIITs and other engineering colleges, and a qualifier for JEE Advanced.",
    longDescription:
      "JEE Main is conducted in multiple sessions and is used both for admission to centrally funded technical institutes and as the qualifying stage for JEE Advanced (the IIT entrance exam).",
    eligibility: [
      "Completed or appearing in Class 12 with Physics, Chemistry/Biology/Biotechnology and Mathematics as prescribed.",
      "No fixed upper age limit for most recent cycles, but confirm the current rule for your exam year.",
      "Limited number of attempts across consecutive years as specified by NTA.",
    ],
    documents: [
      { id: "d1", label: "Class 10 certificate (date of birth proof)", required: true },
      { id: "d2", label: "Class 12 marksheet or admit card (appearing candidates)", required: true },
      { id: "d3", label: "Recent passport-size photograph", required: true },
      { id: "d4", label: "Signature scan", required: true },
      { id: "d5", label: "Category / PwD certificate, where applicable", required: false },
    ],
    photoRequirements: [
      "Recent colour photograph with plain light background, face clearly visible.",
      "File size and dimension limits are set each cycle — check the current information bulletin.",
    ],
    signatureRequirements: [
      "Scanned signature in black or blue ink on white paper.",
      "Avoid signing in block/capital letters unless that is your usual signature style.",
    ],
    importantDates: [
      { label: "Session 1 registration", value: VERIFY, known: false },
      { label: "Session 2 registration", value: VERIFY, known: false },
      { label: "Correction window", value: VERIFY, known: false },
      { label: "Exam dates", value: VERIFY, known: false },
    ],
    fee: "Fee differs by category and by number of exam session/subject choices — confirm the exact slab in the current bulletin.",
    commonMistakes: [
      "Selecting the wrong exam session or paper (BE/B.Tech vs B.Arch/B.Planning).",
      "Photograph older than the accepted timeframe.",
      "Mismatched name across Aadhaar and Class 10 certificate.",
      "Missing the correction window for a genuine data entry error.",
    ],
    officialUrl: "https://jeemain.nta.nic.in",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "Session", hint: "JEE Main is usually held in more than one session each year; your best score across attempted sessions is considered." },
      { term: "Correction window", hint: "A short period after registration closes where candidates can fix certain fields in their submitted form." },
    ],
  },
  {
    slug: "cuet",
    title: "CUET (UG)",
    authority: "National Testing Agency (NTA)",
    category: "Entrance Exam",
    description: "Common university entrance test for undergraduate admission to central and participating universities.",
    longDescription:
      "CUET (UG) is used by central universities and many state/private/deemed universities for undergraduate admissions, replacing individual entrance tests at many institutions.",
    eligibility: [
      "Passed or appearing in Class 12 from a recognised board.",
      "Specific subject combinations depend on the course and university you plan to apply to.",
    ],
    documents: [
      { id: "d1", label: "Class 10 certificate (date of birth proof)", required: true },
      { id: "d2", label: "Class 12 marksheet or admit card (appearing candidates)", required: true },
      { id: "d3", label: "Passport-size photograph", required: true },
      { id: "d4", label: "Signature scan", required: true },
      { id: "d5", label: "Category certificate, where applicable", required: false },
    ],
    photoRequirements: [
      "Recent colour passport-size photo, plain background, taken within the last few months.",
      "Follow the exact pixel dimension and file-size limits from the current bulletin.",
    ],
    signatureRequirements: [
      "Clear scanned signature on plain white paper.",
      "Keep the signature consistent across CUET and the universities you apply to.",
    ],
    importantDates: [
      { label: "Application opens", value: VERIFY, known: false },
      { label: "Last date to apply", value: VERIFY, known: false },
      { label: "Exam window", value: VERIFY, known: false },
    ],
    fee: "Fee depends on the number of subjects/test papers chosen and category — confirm current slabs officially.",
    commonMistakes: [
      "Choosing subject combinations that don't match the target course's requirement.",
      "Not checking each target university's separate CUET-based admission process.",
      "Photo/signature file exceeding the size limit and being rejected on upload.",
    ],
    officialUrl: "https://cuet.nta.nic.in",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "Test paper", hint: "Each subject you're tested on in CUET is called a test paper; universities specify which combinations they accept." },
    ],
  },
  {
    slug: "scholarship",
    title: "National Scholarship (NSP)",
    authority: "National Scholarship Portal / Ministry concerned",
    category: "Scholarship",
    description: "Central government scholarship scheme for eligible school and college students.",
    longDescription:
      "The National Scholarship Portal is a common platform hosting multiple central and state scholarship schemes for pre-matric, post-matric and higher-education students, based on income, category and merit criteria that vary by scheme.",
    eligibility: [
      "Enrolled in a recognised school/college/university for the current academic year.",
      "Family income within the limit prescribed by the specific scheme.",
      "Category or merit conditions vary by scheme — check the scheme-specific eligibility page.",
    ],
    documents: [
      { id: "d1", label: "Aadhaar card", required: true },
      { id: "d2", label: "Income certificate", required: true },
      { id: "d3", label: "Previous year marksheet", required: true },
      { id: "d4", label: "Bank passbook (Aadhaar-linked account)", required: true },
      { id: "d5", label: "Caste/category certificate, where applicable", required: false },
      { id: "d6", label: "Bonafide/institution verification certificate", required: true },
    ],
    photoRequirements: [
      "Recent passport-size photo, usually under a small file-size limit (often under 200KB) — confirm on the portal.",
    ],
    signatureRequirements: [
      "Scanned signature, typically under a small file-size limit — confirm the exact limit on the portal.",
    ],
    importantDates: [
      { label: "Portal opens for the academic year", value: VERIFY, known: false },
      { label: "Student registration deadline", value: VERIFY, known: false },
      { label: "Institution verification deadline", value: VERIFY, known: false },
    ],
    fee: "No application fee for most NSP schemes.",
    commonMistakes: [
      "Bank account not linked to Aadhaar, causing disbursal failure.",
      "Applying under the wrong scheme for your course level.",
      "Institution not verifying the application before the deadline.",
      "Income certificate older than the accepted validity period.",
    ],
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "Institution verification", hint: "After you submit, your school/college must confirm your details online before the scholarship is processed." },
    ],
  },
  {
    slug: "pan-card",
    title: "PAN Card",
    authority: "Income Tax Department (via NSDL/UTIITSL portals)",
    category: "Government",
    description: "Permanent Account Number — a unique ID for tax and financial transactions.",
    longDescription:
      "PAN (Permanent Account Number) is a ten-character identifier issued by the Income Tax Department, required for filing taxes, opening bank accounts, and many financial transactions above prescribed limits.",
    eligibility: [
      "Any Indian citizen, including minors (through a guardian), can apply.",
      "Foreign nationals and entities can apply through the applicable NRI/foreign form.",
    ],
    documents: [
      { id: "d1", label: "Proof of identity (Aadhaar, passport, voter ID, etc.)", required: true },
      { id: "d2", label: "Proof of address", required: true },
      { id: "d3", label: "Proof of date of birth", required: true },
      { id: "d4", label: "Passport-size photograph (for physical/paper applications)", required: false, note: "Only needed for certain application modes" },
    ],
    photoRequirements: [
      "Recent colour photograph, plain background, if applying through a mode that requires a physical photo.",
      "For e-KYC/paperless modes, a photo may be captured digitally instead.",
    ],
    signatureRequirements: [
      "Signature within the box provided on the form; for minors, the guardian signs.",
      "Signature should not overlap the photograph.",
    ],
    importantDates: [
      { label: "Applications", value: "Accepted year-round", known: true },
      { label: "Typical processing time", value: VERIFY, known: false },
    ],
    fee: "A processing fee applies and differs for Indian communication addresses vs foreign addresses — confirm the current fee on the portal you apply through.",
    commonMistakes: [
      "Name format not matching supporting documents (initials vs full name).",
      "Address proof document that has expired or is not in the accepted list.",
      "Using an old photograph that doesn't meet the current specification.",
      "Applying for a duplicate PAN instead of a correction, which can cause penalties.",
    ],
    officialUrl: "https://www.protean-tinpan.com",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "e-KYC", hint: "A paperless verification process using Aadhaar-linked details instead of uploading scanned documents." },
      { term: "Proof of address", hint: "A government-recognised document showing your current residential address, such as a utility bill or Aadhaar." },
    ],
  },
  {
    slug: "driving-licence",
    title: "Driving Licence",
    authority: "State Transport Department (via Parivahan/Sarathi)",
    category: "Government",
    description: "Learner's and permanent driving licence application for two-wheelers and light motor vehicles.",
    longDescription:
      "A driving licence is issued by your state's transport department, usually starting with a Learner's Licence (LL) followed by a driving test for the permanent licence, both processed through the Parivahan/Sarathi portal.",
    eligibility: [
      "Minimum age applies depending on vehicle class (typically 18 for LMV, lower with conditions for gearless two-wheelers).",
      "Must pass the online learner's test before applying for the permanent licence.",
      "Basic medical fitness declaration; a certificate may be required for certain vehicle classes or ages.",
    ],
    documents: [
      { id: "d1", label: "Proof of age", required: true },
      { id: "d2", label: "Proof of address", required: true },
      { id: "d3", label: "Passport-size photograph", required: true },
      { id: "d4", label: "Signature scan", required: true },
      { id: "d5", label: "Medical certificate (Form 1/1A), where applicable", required: false },
      { id: "d6", label: "Learner's licence number (for permanent licence application)", required: true },
    ],
    photoRequirements: [
      "Recent passport-size colour photograph, plain background.",
      "Follow the exact pixel/file-size limits on the state Parivahan portal.",
    ],
    signatureRequirements: [
      "Clear scanned signature; some RTOs also capture a live signature at the office.",
    ],
    importantDates: [
      { label: "Learner's licence validity", value: VERIFY, known: false },
      { label: "Driving test slot", value: "Booked online after LL issue", known: true },
    ],
    fee: "Fees differ by state and licence type — confirm current amounts on your state's Parivahan/Sarathi page.",
    commonMistakes: [
      "Booking a driving test slot before the mandatory waiting period after the learner's licence.",
      "Address proof not matching the RTO jurisdiction you're applying under.",
      "Missing the medical certificate where the age or vehicle class requires one.",
      "Arriving for the test without the original documents used during application.",
    ],
    officialUrl: "https://parivahan.gov.in",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "RTO", hint: "Regional Transport Office — the local authority that processes and issues your licence." },
      { term: "Learner's Licence (LL)", hint: "A temporary licence you must hold for a minimum period before taking the test for a permanent licence." },
    ],
  },
  {
    slug: "college-admission",
    title: "College Admission (UG Counselling)",
    authority: "University / State Counselling Authority",
    category: "Education",
    description: "General undergraduate admission and seat-allotment counselling process.",
    longDescription:
      "Most undergraduate admissions in India run through a centralised or university-level counselling process: registration, document verification, choice filling, seat allotment and reporting. Exact steps vary by institution and state.",
    eligibility: [
      "Qualifying marks in the relevant board exam or entrance test as prescribed by the institution.",
      "Domicile or category-based reservation rules vary by state and institution.",
    ],
    documents: [
      { id: "d1", label: "Class 10 and Class 12 marksheets", required: true },
      { id: "d2", label: "Entrance exam scorecard, if applicable", required: false },
      { id: "d3", label: "Transfer/migration certificate", required: true },
      { id: "d4", label: "Passport-size photographs", required: true },
      { id: "d5", label: "Category/income certificate, where applicable", required: false },
      { id: "d6", label: "Domicile certificate, where applicable", required: false },
    ],
    photoRequirements: [
      "Recent passport-size photographs, count and format vary by institution — check the specific admission brochure.",
    ],
    signatureRequirements: [
      "Signature on the admission form and, in most cases, a physical signature during document verification.",
    ],
    importantDates: [
      { label: "Registration window", value: VERIFY, known: false },
      { label: "Seat allotment rounds", value: VERIFY, known: false },
      { label: "Reporting deadline", value: VERIFY, known: false },
    ],
    fee: "Registration and seat-acceptance fees vary widely by institution — check the specific admission brochure.",
    commonMistakes: [
      "Missing the reporting deadline after seat allotment, leading to seat cancellation.",
      "Incomplete document set at verification, especially the transfer certificate.",
      "Not locking in a choice-filling preference order carefully before the round closes.",
    ],
    officialUrl: "https://www.ugc.gov.in",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "Choice filling", hint: "Ranking your preferred college and course combinations before seats are allotted algorithmically." },
      { term: "Reporting", hint: "Physically or online confirming your seat after allotment, usually with a fee and documents, within a fixed deadline." },
    ],
  },
  {
    slug: "upsc-cse",
    title: "UPSC Civil Services Exam",
    authority: "Union Public Service Commission (UPSC)",
    category: "Government",
    description: "National civil services exam for IAS, IPS, IFS and other central services.",
    longDescription:
      "The Civil Services Examination is conducted in three stages — Preliminary, Main, and Interview — and is one of the most competitive recruitment exams in the country, run by UPSC.",
    eligibility: [
      "Bachelor's degree from a recognised university (or final-year appearing, per current rules).",
      "Age limits and number of attempts vary by category — check the current notification.",
      "Indian citizenship (with specific provisions for a few services).",
    ],
    documents: [
      { id: "d1", label: "Educational certificates (degree/provisional certificate)", required: true },
      { id: "d2", label: "Photo ID proof", required: true },
      { id: "d3", label: "Passport-size photograph", required: true },
      { id: "d4", label: "Signature scan", required: true },
      { id: "d5", label: "Category/PwBD certificate, where applicable", required: false },
    ],
    photoRequirements: [
      "Recent colour photograph meeting UPSC's exact pixel and file-size specification.",
      "Photo should be recent (commonly within the last few months) — confirm the exact window in the notification.",
    ],
    signatureRequirements: [
      "Signature scanned per UPSC's format; must be consistent across Prelims, Mains and the interview stage.",
    ],
    importantDates: [
      { label: "Notification release", value: VERIFY, known: false },
      { label: "Preliminary exam", value: VERIFY, known: false },
      { label: "Main exam", value: VERIFY, known: false },
    ],
    fee: "Fee differs by category, with exemptions for some categories — confirm the current amount in the notification.",
    commonMistakes: [
      "Filling the Detailed Application Form (DAF) carelessly, causing issues at the interview stage.",
      "Missing the narrow correction window for Prelims applications.",
      "Inconsistent personal details between the application and educational certificates.",
      "Not tracking the limited number of permitted attempts for your category.",
    ],
    officialUrl: "https://upsc.gov.in",
    lastVerified: "Sample data — verify on the official website",
    glossary: [
      { term: "DAF", hint: "Detailed Application Form — filled after clearing Prelims, with your service and cadre preferences." },
      { term: "PwBD", hint: "Persons with Benchmark Disabilities — a category with specific reservation and relaxation provisions." },
    ],
  },
];

export function getFormBySlug(slug: string): FormRecord | undefined {
  return forms.find((f) => f.slug === slug);
}

export function searchForms(query: string, category?: string): FormRecord[] {
  const q = query.trim().toLowerCase();
  return forms.filter((f) => {
    const matchesQuery =
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.authority.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q);
    const matchesCategory = !category || category === "All" || f.category === category;
    return matchesQuery && matchesCategory;
  });
}

export const categories = ["Entrance Exam", "Government", "Scholarship", "Education"] as const;
