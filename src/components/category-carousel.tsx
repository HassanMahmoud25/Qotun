"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronIcon } from "@/components/icons";

type Category = {
  title: string;
  note: string;
  href: string;
  image: string;
  badge?: string;
};

type ScrollState = {
  hasOverflow: boolean;
  atStart: boolean;
  atEnd: boolean;
};

const initialScrollState: ScrollState = {
  hasOverflow: false,
  atStart: true,
  atEnd: true,
};

export function CategoryCarousel({ categories }: { categories: Category[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] =
    useState<ScrollState>(initialScrollState);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maximumScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const tolerance = 2;
    setScrollState({
      hasOverflow: maximumScroll > tolerance,
      atStart: rail.scrollLeft <= tolerance,
      atEnd: rail.scrollLeft >= maximumScroll - tolerance,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const animationFrame = window.requestAnimationFrame(updateScrollState);
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(rail);
    rail.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      rail.removeEventListener("scroll", updateScrollState);
    };
  }, [updateScrollState]);

  function scroll(direction: -1 | 1) {
    const rail = railRef.current;
    const firstCard = rail?.querySelector<HTMLElement>(".category-tile");
    if (!rail || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="section-heading reveal">
        <div>
          <span className="eyebrow">Start somewhere soft</span>
          <h2>Shop by Category</h2>
        </div>
        <div
          className={`section-arrows ${scrollState.hasOverflow ? "is-scrollable" : ""}`}
          aria-label="Category carousel controls"
        >
          <button
            type="button"
            aria-label="Previous category"
            aria-controls="category-rail"
            disabled={!scrollState.hasOverflow || scrollState.atStart}
            onClick={() => scroll(-1)}
          >
            <ChevronIcon size={28} className="rotate-180" />
          </button>

          <button
            type="button"
            aria-label="Next category"
            aria-controls="category-rail"
            disabled={!scrollState.hasOverflow || scrollState.atEnd}
            onClick={() => scroll(1)}
          >
            <ChevronIcon size={28} />
          </button>
        </div>
      </div>

      <div className="category-rail" id="category-rail" ref={railRef}>
        {categories.map((category, index) => (
          <Link
            href={category.href}
            className="category-tile reveal"
            style={{ "--delay": `${index * 55}ms` } as CSSProperties}
            key={category.title}
          >
            <div>
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 700px) 74vw, 22vw"
              />
              {category.badge && <span>{category.badge}</span>}
            </div>
            <h3>{category.title}</h3>
            <p>{category.note}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
