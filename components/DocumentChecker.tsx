"use client";

import { useRef, useState } from "react";
import { UploadCloud, CheckCircle2, TriangleAlert, XCircle, Image as ImageIcon } from "lucide-react";
import { inspectImage, formatBytes, ImageInspection } from "@/lib/imageTools";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB — generous local ceiling, not an official limit
const RECOMMENDED_MAX_BYTES = 200 * 1024; // common photo/signature limit on many portals

type Check = { label: string; pass: boolean; note: string };

export default function DocumentChecker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState<ImageInspection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File | undefined) {
    setError(null);
    setInfo(null);
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Unsupported file type. Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError(`File is too large to check here (${formatBytes(file.size)}). Try a file under ${formatBytes(MAX_FILE_BYTES)}.`);
      return;
    }

    try {
      const inspected = await inspectImage(file);
      setInfo(inspected);
    } catch {
      setError("We couldn't read this file. It may be corrupted or in an unsupported format.");
    }
  }

  const checks: Check[] = info
    ? [
        {
          label: `${info.fileType.split("/")[1]?.toUpperCase() ?? "Unknown"} format`,
          pass: ACCEPTED_TYPES.includes(info.fileType),
          note: "Most portals accept JPG or PNG.",
        },
        {
          label: `File size: ${formatBytes(info.fileSizeBytes)}`,
          pass: info.fileSizeBytes <= RECOMMENDED_MAX_BYTES,
          note: `Many forms ask for under ${formatBytes(RECOMMENDED_MAX_BYTES)} — check the specific form page.`,
        },
        {
          label: `Dimensions: ${info.width} × ${info.height} px`,
          pass: info.width >= 100 && info.height >= 100,
          note: "Exact pixel requirements vary by form — this only flags unusually small images.",
        },
      ]
    : [];

  const allPass = checks.length > 0 && checks.every((c) => c.pass);

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
      <h2 className="font-display text-[19px] font-semibold text-ink">Document Checker</h2>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
        Upload a photo or signature scan for a quick technical check. This runs entirely in your
        browser — the file is never uploaded to a server.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragOver ? "border-brand-500 bg-brand-50" : "border-line bg-paper hover:border-brand-300"
        }`}
      >
        <UploadCloud size={26} className="text-brand-600" />
        <p className="mt-3 text-[14px] font-medium text-ink">Click to upload or drag a file here</p>
        <p className="mt-1 text-[12.5px] text-ink-faint">JPG, PNG or WEBP, up to {formatBytes(MAX_FILE_BYTES)}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-flag-rose-100 px-3.5 py-2.5 text-[13px] text-flag-rose">
          <XCircle size={15} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {info && (
        <div className="mt-5 rounded-xl border border-line bg-paper p-5">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
            <ImageIcon size={13} /> Technical check — {info.fileName}
          </div>
          <ul className="mt-3 space-y-2">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2.5 text-[14px] text-ink">
                {c.pass ? (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-clip-teal" />
                ) : (
                  <TriangleAlert size={16} className="mt-0.5 shrink-0 text-stamp-amber" />
                )}
                <span>
                  {c.label}
                  <span className="block text-[12px] text-ink-faint">{c.note}</span>
                </span>
              </li>
            ))}
          </ul>

          <div
            className={`mt-4 rounded-lg px-3.5 py-2.5 text-[13.5px] font-semibold ${
              allPass ? "bg-clip-teal-100 text-clip-teal" : "bg-stamp-amber-100 text-stamp-amber"
            }`}
          >
            Status: {allPass ? "Ready to use (technical check only)" : "Needs attention"}
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
            This is only a <strong>technical check</strong> (format, size, dimensions) — not an{" "}
            <strong>official requirement</strong> confirmation. Always match the exact specification on
            the form&apos;s official page before submitting.
          </p>
        </div>
      )}
    </div>
  );
}
