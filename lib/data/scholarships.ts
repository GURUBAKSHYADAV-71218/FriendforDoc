import { FormRecord } from "../types";
import { summaryEntry } from "./helpers";

/**
 * The original National Scholarship Portal entry (slug "scholarship") lives
 * in core.ts as a "full" detail entry. These are additional distinct
 * scholarship schemes — real and hosted mainly through NSP, but with their
 * own eligibility focus, so listed separately rather than merged into one
 * generic "scholarship" bucket.
 */
export const scholarships: FormRecord[] = [
  summaryEntry({
    slug: "pm-yasasvi-scholarship",
    title: "PM YASASVI Scholarship",
    shortName: "PM YASASVI",
    authority: "Ministry of Social Justice and Empowerment",
    opportunityType: "scholarship",
    category: "Scholarship",
    description: "Central scholarship scheme (Young Achievers Scholarship Award Scheme for Vibrant India) supporting OBC, EBC and DNT students in school and college.",
    whoIsItFor: "OBC/EBC/DNT category students meeting the scheme's income and academic criteria.",
    eligibility: ["Belongs to the OBC, EBC or DNT category.", "Family income within the limit prescribed for the scheme year.", "Enrolled in a recognised school or institution for the relevant class/stage."],
    verificationStatus: "needs_confirmation",
    informationSource: "National Scholarship Portal",
    matchProfile: { educationLevels: ["class-10", "class-12", "undergraduate"], streams: ["any"], interestAreas: ["scholarship"], statesNote: "All India" },
  }),
  summaryEntry({
    slug: "csss-scholarship",
    title: "Central Sector Scheme of Scholarship (CSSS)",
    shortName: "CSSS",
    authority: "Department of Higher Education, Ministry of Education",
    opportunityType: "scholarship",
    category: "Scholarship",
    description: "Merit-based central scholarship for college/university students who scored in the top percentile of their Class 12 board exam.",
    whoIsItFor: "Class 12 pass students from low-income families with strong board exam results, now pursuing a college degree.",
    eligibility: ["Scored among the top percentile in the qualifying Class 12 board exam (threshold set each year).", "Family income within the limit prescribed for the scheme year.", "Pursuing a regular undergraduate degree."],
    informationSource: "National Scholarship Portal",
    matchProfile: { educationLevels: ["undergraduate"], streams: ["any"], interestAreas: ["scholarship"], statesNote: "All India" },
  }),
  summaryEntry({
    slug: "aicte-pragati",
    title: "AICTE Pragati Scholarship",
    shortName: "Pragati",
    authority: "All India Council for Technical Education (AICTE)",
    opportunityType: "scholarship",
    category: "Scholarship",
    description: "Scholarship for girl students pursuing a technical diploma or degree at an AICTE-approved institution.",
    whoIsItFor: "Girl students enrolled in an AICTE-approved technical diploma/degree programme.",
    eligibility: ["Female candidate enrolled in an AICTE-approved institution.", "Family income within the limit prescribed for the scheme year.", "Limited to a set number of girl students per institution/branch."],
    informationSource: "AICTE / National Scholarship Portal",
    matchProfile: { educationLevels: ["undergraduate"], streams: ["science-pcm"], interestAreas: ["scholarship", "engineering"], statesNote: "All India" },
  }),
  summaryEntry({
    slug: "aicte-saksham",
    title: "AICTE Saksham Scholarship",
    shortName: "Saksham",
    authority: "All India Council for Technical Education (AICTE)",
    opportunityType: "scholarship",
    category: "Scholarship",
    description: "Scholarship for specially-abled students pursuing a technical diploma or degree at an AICTE-approved institution.",
    whoIsItFor: "Students with a recognised disability enrolled in an AICTE-approved technical diploma/degree programme.",
    eligibility: ["Candidate with a benchmark disability as defined under the scheme.", "Enrolled in an AICTE-approved institution.", "Family income within the limit prescribed for the scheme year."],
    informationSource: "AICTE / National Scholarship Portal",
    matchProfile: { educationLevels: ["undergraduate"], streams: ["science-pcm"], interestAreas: ["scholarship", "engineering"], statesNote: "All India" },
  }),
  summaryEntry({
    slug: "post-matric-scholarship",
    title: "Post-Matric Scholarship (SC/ST/OBC/Minority)",
    shortName: "Post-Matric Scholarship",
    authority: "Respective central ministries (Social Justice, Tribal Affairs, Minority Affairs) via the National Scholarship Portal",
    opportunityType: "scholarship",
    category: "Scholarship",
    description: "Umbrella term for the central post-matric scholarship schemes supporting SC, ST, OBC and minority students after Class 10.",
    whoIsItFor: "SC/ST/OBC/minority-category students studying at Class 11 level or above.",
    eligibility: ["Belongs to the SC, ST, OBC or a notified minority community.", "Family income within the limit prescribed for the specific scheme.", "Enrolled in a recognised post-matric institution."],
    informationSource: "National Scholarship Portal",
    matchProfile: { educationLevels: ["class-12", "undergraduate", "graduate"], streams: ["any"], interestAreas: ["scholarship"], statesNote: "All India" },
  }),
  summaryEntry({
    slug: "nmms-scholarship",
    title: "National Means-cum-Merit Scholarship (NMMS)",
    shortName: "NMMS",
    authority: "Department of School Education and Literacy, Ministry of Education",
    opportunityType: "scholarship",
    category: "Scholarship",
    description: "Scholarship to prevent drop-outs at the secondary stage, for meritorious students from economically weaker sections.",
    whoIsItFor: "Class 9 students (renewed through Class 12) from economically weaker families with strong academic performance.",
    eligibility: ["Studying in Class 9 in a government/government-aided/local body school.", "Family income within the limit prescribed for the scheme year.", "Minimum marks in the qualifying selection test as prescribed by the state."],
    informationSource: "National Scholarship Portal",
    matchProfile: { educationLevels: ["class-10"], streams: ["any"], interestAreas: ["scholarship"], statesNote: "All India (state-conducted selection test)" },
  }),
];
