import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";

const sections = {
  orders: "Orders",
  products: "Products",
  inventory: "Inventory",
  customers: "Customers",
  marketing: "Marketing",
  fulfillment: "Fulfillment",
  "returns-cx": "Returns & CX",
  automation: "Automation",
  reports: "Reports",
} as const;

type SectionSlug = keyof typeof sections;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const title = sections[section as SectionSlug];
  return title ? { title, robots: { index: false, follow: false } } : {};
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const name = sections[section as SectionSlug];
  if (!name) notFound();
  return <AdminDashboard initialSection={name} />;
}
