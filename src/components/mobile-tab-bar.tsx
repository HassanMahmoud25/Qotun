"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BagIcon,
  BedIcon,
  HeartIcon,
  HomeIcon,
  ShopIcon,
} from "@/components/icons";
import { useStore } from "@/components/store-provider";

const tabs = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Shop", href: "/collections/all", icon: ShopIcon },
  { label: "Studio", href: "/build-your-bed", icon: BedIcon },
  { label: "Saved", href: "/wishlist", icon: HeartIcon },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { count, setCartOpen, wishlistCount } = useStore();

  return (
    <nav className="mobile-tab-bar" aria-label="Primary mobile navigation">
      <div className="mobile-tab-bar__inner">
        {tabs.map(({ label, href, icon: TabIcon }) => {
          const active =
            href === "/"
              ? pathname === href
              : label === "Shop"
                ? pathname.startsWith("/collections") ||
                  pathname.startsWith("/products")
                : pathname.startsWith(href);
          const badge = label === "Saved" ? wishlistCount : 0;

          return (
            <Link
              href={href}
              className={active ? "is-active" : ""}
              aria-current={active ? "page" : undefined}
              key={href}
            >
              <span className="mobile-tab-bar__icon">
                <TabIcon size={21} />
                {badge > 0 && <small>{badge}</small>}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
        <button type="button" onClick={() => setCartOpen(true)}>
          <span className="mobile-tab-bar__icon">
            <BagIcon size={21} />
            {count > 0 && <small>{count}</small>}
          </span>
          <span>Bag</span>
        </button>
      </div>
    </nav>
  );
}
