import { FormRecord } from "./types";

export interface ReadinessQuestion {
  id: string;
  label: string;
  helpText?: string;
  weight: number;
}

/**
 * Builds "Am I Ready?" questions directly from a form's existing data
 * (documents, photo/signature requirements, eligibility) instead of a
 * separate hand-authored question bank. Keeps one source of truth.
 */
export function buildReadinessQuestions(form: FormRecord): ReadinessQuestion[] {
  const questions: ReadinessQuestion[] = [];

  questions.push({
    id: "basic-details",
    label: "Are your basic details ready (full name, date of birth, address) exactly as they appear on your ID?",
    helpText: "Mismatched details are one of the most common reasons applications get rejected or delayed.",
    weight: 1,
  });

  questions.push({
    id: "eligibility-checked",
    label: "Have you read and checked the eligibility criteria for this application?",
    helpText: "FriendForDoc summarises eligibility, but only you can confirm you personally meet it.",
    weight: 1,
  });

  for (const doc of form.documents) {
    questions.push({
      id: `doc-${doc.id}`,
      label: doc.required
        ? `Do you have: ${doc.label}?`
        : `Do you have (if applicable): ${doc.label}?`,
      helpText: doc.note,
      weight: doc.required ? 1.5 : 0.75,
    });
  }

  if (form.photoRequirements.length > 0) {
    questions.push({
      id: "photo-ready",
      label: "Is your photograph ready in the required format?",
      helpText: form.photoRequirements[0],
      weight: 1,
    });
  }

  if (form.signatureRequirements.length > 0) {
    questions.push({
      id: "signature-ready",
      label: "Is your signature scan ready in the required format?",
      helpText: form.signatureRequirements[0],
      weight: 1,
    });
  }

  return questions;
}

export interface ReadinessResult {
  percent: number;
  ready: ReadinessQuestion[];
  needsAttention: ReadinessQuestion[];
  recommendation: string;
}

export function scoreReadiness(
  questions: ReadinessQuestion[],
  answers: Record<string, boolean>
): ReadinessResult {
  const totalWeight = questions.reduce((sum, q) => sum + q.weight, 0) || 1;
  const readyWeight = questions
    .filter((q) => answers[q.id])
    .reduce((sum, q) => sum + q.weight, 0);

  const percent = Math.round((readyWeight / totalWeight) * 100);
  const ready = questions.filter((q) => answers[q.id]);
  const needsAttention = questions.filter((q) => !answers[q.id]);

  let recommendation: string;
  if (percent === 100) {
    recommendation =
      "You look ready. Do a final check against the official website before you submit.";
  } else if (percent >= 70) {
    const next = needsAttention[0];
    recommendation = next
      ? `You are almost ready. Prepare "${shorten(next.label)}" before you start the application.`
      : "You are almost ready. Review the remaining items before you start.";
  } else if (percent >= 40) {
    recommendation =
      "You have made a start. A few important items still need attention before applying.";
  } else {
    recommendation =
      "You are early in preparation. Work through the checklist below before starting the application.";
  }

  return { percent, ready, needsAttention, recommendation };
}

function shorten(label: string): string {
  const cleaned = label.replace(/^Do you have( \(if applicable\))?: /, "").replace(/\?$/, "");
  return cleaned.length > 60 ? cleaned.slice(0, 57) + "..." : cleaned;
}
