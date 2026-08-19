"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowIcon, HeartIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatPrice, type Product } from "@/lib/data";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useStore();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes?.[0] ?? "One size");
  const [colour, setColour] = useState("Hotel White");
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const images = [...product.gallery, product.image].filter((image, index, gallery) => gallery.indexOf(image) === index);
  const sizes = product.sizes?.length ? product.sizes : ["One size"];
  const colours = [
    { name: "Hotel White", value: "#ffffff" },
    { name: "Warm Ivory", value: "#eee7dc" },
    { name: "Desert Sand", value: "#c9b9a2" },
    { name: "Quiet Sage", value: "#a8af9c" },
    { name: "Nile Blue", value: "#9aafbd" },
    { name: "Midnight", value: "#2d3858" },
  ];

  return (
    <div className="product-detail">
      <div className="product-gallery reveal">
        <div className="product-gallery__main">
          <div className="product-gallery__slider" style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}>
            {images.map((image, index) => <div className="product-gallery__slide" key={image}><Image src={image} alt={`${product.name} view ${index + 1}`} fill loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} sizes="(max-width: 900px) 100vw, 60vw" /></div>)}
          </div>
          {images.length > 1 && <div className="product-gallery__controls"><button className="product-gallery__previous" onClick={() => setActive((active - 1 + images.length) % images.length)} aria-label="Previous image"><ArrowIcon size={22} /></button><button onClick={() => setActive((active + 1) % images.length)} aria-label="Next image"><ArrowIcon size={22} /></button></div>}
        </div>
        <div className="product-thumbs" aria-label="Product images">{images.map((image, index) => <button key={image} className={active === index ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`}><Image src={image} alt="" fill sizes="60px" /></button>)}</div>
      </div>
      <div className="product-info reveal">
        <div className="product-info__heading"><span className="eyebrow">Qotun · {product.category}</span></div>
        <h1>{product.name}</h1>
        <p className="product-info__tagline">{product.eyebrow}. Thoughtfully made for slower, softer moments.</p>
        <p className="product-lede">{product.description}</p>
        <div className="product-option product-colours"><div className="option-label"><span>Colour</span><strong>{colour}</strong><small>Our calm, hotel-inspired palette.</small></div><div>{colours.map((option) => <button key={option.name} className={colour === option.name ? "active" : ""} style={{ background: option.value }} onClick={() => setColour(option.name)} aria-label={`Colour: ${option.name}`} title={option.name} />)}</div></div>
        <div className="product-option"><div className="option-label"><span>Size</span><strong>{size}</strong></div><div className="size-grid">{sizes.map((item) => <button className={item === size ? "active" : ""} onClick={() => setSize(item)} key={item}>{item}</button>)}</div></div>
        <div className="product-info__price">{product.compareAt && <del>{formatPrice(product.compareAt)}</del>}<strong>{formatPrice(product.price)}</strong>{product.compareAt && <span>Save {Math.round((1 - product.price / product.compareAt) * 100)}%</span>}</div>
        <div className="purchase-row"><button className="button button-dark purchase-button" onClick={() => add(product.slug, quantity, { size, colour })}>Add to bag · {formatPrice(product.price * quantity)}</button><div className="quantity-control quantity-control--large" aria-label="Quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><MinusIcon size={16} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><PlusIcon size={16} /></button></div><button className={`product-detail__save ${saved ? "saved" : ""}`} onClick={() => setSaved(!saved)} aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}><HeartIcon size={23} /></button></div>
        <div className="product-privileges"><span aria-hidden="true">Q</span><div><strong>The Qotun guest treatment</strong><p>Complimentary delivery over 3,000 EGP, attentive care, a one-year manufacturing warranty, and easy 14-day returns.</p></div></div>
        <div className="product-accordions"><details open><summary>Details <PlusIcon size={17} /></summary><p>Designed by hospitality experts and made for repeat use. Every seam, closure, and proportion is considered for dependable comfort and an effortlessly polished finish.</p></details><details><summary>Material & care <PlusIcon size={17} /></summary><p>100% premium Egyptian cotton. Machine wash cool with like colours, tumble dry low, and avoid optical brighteners.</p></details><details><summary>What’s included <PlusIcon size={17} /></summary><p>{product.category === "Bundles" ? "A coordinated set as pictured. Exact contents are listed on your order confirmation." : "One complete set in your selected size and colour."}</p></details></div>
      </div>
    </div>
  );
}
