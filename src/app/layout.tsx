import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/site-shell";
import { StoreProvider } from "@/components/store-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://qotun.net",
  ),
  title: {
    default: "Qotun — The House of Egyptian Cotton",
    template: "%s — Qotun",
  },
  description:
    "Exceptional Egyptian cotton bedding and bath linens, composed in Cairo for the rituals of home.",
  applicationName: "Qotun",
  openGraph: {
    type: "website",
    siteName: "Qotun",
    title: "Qotun — The House of Egyptian Cotton",
    description:
      "Exceptional Egyptian cotton bedding and bath linens, composed in Cairo for the rituals of home.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qotun — The House of Egyptian Cotton",
    description:
      "Exceptional Egyptian cotton bedding and bath linens, composed in Cairo for the rituals of home.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfaf8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
