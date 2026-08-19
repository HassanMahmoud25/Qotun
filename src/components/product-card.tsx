"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, HeartIcon, PlusIcon, ViewIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatPrice, type Product } from "@/lib/data";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { setQuickView } = useStore();
  const [saved, setSaved] = useState(false);
  return (
    <article
      className="product-card reveal"
      style={{ "--delay": `${(index % 4) * 70}ms` } as React.CSSProperties}
    >
      <div className="product-card__media">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
        >
          <Image
            className="product-card__image product-card__image--primary"
            src={product.image}
            alt={product.name}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="(max-width: 700px) 50vw, 25vw"
          />
          <Image
            className="product-card__image product-card__image--lifestyle"
            src={product.gallery[0] ?? product.image}
            alt={`${product.name} styled in a room`}
            fill
            sizes="(max-width: 700px) 50vw, 25vw"
            aria-hidden="true"
          />
        </Link>
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <span className="product-card__view">
          <i /> In your space
        </span>
        <button
          className={`save-button ${saved ? "saved" : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <HeartIcon size={18} />
        </button>
        <button
          className="quick-add"
          onClick={() => setQuickView(product.slug)}
          aria-label={`Quick view ${product.name}`}
        >
          <ViewIcon size={17} />
          <span>Quick view</span>
        </button>
      </div>
      <div className="product-card__body">
        <span>{product.eyebrow}</span>
        <Link href={`/products/${product.slug}`}>
          <h3>{product.name}</h3>
          <ArrowIcon size={17} />
        </Link>
        <p className="price">
          {formatPrice(product.price)}{" "}
          {product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
        </p>
        <div className="product-rating">
          <span>★★★★★</span>
          <small>({840 + index * 317})</small>
        </div>
        <div className="product-swatches" aria-label="Available colours">
          <i className="swatch-white" />
          <i className="swatch-cream" />
          <i className="swatch-sand" />
          <em>+4 colours</em>
        </div>
      </div>
    </article>
  );
}
