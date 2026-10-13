import { Suspense } from "react";
import ReadyClient from "./ReadyClient";

export const metadata = {
  title: "Am I Ready? — FriendForDoc",
};

export default function ReadyPage() {
  return (
    <Suspense fallback={null}>
      <ReadyClient />
    </Suspense>
  );
}
