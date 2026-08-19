"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    type: "image" as const,
    src: "https://qotun.net/cdn/shop/files/banner1.jpg?v=1785100909&width=2560",
    alt: "A serene bedroom dressed in crisp white Qotun linens",
    eyebrow: "Hotel comfort. Made for home.",
    title: "Wake up somewhere better.",
    body: "Sleep in premium Egyptian cotton, designed by hospitality experts and made for real life.",
    href: "/collections/bedroom",
    action: "Shop bedding",
  },
  {
    type: "image" as const,
    src: "https://qotun.net/cdn/shop/files/Unit-500TC-lifestyle-U03.jpg?v=1786090924&width=2560",
    alt: "Qotun 500 thread count bedding in warm natural light",
    eyebrow: "The 500 thread count edit",
    title: "Hotel-level softness. Every night.",
    body: "Long-staple Egyptian cotton with a smooth finish that becomes softer with every wash.",
    href: "/collections/bed-sheets",
    action: "Meet the collection",
  },
  {
    type: "video" as const,
    src: "https://www.brooklinen.com/cdn/shop/videos/c/vp/b3faa0fde0ed4113b2e8cbe4d4329b4e/b3faa0fde0ed4113b2e8cbe4d4329b4e.HD-1080p-7.2Mbps-90384934.mp4?v=0",
    poster: "https://www.brooklinen.com/cdn/shop/files/preview_images/b3faa0fde0ed4113b2e8cbe4d4329b4e.thumbnail.0000000000_1100x.jpg?v=1785450680",
    alt: "Soft bedding moving in natural light",
    eyebrow: "The everyday ritual",
    title: "Make room for better rest.",
    body: "Considered comfort for slower mornings, earlier nights, and every quiet moment between.",
    href: "/collections/bundles",
    action: "Build your sanctuary",
  },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && !reduceMotion) void video.play().catch(() => undefined);
      else video.pause();
    });
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearTimeout(timer);
  }, [active]);

  function show(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section className="home-hero" aria-roledescription="carousel" aria-label="Featured collections">
      {slides.map((slide, index) => (
        <article className={`home-hero-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active} key={slide.title}>
          {slide.type === "image" ? <Image src={slide.src} alt={slide.alt} fill loading="eager" fetchPriority={index === 0 ? "high" : "auto"} sizes="100vw" /> : <video ref={(node) => { videos.current[index] = node; }} muted loop playsInline preload="metadata" poster={slide.poster} aria-label={slide.alt}><source src={slide.src} type="video/mp4" /></video>}
          <div className="home-hero__wash" />
          <div className="home-hero__content">
            <span className="eyebrow eyebrow--light">{slide.eyebrow}</span>
            {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
            <p>{slide.body}</p>
            <div className="hero-actions"><Link className="button button-light" href={slide.href}>{slide.action}</Link><Link className="button button-outline-light" href="/collections/bundles">Save with bundles</Link></div>
          </div>
        </article>
      ))}
      <div className="hero-controls">
        <div role="tablist" aria-label="Choose a hero slide">{slides.map((slide, index) => <button type="button" className={index === active ? "is-active" : ""} onClick={() => show(index)} aria-label={`Show ${slide.title}`} aria-selected={index === active} role="tab" key={slide.title} />)}</div>
      </div>
    </section>
  );
}
