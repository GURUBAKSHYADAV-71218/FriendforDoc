import { Suspense } from "react";
import ExploreFormsClient from "./ExploreFormsClient";

export const metadata = {
  title: "Explore Forms — FriendForDoc",
};

export default function FormsPage() {
  return (
    <Suspense fallback={null}>
      <ExploreFormsClient />
    </Suspense>
  );
}
