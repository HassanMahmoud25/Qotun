"use client";

import Image from "@/components/cdn-image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowIcon,
  CloseIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/icons";
import { formatPrice, type Product } from "@/lib/data";
import { useStore } from "@/components/store/store-context";

export function QuickViewDialog({ product }: { product: Product }) {
  const { add, isWishlisted, setQuickView, toggleWishlist } = useStore();
  const gallery = [...product.gallery, product.image].filter(
    (image, index, images) => images.indexOf(image) === index,
  );
  const sizes = product.sizes?.length ? product.sizes : ["One size"];
  const colours = [
    { name: "Hotel White", value: "#ffffff" },
    { name: "Warm Ivory", value: "#eee7dc" },
    { name: "Desert Sand", value: "#c9b9a2" },
    { name: "Quiet Sage", value: "#a8af9c" },
    { name: "Nile Blue", value: "#9aafbd" },
    { name: "Midnight", value: "#2d3858" },
  ];
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState(sizes[0]);
  const [colour, setColour] = useState(colours[0].name);
  const [quantity, setQuantity] = useState(1);
  const saved = isWishlisted(product.slug);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setQuickView(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setQuickView]);

  function addSelection() {
    setQuickView(null);
    add(product.slug, quantity, { size, colour });
  }

  const handleZoomClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
    setIsZoomed((prev) => !prev);
  };

  const handleZoomMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handlePrevious = () => {
    setIsZoomed(false);
    setImageIndex((imageIndex - 1 + gallery.length) % gallery.length);
  };

  const handleNext = () => {
    setIsZoomed(false);
    setImageIndex((imageIndex + 1) % gallery.length);
  };

  const handleSmallImgClick = (index: number) => {
    setIsZoomed(false);
    setImageIndex(index);
  };

  return (
    <motion.div
      className="quick-view-layer"
      initial="closed"
      animate="open"
      exit="closed"
    >
      <motion.button
        className="quick-view-scrim"
        onClick={() => setQuickView(null)}
        aria-label="Close quick view"
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      <motion.section
        className="quick-view"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view ${product.name}`}
        variants={{
          closed: {
            opacity: 0,
            scale: 0.97,
            x: "-50%",
            y: "calc(-50% + 28px)",
          },
          open: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
        }}
        transition={{
          type: "spring",
          stiffness: 330,
          damping: 30,
          mass: 0.82,
        }}
      >
        <button
          className="quick-view__close icon-button"
          onClick={() => setQuickView(null)}
          aria-label="Close quick view"
          autoFocus
        >
          <CloseIcon />
        </button>

        <div className="quick-view__gallery">
          <div className="quick-view__main-image">
            <motion.div
              className="quick-view__slider"
              animate={{ x: `-${imageIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {gallery.map((image, index) => (
                <div
                  key={image}
                  className={`quick-view__slide ${
                    index === imageIndex && isZoomed ? "is-zoomed" : ""
                  }`}
                  onClick={index === imageIndex ? handleZoomClick : undefined}
                  onMouseMove={
                    index === imageIndex ? handleZoomMove : undefined
                  }
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    sizes="(max-width: 800px) 100vw, 55vw"
                    priority={index === 0}
                    style={{
                      transform:
                        index === imageIndex && isZoomed
                          ? "scale(2.5)"
                          : "scale(1)",
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {gallery.length > 1 && (
              <div className="quick-view__image-controls">
                <button
                  className="quick-view__previous"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ArrowIcon size={22} />
                </button>
                <button onClick={handleNext} aria-label="Next image">
                  <ArrowIcon size={22} />
                </button>
              </div>
            )}
          </div>

          <div className="quick-view__thumbnails" aria-label="Product images">
            {gallery.slice(0, 4).map((image, index) => (
              <button
                className={imageIndex === index ? "active" : ""}
                onClick={() => handleSmallImgClick(index)}
                key={image}
                aria-label={`Show image ${index + 1}`}
              >
                <Image src={image} alt="" fill sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        <div className="quick-view__details">
          <span className="eyebrow">Qotun · {product.category}</span>
          <h2>{product.name}</h2>
          <p className="quick-view__tagline">
            {product.eyebrow}. Thoughtfully made for slower, softer moments.
          </p>
          <Link
            className="quick-view__full-link"
            href={`/products/${product.slug}`}
            onClick={() => setQuickView(null)}
          >
            Explore every detail <strong>View full page</strong>
          </Link>

          <fieldset className="quick-view__option quick-view__colours">
            <legend>
              Colour <strong>{colour}</strong>
              <small>Our calm, hotel-inspired palette.</small>
            </legend>
            <div>
              {colours.map((option) => (
                <button
                  type="button"
                  className={colour === option.name ? "active" : ""}
                  style={{ background: option.value }}
                  onClick={() => setColour(option.name)}
                  key={option.name}
                  aria-label={`Colour: ${option.name}`}
                  title={option.name}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="quick-view__option quick-view__sizes">
            <legend>
              Size <strong>{size}</strong>
            </legend>
            <div>
              {sizes.map((option) => (
                <button
                  type="button"
                  className={size === option ? "active" : ""}
                  onClick={() => setSize(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="quick-view__price">
            {product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
            <strong>{formatPrice(product.price)}</strong>
            {product.badge && <span>{product.badge}</span>}
          </div>

          <div className="quick-view__purchase">
            <button className="button button-dark" onClick={addSelection}>
              Add to bag · {formatPrice(product.price * quantity)}
            </button>
            <div className="quantity-control" aria-label="Quantity">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <MinusIcon size={15} />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <PlusIcon size={15} />
              </button>
            </div>
            <button
              className={`quick-view__save ${saved ? "saved" : ""}`}
              onClick={() => toggleWishlist(product.slug)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            >
              <HeartIcon size={23} />
            </button>
          </div>
          <div className="quick-view__privileges">
            <span aria-hidden="true">Q</span>
            <div>
              <strong>The Qotun guest treatment</strong>
              <p>
                Complimentary delivery over 3,000 EGP, attentive care, and easy
                14-day returns.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
