import type { Metadata } from "next";
import { ComparePage } from "@/components/compare-page";

export const metadata: Metadata = {
  title: "Compare products",
  description:
    "Compare Qotun bedding, bath linens and bundles side by side.",
};

export default function Page() {
  return <ComparePage />;
}
