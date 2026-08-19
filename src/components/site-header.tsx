"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  BagIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatPrice, products } from "@/lib/data";

type NavChild = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  feature?: { title: string; href: string; image: string };
};

const categories: NavItem[] = [
  {
    label: "Bedding",
    href: "/collections/bedroom",
    children: [
      { label: "Bed sheets", href: "/collections/bed-sheets" },
      { label: "Compare fabrics", href: "/fabric-guide" },
      { label: "Duvet covers", href: "/collections/duvet-covers" },
      { label: "Duvets & pillows", href: "/collections/duvets" },
      {
        label: "Mattress essentials",
        href: "/collections/mattresses-accessories",
      },
    ],
    feature: {
      title: "Fresh sheets, better mornings",
      href: "/collections/bed-sheets",
      image:
        "https://qotun.net/cdn/shop/collections/Unit-500TC-lifestyle-expanded.png?v=1786133185&width=1200",
    },
  },
  {
    label: "Bath",
    href: "/collections/bathroom",
    children: [
      { label: "Towels", href: "/collections/towels" },
      { label: "Robes", href: "/collections/bath-robe" },
      { label: "Bath mats", href: "/collections/bath-mat" },
    ],
    feature: {
      title: "Bring the spa home",
      href: "/collections/bathroom",
      image:
        "https://qotun.net/cdn/shop/collections/Lifestyle.jpg?v=1786217641&width=1200",
    },
  },
  {
    label: "Bundles",
    href: "/collections/bundles",
    children: [
      { label: "Sleep bundles", href: "/collections/sleep-bundles" },
      { label: "Comfort bundles", href: "/collections/comfort-bundles" },
      { label: "Bath bundles", href: "/collections/bath-bundles" },
    ],
    feature: {
      title: "Everything you need, beautifully bundled",
      href: "/collections/bundles",
      image:
        "https://qotun.net/cdn/shop/files/big-bundle-500TC-03.jpg?v=1786650587&width=1200",
    },
  },
];

const secondary = [
  { label: "Build your bed", href: "/build-your-bed" },
  { label: "Our story", href: "/pages/about" },
  { label: "Contact us", href: "/pages/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, setCartOpen } = useStore();
  const [menu, setMenu] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
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
      setSearch(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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
          onClick={() => setMenu(true)}
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
            <div className="header-nav__item" key={item.href}>
              <Link
                className={`header-nav__trigger ${pathname === item.href ? "active" : ""}`}
                href={item.href}
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
            onClick={() => setSearch(true)}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <Link
            className="icon-button desktop-only"
            href="/account"
            aria-label="Account"
          >
            <UserIcon />
          </Link>
          <button
            className="icon-button bag-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Bag with ${count} items`}
          >
            <BagIcon />
            <span>{count}</span>
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menu ? "is-open" : ""} bg-red-600 p-100`}
        aria-hidden={!menu}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="mobile-menu__head">
          <Link
            href="/"
            className="mobile-menu__logo"
            aria-label="Qotun home"
            onClick={closeMenu}
          >
            <Image
              src="https://qotun.net/cdn/shop/files/Qotun_logo-02_1.png?height=144&v=1785079707"
              alt="Qotun"
              width={244}
              height={72}
            />
          </Link>
          <button
            className="icon-button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          {categories.map((item) => {
            const expanded = openSection === item.label;
            return (
              <div className="mobile-nav-group" key={item.href}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpenSection(expanded ? null : item.label)}
                >
                  {item.label}
                  <span aria-hidden="true">+</span>
                </button>
                <div className={`mobile-submenu ${expanded ? "is-open" : ""}`}>
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMenu}
                    >
                      {child.label}
                    </Link>
                  ))}
                  <Link
                    className="mobile-submenu__all"
                    href={item.href}
                    onClick={closeMenu}
                  >
                    Shop all {item.label.toLowerCase()}
                  </Link>
                </div>
              </div>
            );
          })}
          {secondary.map((item) => (
            <Link
              className="mobile-nav-direct"
              key={item.href}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__foot">
          <Link href="/account" onClick={closeMenu}>
            My account
          </Link>
          <Link href="/pages/contact" onClick={closeMenu}>
            Contact
          </Link>
          <Link href="/collections/all" onClick={closeMenu}>
            Shop all
          </Link>
        </div>
      </div>

      <div
        className={`search-overlay ${search ? "is-open" : ""}`}
        aria-hidden={!search}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onMouseDown={() => setSearch(false)}
      >
        <div
          className="search-panel"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="search-panel__head">
            <h2>Search</h2>
            <button
              className="icon-button"
              type="button"
              onClick={() => setSearch(false)}
              aria-label="Close search"
            >
              <CloseIcon size={22} />
            </button>
          </div>
          <form onSubmit={submit} role="search">
            <div className="search-field">
              <button
                className="search-field__submit"
                aria-label="Submit search"
              >
                <SearchIcon size={21} />
              </button>
              <input
                key={search ? "search-open" : "search-closed"}
                autoFocus={search}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Qotun..."
                aria-label="Search products"
              />
              <button
                className="search-field__close"
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                hidden={!query}
              >
                <CloseIcon size={21} />
              </button>
            </div>
            <div className="predictive-search" aria-live="polite">
              <div className="predictive-search__title">
                <span>{normalizedQuery ? "Products" : "Popular products"}</span>
                {normalizedQuery && (
                  <small>
                    {searchResults.length}{" "}
                    {searchResults.length === 1 ? "result" : "results"}
                  </small>
                )}
              </div>
              {searchResults.length ? (
                <div className="predictive-search__products">
                  {searchResults.map((product) => (
                    <Link
                      className="predictive-product"
                      href={`/products/${product.slug}`}
                      key={product.slug}
                      onClick={() => setSearch(false)}
                    >
                      <span className="predictive-product__image">
                        <Image src={product.image} alt="" fill sizes="96px" />
                      </span>
                      <span className="predictive-product__copy">
                        <strong>{product.name}</strong>
                        <small>
                          {product.category} · {product.subcategory}
                        </small>
                        <span>
                          {formatPrice(product.price)}
                          {product.compareAt && (
                            <del>{formatPrice(product.compareAt)}</del>
                          )}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="predictive-search__empty">
                  <strong>No products found</strong>
                  <p>
                    Try a broader term such as sheets, towels, pillows, or
                    bundles.
                  </p>
                </div>
              )}
              {normalizedQuery && (
                <button className="predictive-search__all" type="submit">
                  View all results for “{query.trim()}”
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
