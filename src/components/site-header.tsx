"use client";

import Image from "@/components/cdn-image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  BagIcon,
  CareIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  TagIcon,
  UserAddIcon,
  UserIcon,
} from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { products } from "@/lib/data";
import { HeaderSearch } from "@/components/header/header-search";
import { HeaderMobileMenu } from "@/components/header/header-mobile-menu";

import { categories, secondary } from "@/components/header/navigation-data";
export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, setCartOpen, wishlistCount } = useStore();
  const [menu, setMenu] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [dropdownState, setDropdownState] = useState<{
    id: string;
    pathname: string;
  } | null>(null);
  const [search, setSearch] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const openDropdown =
    dropdownState?.pathname === pathname ? dropdownState.id : null;
  const accountMenu = openDropdown === "account";
  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = products
    .filter((product) =>
      normalizedQuery
        ? `${product.name} ${product.category} ${product.subcategory} ${product.eyebrow} ${product.description}`
            .toLowerCase()
            .includes(normalizedQuery)
        : true,
    )
    .slice(0, 5);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenu(false);
      setDropdownState(null);
      setSearch(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function closeAccountMenu(event: PointerEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setDropdownState(null);
      }
    }
    document.addEventListener("pointerdown", closeAccountMenu);
    return () => document.removeEventListener("pointerdown", closeAccountMenu);
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSearch(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function closeMenu() {
    setMenu(false);
    setOpenSection(null);
  }

  return (
    <>
      <div className="announcement">
        <span>Complimentary delivery over 3,000 EGP</span>
        <span className="announcement__dot" />
        <span>10% off your first order — QOTUN10</span>
      </div>
      <header className="site-header">
        <button
          className="icon-button mobile-only header-menu-button"
          onClick={() => {
            setMenu(true);
            setDropdownState(null);
          }}
          aria-label="Open menu"
          aria-expanded={menu}
        >
          <MenuIcon />
        </button>

        <nav
          className="header-nav header-nav--left"
          aria-label="Shop categories"
        >
          {categories.map((item) => (
            <div
              className={`header-nav__item ${openDropdown === item.href ? "is-open" : ""}`}
              key={item.href}
              onMouseEnter={() => {
                setDropdownState({ id: item.href, pathname });
              }}
              onMouseLeave={() => setDropdownState(null)}
              onFocusCapture={() => {
                setDropdownState({ id: item.href, pathname });
              }}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setDropdownState(null);
                }
              }}
            >
              <Link
                className={`header-nav__trigger ${pathname === item.href ? "active" : ""}`}
                href={item.href}
                aria-expanded={openDropdown === item.href}
                aria-haspopup="true"
              >
                <span>{item.label}</span>
                <span aria-hidden="true">
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>

              <div className="mega-menu">
                <div className="mega-menu__links">
                  <span className="eyebrow">{item.label}</span>
                  {item.children?.map((child) => (
                    <Link key={child.href} href={child.href}>
                      {child.label}
                    </Link>
                  ))}
                  <Link className="mega-menu__all" href={item.href}>
                    Shop all {item.label.toLowerCase()}
                  </Link>
                </div>
                {item.feature && (
                  <Link className="mega-menu__feature" href={item.feature.href}>
                    <Image src={item.feature.image} alt="" fill sizes="55vw" />
                    <span>{item.feature.title}</span>
                  </Link>
                )}
                <Link
                  className="mega-menu__feature mega-menu__feature--secondary"
                  href="/collections/bundles"
                >
                  <Image
                    src="https://qotun.net/cdn/shop/collections/500TC-coreplus-lifestyle.png?v=1786286507&width=1200"
                    alt=""
                    fill
                    sizes="28vw"
                  />
                  <span>Save with curated bundles</span>
                </Link>
              </div>
            </div>
          ))}
          {secondary.map((item) => (
            <Link
              key={item.href}
              className={`header-nav__story ${pathname === item.href ? "active" : ""}`}
              href={item.href}
            >
              <span className="text-[14px]">{item.label}</span>
            </Link>
          ))}
        </nav>

        <Link href="/" className="brand-logo" aria-label="Qotun home">
          <Image
            src="https://qotun.net/cdn/shop/files/Qotun_logo-02_1.png?height=144&v=1785079707"
            alt="Qotun"
            width={244}
            height={72}
            priority
          />
        </Link>

        <div className="header-actions">
          <button
            className="header-search-trigger"
            onClick={() => {
              setSearch(true);
              setDropdownState(null);
            }}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <div
            className={`account-menu ${accountMenu ? "is-open" : ""}`}
            ref={accountMenuRef}
          >
            <button
              className="icon-button account-menu__trigger"
              type="button"
              aria-label="Account menu"
              aria-expanded={accountMenu}
              aria-haspopup="menu"
              onClick={() => {
                setDropdownState(
                  accountMenu ? null : { id: "account", pathname },
                );
              }}
            >
              <UserIcon />
            </button>
            <div className="account-menu__panel" role="menu">
              <Link
                className="account-menu__offer"
                href="/account/create?offer=welcome"
                role="menuitem"
                onClick={() => setDropdownState(null)}
              >
                <TagIcon size={20} />
                <span>
                  <strong>Claim your welcome</strong>
                  <small>10% off your first order</small>
                </span>
              </Link>
              <div className="account-menu__divider" />
              <Link
                href="/account/create"
                role="menuitem"
                onClick={() => setDropdownState(null)}
              >
                <UserAddIcon size={21} />
                <span>Create account</span>
              </Link>
              <Link
                href="/account"
                role="menuitem"
                onClick={() => setDropdownState(null)}
              >
                <UserIcon size={21} />
                <span>Sign in</span>
              </Link>
              <Link
                href="/wishlist"
                role="menuitem"
                onClick={() => setDropdownState(null)}
              >
                <HeartIcon size={21} />
                <span>Wishlist</span>
                {wishlistCount > 0 && <small>{wishlistCount}</small>}
              </Link>
              <Link
                href="/pages/contact"
                role="menuitem"
                onClick={() => setDropdownState(null)}
              >
                <CareIcon size={21} />
                <span>Contact & care</span>
              </Link>
            </div>
          </div>
          <button
            className="icon-button bag-button header-count"
            onClick={() => setCartOpen(true)}
            aria-label={`Bag with ${count} items`}
          >
            <BagIcon />
            <span>{count}</span>
          </button>
        </div>
      </header>

      <HeaderMobileMenu
        open={menu}
        openSection={openSection}
        wishlistCount={wishlistCount}
        onSectionChange={setOpenSection}
        onClose={closeMenu}
      />
      <HeaderSearch
        open={search}
        query={query}
        normalizedQuery={normalizedQuery}
        results={searchResults}
        onQueryChange={setQuery}
        onClose={() => setSearch(false)}
        onSubmit={submit}
      />
    </>
  );
}
