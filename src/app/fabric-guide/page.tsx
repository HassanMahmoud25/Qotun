import type { Metadata } from "next";
import { FabricComparison } from "@/components/fabric-comparison";

export const metadata: Metadata = {
  title: "Fabric Guide",
  description: "Compare Qotun Balance 200TC and Luxe 500TC Egyptian cotton, understand how each feels, and find the right fabric for your sleep.",
};

export default function FabricGuidePage() {
  return <main><FabricComparison /></main>;
}
