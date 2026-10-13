// FriendForDoc's catalogue now lives in lib/data/ (see lib/data/index.ts for
// the merge and lib/data/{core,exams-*,recruitment,scholarships,counselling}
// for the source entries). This file re-exports the same API that existing
// components already import from "@/lib/forms", so nothing else had to
// change for the V3 catalogue expansion.
export * from "./data";
