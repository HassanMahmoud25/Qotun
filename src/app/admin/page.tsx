import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Command Center",
  description: "Qotun operations, commerce, and customer intelligence.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard initialSection="Overview" />;
}
