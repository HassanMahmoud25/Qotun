import type { Metadata } from "next";
import { WishlistPage } from "@/components/wishlist-page";

export const metadata: Metadata = {
  title: "Wishlist",
  description:
    "Your saved Qotun bedding, bath linens, and considered comforts.",
};

export default function Page() {
  return (
    <main>
      <WishlistPage />
    </main>
  );
}
