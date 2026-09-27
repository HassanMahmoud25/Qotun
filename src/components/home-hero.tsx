"use client";

import Image from "@/components/cdn-image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    type: "image" as const,
    src: "https://qotun.net/cdn/shop/files/banner1.jpg?v=1785100909&width=2560",
    alt: "A serene bedroom dressed in crisp white Qotun linens",
    eyebrow: "The house of Egyptian cotton",
    title: "The ritual of exceptional rest.",
    body: "Rare comfort, composed in Cairo from long-staple Egyptian cotton for the most private room in your home.",
    href: "/collections/bedroom",
    action: "Explore the collection",
  },
  {
    type: "image" as const,
    src: "https://qotun.net/cdn/shop/files/Unit-500TC-lifestyle-U03.jpg?v=1786090924&width=2560",
    alt: "Qotun 500 thread count bedding in warm natural light",
    eyebrow: "The signature 500 collection",
    title: "Quiet luxury, woven into every night.",
    body: "A luminous sateen woven from long-staple cotton, tailored to soften beautifully with time.",
    href: "/collections/bed-sheets",
    action: "Discover Signature 500",
  },
  {
    type: "image" as const,
    src: "https://qotun.net/cdn/shop/collections/Lifestyle.jpg?v=1786217641&width=2560",
    alt: "A stack of white Egyptian cotton towels in a sunlit bathroom",
    eyebrow: "The bath collection",
    title: "Everyday rituals, exceptionally soft.",
    body: "Plush Egyptian cotton towels bring lasting softness, generous weight, and quiet refinement to the bath.",
    href: "/collections/bathroom",
    action: "Explore the bath collection",
  },
  // {
  //   type: "video" as const,
  //   src: "https://www.brooklinen.com/cdn/shop/videos/c/vp/b3faa0fde0ed4113b2e8cbe4d4329b4e/b3faa0fde0ed4113b2e8cbe4d4329b4e.HD-1080p-7.2Mbps-90384934.mp4?v=0",
  //   poster: "https://www.brooklinen.com/cdn/shop/files/preview_images/b3faa0fde0ed4113b2e8cbe4d4329b4e.thumbnail.0000000000_1100x.jpg?v=1785450680",
  //   alt: "Soft bedding moving in natural light",
  //   eyebrow: "The everyday ritual",
  //   title: "Make room for better rest.",
  //   body: "Considered comfort for slower mornings, earlier nights, and every quiet moment between.",
  //   href: "/collections/bundles",
  //   action: "Build your sanctuary",
  // },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && !reduceMotion)
        void video.play().catch(() => undefined);
      else video.pause();
    });
    if (reduceMotion) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearTimeout(timer);
  }, [active]);

  function show(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section
      className="home-hero"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      {slides.map((slide, index) => (
        <article
          className={`home-hero-slide ${index === active ? "is-active" : ""}`}
          aria-hidden={index !== active}
          key={slide.title}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
          />

          {/* {slide.type === "image" ? (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="100vw"
            />
          ) : (
            <video
              ref={(node) => {
                videos.current[index] = node;
              }}
              muted
              loop
              playsInline
              preload="metadata"
              poster={slide.poster}
              aria-label={slide.alt}
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          )} */}
          <div className="home-hero__wash" />
          <div className="home-hero__content">
            <span className="eyebrow eyebrow--light">{slide.eyebrow}</span>
            {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
            <p>{slide.body}</p>
            <div className="hero-actions">
              <Link className="button button-light" href={slide.href}>
                {slide.action}
              </Link>
              <Link
                className="button button-outline-light"
                href="/collections/bundles"
              >
                Enter the sleep studio
              </Link>
            </div>
          </div>
        </article>
      ))}
      <div className="hero-controls">
        <div role="tablist" aria-label="Choose a hero slide">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => show(index)}
              aria-label={`Show ${slide.title}`}
              aria-selected={index === active}
              role="tab"
              key={slide.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
