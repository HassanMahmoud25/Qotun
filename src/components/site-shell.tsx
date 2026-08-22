"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MobileTabBar } from "@/components/mobile-tab-bar";

function AccountHeader() {
  return (
    <header className="account-header">
      <Link href="/" className="account-header__logo" aria-label="Qotun home">
        <Image
          src="https://qotun.net/cdn/shop/files/Qotun_logo-02_1.png?height=144&v=1785079707"
          alt="Qotun"
          width={244}
          height={72}
          priority
        />
      </Link>
      <div>
        <span>Already part of Qotun?</span>
        <Link href="/account">Sign in</Link>
      </div>
    </header>
  );
}

function AccountFooter() {
  return (
    <footer className="account-footer">
      <div>
        <strong>Need a little help?</strong>
        <Link href="/pages/contact">Speak with Qotun care</Link>
      </div>
      <nav aria-label="Account policies">
        <Link href="/pages/terms-conditions">Terms</Link>
        <Link href="/pages/return-policy">Returns</Link>
        <Link href="/pages/delivery-policy">Delivery</Link>
      </nav>
      <span>© 2026 Qotun · Cairo, Egypt</span>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const focusedAccount = pathname === "/account/create";
  const focusedCheckout = pathname === "/checkout";

  if (focusedAccount) {
    return (
      <>
        <AccountHeader />
        {children}
        <AccountFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      {!focusedCheckout && <MobileTabBar />}
    </>
  );
}
