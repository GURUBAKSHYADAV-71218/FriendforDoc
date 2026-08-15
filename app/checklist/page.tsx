import { Suspense } from "react";
import ChecklistClient from "./ChecklistClient";

export const metadata = {
  title: "My Checklist — FriendForDoc",
};

export default function ChecklistPage() {
  return (
    <Suspense fallback={null}>
      <ChecklistClient />
    </Suspense>
  );
}
