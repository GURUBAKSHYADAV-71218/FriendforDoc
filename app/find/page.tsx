import { Compass } from "lucide-react";
import FindFormsQuiz from "@/components/FindFormsQuiz";

export const metadata = {
  title: "Find My Forms — FriendForDoc",
};

export default function FindPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Compass size={20} />
        </span>
        <div>
          <h1 className="font-display text-[26px] font-semibold text-ink">Find My Forms</h1>
          <p className="text-[13.5px] text-ink-soft">
            A short quiz to surface forms that may be relevant to you.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <FindFormsQuiz />
      </div>
    </div>
  );
}
