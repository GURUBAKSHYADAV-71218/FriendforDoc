import { Wrench } from "lucide-react";
import DocumentChecker from "@/components/DocumentChecker";
import ImageToolsPanel from "@/components/ImageToolsPanel";

export const metadata = {
  title: "Document Tools — FriendForDoc",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Wrench size={20} />
        </span>
        <div>
          <h1 className="font-display text-[26px] font-semibold text-ink">Document Tools</h1>
          <p className="text-[13.5px] text-ink-soft">
            Check a photo or signature, or compress, resize and convert it — all in your browser.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        <DocumentChecker />
        <ImageToolsPanel />
      </div>
    </div>
  );
}
