"use client";

import Image from "next/image";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatPrice, products } from "@/lib/data";

export function CartPage() {
  const { cart, update, remove } = useStore();
  const lines = cart.map((line) => ({ ...line, product: products.find((p) => p.slug === line.slug)! })).filter((line) => line.product);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  if (!lines.length) return <div className="empty-page"><span className="eyebrow">Your bag</span><h1>Nothing here—yet.</h1><p>Your next good night might be one considered choice away.</p><Link href="/collections/all" className="button button-dark">Explore the collection</Link></div>;
  return <div className="cart-page page-shell"><header className="page-heading"><span className="eyebrow">Your selection</span><h1>Shopping bag</h1></header><div className="cart-page__grid"><div className="cart-page__lines">{lines.map(({ id, product, quantity, size, colour }) => <article key={id}><Link href={`/products/${product.slug}`} className="cart-page__image"><Image src={product.image} alt={product.name} fill sizes="160px" /></Link><div><div className="cart-page__title"><span>{product.eyebrow}</span><Link href={`/products/${product.slug}`}>{product.name}</Link><small>{colour ?? "Hotel White"} · {size ?? product.sizes?.[0] ?? "One size"}</small></div><div className="cart-page__foot"><div className="quantity-control"><button onClick={() => update(id, quantity - 1)}><MinusIcon size={14} /></button><span>{quantity}</span><button onClick={() => update(id, quantity + 1)}><PlusIcon size={14} /></button></div><button className="text-button" onClick={() => remove(id)}>Remove</button><strong>{formatPrice(product.price * quantity)}</strong></div></div></article>)}</div><aside className="order-card"><span className="eyebrow">Order summary</span><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Delivery</span><strong>{subtotal >= 3000 ? "Complimentary" : "At checkout"}</strong></div><hr /><div className="order-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div><Link href="/checkout" className="button button-dark button-full">Secure checkout</Link><p>Taxes included. You can enter a promotion code at checkout.</p></aside></div></div>;
}
