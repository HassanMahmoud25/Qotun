"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatPrice, products } from "@/lib/data";

export function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    setQuickView,
  } = useStore();
  const savedProducts = wishlist
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product) => product !== undefined);

  if (!savedProducts.length) {
    return (
      <div className="empty-page wishlist-empty">
        <span className="empty-page__icon" aria-hidden="true">
          <HeartIcon size={28} />
        </span>
        <span className="eyebrow">Your wishlist</span>
        <h1>A space for what you love.</h1>
        <p>
          Save considered pieces here, then return whenever the moment feels
          right.
        </p>
        <Link href="/collections/all" className="button button-dark">
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page cart-page page-shell">
      <header className="page-heading wishlist-heading">
        <div>
          <span className="eyebrow">Your considered edit</span>
          <h1>Wishlist</h1>
        </div>
        <p>
          {savedProducts.length} {savedProducts.length === 1 ? "piece" : "pieces"}{" "}
          saved for later.
        </p>
      </header>

      <div className="cart-page__grid">
        <div className="cart-page__lines wishlist-lines">
          {savedProducts.map((product) => (
            <article key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                className="cart-page__image"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="160px"
                />
              </Link>
              <div>
                <div className="cart-page__title">
                  <span>{product.eyebrow}</span>
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  <small>
                    {product.category} · {product.subcategory}
                  </small>
                </div>
                <div className="cart-page__foot wishlist-line__foot">
                  <button
                    className="button button-dark wishlist-choose"
                    onClick={() => setQuickView(product.slug)}
                  >
                    Choose options
                  </button>
                  <button
                    className="text-button"
                    onClick={() => removeFromWishlist(product.slug)}
                  >
                    Remove
                  </button>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="order-card wishlist-note">
          <span className="eyebrow">Saved with care</span>
          <h2>Your calm shortlist</h2>
          <p>
            Your wishlist is saved on this device. Choose your preferred size
            and colour when you are ready to add a piece to your bag.
          </p>
          <Link href="/collections/all" className="button button-outline button-full">
            Continue exploring
          </Link>
        </aside>
      </div>
    </div>
  );
}
