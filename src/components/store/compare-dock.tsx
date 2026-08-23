"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/icons";
import { products, type Product } from "@/lib/data";
import { useStore } from "@/components/store/store-context";

export function CompareDock() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [dockedAtTop, setDockedAtTop] = useState(false);
  const {
    cartOpen,
    clearCompare,
    compare,
    compareLimit,
    compareNotice,
    dismissCompareNotice,
    quickView,
    removeFromCompare,
  } = useStore();
  const selected = compare
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
  const hidden =
    !selected.length ||
    cartOpen ||
    quickView !== null ||
    pathname === "/compare" ||
    pathname.startsWith("/checkout") ||
    pathname === "/account/create";

  return (
    <AnimatePresence initial={false} mode="wait">
      {!hidden && collapsed && !compareNotice ? (
        <motion.aside
          className={`compare-dock compare-dock--collapsed ${dockedAtTop ? "compare-dock--top" : ""}`}
          aria-label="Product comparison"
          key="collapsed"
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="compare-dock__reopen"
            onClick={() => setCollapsed(false)}
            aria-label={`Expand comparison with ${selected.length} products`}
          >
            <span className="eyebrow">Compare pieces</span>
            <strong aria-label={`${selected.length} selected`}>
              {selected.length}
            </strong>
            <PlusIcon size={17} />
          </button>
        </motion.aside>
      ) : !hidden ? (
        <motion.aside
          className={`compare-dock ${dockedAtTop ? "compare-dock--top" : ""}`}
          aria-label="Product comparison"
          key="expanded"
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.985 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence initial={false}>
            {compareNotice && (
              <motion.div
                className="compare-dock__notice"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
              >
                <span>{compareNotice}</span>
                <button
                  onClick={dismissCompareNotice}
                  aria-label="Dismiss message"
                >
                  <CloseIcon size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="compare-dock__inner">
            <div className="compare-dock__intro">
              <span className="eyebrow">Compare pieces</span>
              <div>
                <strong>
                  {selected.length} of {compareLimit}
                </strong>
                <button onClick={clearCompare}>Clear</button>
              </div>
            </div>
            <div className="compare-dock__pieces">
              <AnimatePresence initial={false}>
                {selected.map((product) => (
                  <motion.div
                    className="compare-dock__piece"
                    key={product.slug}
                    layout
                    initial={{ opacity: 0, x: 12, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.92 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={product.image} alt="" fill sizes="54px" />
                    <span>{product.name}</span>
                    <button
                      onClick={() => removeFromCompare(product.slug)}
                      aria-label={`Remove ${product.name} from comparison`}
                    >
                      <CloseIcon size={14} />
                    </button>
                  </motion.div>
                ))}
                {Array.from({ length: compareLimit - selected.length }).map(
                  (_, index) => {
                    const position = selected.length + index;
                    return (
                      <motion.span
                        className="compare-dock__slot"
                        key={`slot-${position}`}
                        layout
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        +
                      </motion.span>
                    );
                  },
                )}
              </AnimatePresence>
            </div>
            <div className="compare-dock__actions">
              {selected.length >= 2 ? (
                <Link className="button button-light" href="/compare">
                  Compare now
                </Link>
              ) : (
                <span>Add one more piece</span>
              )}
            </div>
            <div className="compare-dock__controls">
              <button
                className="compare-dock__move"
                onClick={() => setDockedAtTop((atTop) => !atTop)}
                aria-label={`Move comparison to the ${dockedAtTop ? "bottom" : "top"}`}
                title={`Move comparison to the ${dockedAtTop ? "bottom" : "top"}`}
              >
                <ChevronIcon size={14} />
              </button>
              <button
                className="compare-dock__collapse"
                onClick={() => setCollapsed(true)}
                aria-label="Minimize comparison"
                title="Minimize comparison"
              >
                <MinusIcon size={14} />
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
