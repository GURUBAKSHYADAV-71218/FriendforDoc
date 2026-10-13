// All functions here run entirely in the browser. No file is ever uploaded
// to a server — images are read and processed with the Canvas/File APIs.

export interface ImageInspection {
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  width: number;
  height: number;
  aspectRatio: number;
}

export function inspectImage(file: File): Promise<ImageInspection> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        fileName: file.name,
        fileType: file.type || "unknown",
        fileSizeBytes: file.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this file as an image."));
    };
    img.src = url;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export interface ProcessedImage {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  sizeBytes: number;
}

/**
 * Resizes (if maxDimension is smaller than the source) and re-encodes an
 * image at the given quality, entirely via <canvas>. Runs client-side.
 */
export async function compressImage(
  file: File,
  { maxDimension, quality, mimeType }: { maxDimension: number; quality: number; mimeType: "image/jpeg" | "image/png" }
): Promise<ProcessedImage> {
  const info = await inspectImage(file);
  const url = URL.createObjectURL(file);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Could not load image for processing."));
    el.src = url;
  });

  const scale = Math.min(1, maxDimension / Math.max(info.width, info.height));
  const targetWidth = Math.max(1, Math.round(info.width * scale));
  const targetHeight = Math.max(1, Math.round(info.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  URL.revokeObjectURL(url);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not encode image."))),
      mimeType,
      mimeType === "image/jpeg" ? quality : undefined
    );
  });

  return {
    blob,
    url: URL.createObjectURL(blob),
    width: targetWidth,
    height: targetHeight,
    sizeBytes: blob.size,
  };
}

/**
 * Wraps a single JPEG image in a minimal, hand-built single-page PDF —
 * entirely client-side, no external PDF library required.
 */
export async function imageToPdf(file: File): Promise<Blob> {
  const info = await inspectImage(file);
  const url = URL.createObjectURL(file);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Could not load image."));
    el.src = url;
  });

  // Re-encode as JPEG on a canvas so the PDF embed format is predictable
  // regardless of the source file type (PNG, WEBP, etc.).
  const canvas = document.createElement("canvas");
  canvas.width = info.width;
  canvas.height = info.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);

  const jpegBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not encode image."))), "image/jpeg", 0.9);
  });
  const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

  // A4 page at 72dpi, image scaled to fit with a small margin.
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const maxW = pageWidth - margin * 2;
  const maxH = pageHeight - margin * 2;
  const scale = Math.min(maxW / info.width, maxH / info.height, 1);
  const drawW = info.width * scale;
  const drawH = info.height * scale;
  const x = (pageWidth - drawW) / 2;
  const y = (pageHeight - drawH) / 2;

  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let cursor = 0;

  function pushText(text: string) {
    const bytes = encoder.encode(text);
    parts.push(bytes);
    cursor += bytes.length;
  }
  function pushBytes(bytes: Uint8Array) {
    parts.push(bytes);
    cursor += bytes.length;
  }
  function startObject(n: number) {
    offsets[n] = cursor;
  }

  pushText("%PDF-1.4\n");

  startObject(1);
  pushText("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  startObject(2);
  pushText("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");

  startObject(3);
  pushText(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /XObject << /Im0 4 0 R >> >> /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 5 0 R >>\nendobj\n`
  );

  startObject(4);
  pushText(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${info.width} /Height ${info.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  pushBytes(jpegBytes);
  pushText("\nendstream\nendobj\n");

  const content = `q ${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im0 Do Q`;
  startObject(5);
  pushText(`5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`);

  const xrefStart = cursor;
  let xref = `xref\n0 6\n0000000000 65535 f \n`;
  for (let i = 1; i <= 5; i++) {
    xref += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
  }
  pushText(xref);
  pushText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

  return new Blob(parts as BlobPart[], { type: "application/pdf" });
}
