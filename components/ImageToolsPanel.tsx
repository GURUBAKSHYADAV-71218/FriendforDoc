"use client";

import { useRef, useState } from "react";
import { UploadCloud, Download, XCircle, Sliders, FileText, Loader2 } from "lucide-react";
import { compressImage, imageToPdf, formatBytes, ProcessedImage } from "@/lib/imageTools";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 10 * 1024 * 1024;

export default function ImageToolsPanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [maxDimension, setMaxDimension] = useState(800);
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");

  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [processing, setProcessing] = useState(false);

  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfProcessing, setPdfProcessing] = useState(false);

  function reset() {
    setFile(null);
    setResult(null);
    setPdfBlob(null);
    setError(null);
  }

  function handleFile(f: File | undefined) {
    setError(null);
    setResult(null);
    setPdfBlob(null);
    if (!f) return;
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Unsupported file type. Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (f.size > MAX_FILE_BYTES) {
      setError(`File is too large (${formatBytes(f.size)}). Try a file under ${formatBytes(MAX_FILE_BYTES)}.`);
      return;
    }
    setFile(f);
  }

  async function runCompress() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const processed = await compressImage(file, { maxDimension, quality, mimeType: format });
      setResult(processed);
    } catch {
      setError("Something went wrong while processing this image. Try a different file.");
    } finally {
      setProcessing(false);
    }
  }

  async function runImageToPdf() {
    if (!file) return;
    setPdfProcessing(true);
    setError(null);
    try {
      const blob = await imageToPdf(file);
      setPdfBlob(blob);
    } catch {
      setError("Something went wrong while creating the PDF. Try a different file.");
    } finally {
      setPdfProcessing(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
      <h2 className="font-display text-[19px] font-semibold text-ink">Document Tools</h2>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
        Compress, resize, or convert a photo to PDF — processed locally in your browser. Nothing is
        uploaded or stored on a server.
      </p>

      {!file && (
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
          <p className="mt-3 text-[14px] font-medium text-ink">Click to upload or drag an image here</p>
          <p className="mt-1 text-[12.5px] text-ink-faint">JPG, PNG or WEBP, up to {formatBytes(MAX_FILE_BYTES)}</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-flag-rose-100 px-3.5 py-2.5 text-[13px] text-flag-rose">
          <XCircle size={15} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {file && (
        <div className="mt-5">
          <div className="flex items-center justify-between rounded-lg bg-paper px-3.5 py-2.5 text-[13px] text-ink-soft">
            <span className="truncate">
              {file.name} · {formatBytes(file.size)}
            </span>
            <button onClick={reset} className="ml-3 shrink-0 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700">
              Change file
            </button>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {/* Compress / Resize */}
            <div className="rounded-xl border border-line p-4">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                <Sliders size={14} className="text-brand-600" /> Compress &amp; resize
              </p>

              <label className="mt-3 block text-[12px] font-medium text-ink-soft">
                Max dimension: {maxDimension}px
              </label>
              <input
                type="range"
                min={150}
                max={2000}
                step={50}
                value={maxDimension}
                onChange={(e) => setMaxDimension(Number(e.target.value))}
                className="mt-1 w-full accent-brand-600"
                aria-label="Maximum image dimension in pixels"
              />

              {format === "image/jpeg" && (
                <>
                  <label className="mt-3 block text-[12px] font-medium text-ink-soft">
                    Quality: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min={0.3}
                    max={0.95}
                    step={0.05}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="mt-1 w-full accent-brand-600"
                    aria-label="JPEG quality"
                  />
                </>
              )}

              <label className="mt-3 block text-[12px] font-medium text-ink-soft">Output format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png")}
                className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-2 text-[13px] text-ink outline-none focus:border-brand-500"
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
              </select>

              <button
                onClick={runCompress}
                disabled={processing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
              >
                {processing ? <Loader2 size={15} className="animate-spin" /> : null}
                {processing ? "Processing..." : "Compress / Resize"}
              </button>

              {result && (
                <div className="mt-4 rounded-lg bg-paper p-3">
                  <p className="text-[12.5px] text-ink-soft">
                    Before: {formatBytes(file.size)} → After: <strong className="text-ink">{formatBytes(result.sizeBytes)}</strong>
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-faint">
                    New dimensions: {result.width} × {result.height} px
                  </p>
                  <a
                    href={result.url}
                    download={`friendfordoc-${format === "image/jpeg" ? "compressed.jpg" : "compressed.png"}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <Download size={13} /> Download result
                  </a>
                </div>
              )}
            </div>

            {/* Image to PDF */}
            <div className="rounded-xl border border-line p-4">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                <FileText size={14} className="text-brand-600" /> Convert to PDF
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-faint">
                Wraps this image into a single-page PDF, sized to fit an A4 page. Useful for portals
                that ask for a PDF instead of an image.
              </p>
              <button
                onClick={runImageToPdf}
                disabled={pdfProcessing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-600 px-4 py-2.5 text-[13.5px] font-semibold text-brand-700 transition-colors hover:bg-brand-50 disabled:opacity-60"
              >
                {pdfProcessing ? <Loader2 size={15} className="animate-spin" /> : null}
                {pdfProcessing ? "Creating PDF..." : "Convert to PDF"}
              </button>

              {pdfBlob && (
                <div className="mt-4 rounded-lg bg-paper p-3">
                  <p className="text-[12.5px] text-ink-soft">PDF size: {formatBytes(pdfBlob.size)}</p>
                  <a
                    href={URL.createObjectURL(pdfBlob)}
                    download="friendfordoc-document.pdf"
                    className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <Download size={13} /> Download PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="mt-5 text-[12px] text-ink-faint">
        Everything above runs locally in your browser using the Canvas API — your file is never sent
        to a server.
      </p>
    </div>
  );
}
