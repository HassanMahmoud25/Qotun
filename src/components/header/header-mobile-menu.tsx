"use client";

import Image from "@/components/cdn-image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/icons";
import { categories, secondary } from "@/components/header/navigation-data";

export function HeaderMobileMenu({
  open,
  openSection,
  wishlistCount,
  onSectionChange,
  onClose,
}: {
  open: boolean;
  openSection: string | null;
  wishlistCount: number;
  onSectionChange: (section: string | null) => void;
  onClose: () => void;
}) {
  const menu = open;
  const setOpenSection = onSectionChange;
  const closeMenu = onClose;
  return (
    <AnimatePresence onExitComplete={() => setOpenSection(null)}>
      {menu && (
        <motion.div
          className="mobile-menu is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial="closed"
          animate="open"
          exit="closed"
          variants={{
            closed: {
              x: "-100%",
              transition: {
                duration: 0.38,
                ease: [0.4, 0, 1, 1],
                staggerChildren: 0.025,
                staggerDirection: -1,
              },
            },
            open: {
              x: "0%",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 32,
                mass: 0.9,
                staggerChildren: 0.035,
                delayChildren: 0.08,
              },
            },
          }}
        >
          <motion.div
            className="mobile-menu__head"
            variants={{
              closed: { opacity: 0, x: -14 },
              open: { opacity: 1, x: 0 },
            }}
          >
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
          </motion.div>

          <motion.nav
            aria-label="Mobile navigation"
            variants={{
              closed: { opacity: 0, x: -20 },
              open: { opacity: 1, x: 0 },
            }}
          >
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
                  <div
                    className={`mobile-submenu ${expanded ? "is-open" : ""}`}
                  >
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
          </motion.nav>

          <motion.div
            className="mobile-menu__foot"
            variants={{
              closed: { opacity: 0, y: 10 },
              open: { opacity: 1, y: 0 },
            }}
          >
            <Link href="/wishlist" onClick={closeMenu}>
              My wishlist ({wishlistCount})
            </Link>
            <Link href="/account" onClick={closeMenu}>
              My account
            </Link>
            <Link href="/pages/contact" onClick={closeMenu}>
              Contact
            </Link>
            <Link href="/collections/all" onClick={closeMenu}>
              Shop all
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
