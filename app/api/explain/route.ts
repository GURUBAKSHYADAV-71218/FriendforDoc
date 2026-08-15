import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a short, friendly helper inside "FriendForDoc", a student-facing
website about applications and forms. A student has tapped "Explain with AI"
next to a confusing term or requirement.

Rules:
- Explain ONLY what the term/requirement generally means, in simple, plain,
  student-friendly language (assume the reader is a teenager applying for
  something for the first time).
- Keep it to 2-4 short sentences. No headings, no markdown, no bullet lists.
- Never invent specific dates, fees, eligibility numbers, or official rules
  for any exam or scheme. If asked something that needs an official figure,
  say the student should check the official notification for the exact
  number.
- Do not claim to represent any government body or exam authority.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const term: string = (body?.term ?? "").toString().slice(0, 200);
    const context: string = (body?.context ?? "").toString().slice(0, 500);

    if (!term.trim()) {
      return NextResponse.json({ error: "Missing term" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        explanation: fallbackExplanation(term, context),
        source: "fallback",
      });
    }

    const userPrompt = context
      ? `Explain this term for a student: "${term}". Extra context from the page: ${context}`
      : `Explain this term for a student: "${term}"`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 250,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        explanation: fallbackExplanation(term, context),
        source: "fallback",
      });
    }

    const data = await response.json();
    const text = data?.content
      ?.filter((block: { type: string }) => block.type === "text")
      ?.map((block: { text: string }) => block.text)
      ?.join(" ")
      ?.trim();

    if (!text) {
      return NextResponse.json({
        explanation: fallbackExplanation(term, context),
        source: "fallback",
      });
    }

    return NextResponse.json({ explanation: text, source: "ai" });
  } catch {
    return NextResponse.json({
      explanation: fallbackExplanation("this requirement"),
      source: "fallback",
    });
  }
}

function fallbackExplanation(term: string, context?: string) {
  return `We couldn't reach the AI helper just now, but in short: "${term}" is a common application requirement. ${
    context ? context + " " : ""
  }For the exact rule that applies to you, check the official notification linked on this page.`;
}
