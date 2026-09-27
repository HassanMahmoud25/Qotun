"use client";

import Image from "@/components/cdn-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BagIcon, CloseIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { formatPrice, products } from "@/lib/data";
import { useStore } from "@/components/store/store-context";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, update, remove } = useStore();
  const lines = cart
    .map((line) => ({
      ...line,
      product: products.find((p) => p.slug === line.slug)!,
    }))
    .filter((line) => line.product);
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return (
    <>
      <motion.button
        aria-label="Close cart"
        className={`drawer-scrim ${cartOpen ? "is-open" : ""}`}
        onClick={() => setCartOpen(false)}
        initial={false}
        animate={{ opacity: cartOpen ? 1 : 0 }}
        transition={{ duration: cartOpen ? 0.28 : 0.2, ease: "easeOut" }}
      />
      <motion.aside
        className={`cart-drawer ${cartOpen ? "is-open" : ""}`}
        aria-hidden={!cartOpen}
        initial={false}
        animate={{ x: cartOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
      >
        <div className="cart-drawer__head">
          <div>
            <span className="eyebrow">Your selection</span>
            <h2>Shopping bag</h2>
          </div>
          <button
            className="icon-button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart__icon">
              <BagIcon size={28} />
            </span>
            <h3>Your bag is beautifully empty.</h3>
            <p>
              Explore our considered essentials and find something worth slowing
              down for.
            </p>
            <Link
              className="button button-dark"
              href="/collections/all"
              onClick={() => setCartOpen(false)}
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map(({ id, product, quantity, size, colour }) => (
                <div className="cart-line" key={id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="cart-line__image"
                    onClick={() => setCartOpen(false)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="100px"
                    />
                  </Link>
                  <div className="cart-line__body">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setCartOpen(false)}
                      >
                        {product.name}
                      </Link>
                      <span>
                        {colour ?? "Hotel White"} ·{" "}
                        {size ?? product.sizes?.[0] ?? "One size"}
                      </span>
                    </div>
                    <strong>{formatPrice(product.price * quantity)}</strong>
                    <div className="cart-line__actions">
                      <div className="quantity-control">
                        <button
                          onClick={() => update(id, quantity - 1)}
                          aria-label="Decrease"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span>{quantity}</span>
                        <button
                          onClick={() => update(id, quantity + 1)}
                          aria-label="Increase"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => remove(id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p>Shipping calculated at checkout. Free over 3,000 EGP.</p>
              <Link
                className="button button-dark button-full"
                href="/checkout"
                onClick={() => setCartOpen(false)}
              >
                Continue to checkout
              </Link>
              <Link
                className="text-link centered"
                href="/cart"
                onClick={() => setCartOpen(false)}
              >
                View bag details
              </Link>
            </div>
          </>
        )}
      </motion.aside>
    </>
  );
}
