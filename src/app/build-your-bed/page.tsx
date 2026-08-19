import type { Metadata } from "next";
import { BedBuilder } from "@/components/bed-builder";

export const metadata: Metadata = {
  title: "Build Your Bed",
  description: "Create a complete Qotun bed in a few considered steps, from size and cotton feel to colour and finishing pillows.",
};

export default function BuildYourBedPage() {
  return <main><BedBuilder /></main>;
}
