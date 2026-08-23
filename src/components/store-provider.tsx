"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { products, type Product } from "@/lib/data";
import {
  StoreContext,
  useStore,
  type CartLine,
  type StoreContextValue,
} from "@/components/store/store-context";
import { CompareDock } from "@/components/store/compare-dock";
import { QuickViewDialog } from "@/components/store/quick-view-dialog";
import { CartDrawer } from "@/components/store/cart-drawer";

export { useStore } from "@/components/store/store-context";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareNotice, setCompareNotice] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("qotun-cart");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Array<
            Partial<CartLine> & { slug: string; quantity: number }
          >;
          setCart(
            parsed.map((line) => ({ ...line, id: line.id ?? line.slug })),
          );
        } catch {
          /* ignore invalid local data */
        }
      }
      const savedWishlist = window.localStorage.getItem("qotun-wishlist");
      if (savedWishlist) {
        try {
          const parsed = JSON.parse(savedWishlist) as unknown;
          if (Array.isArray(parsed)) {
            setWishlist(
              parsed.filter((slug): slug is string => typeof slug === "string"),
            );
          }
        } catch {
          /* ignore invalid local data */
        }
      }
      const savedCompare = window.localStorage.getItem("qotun-compare");
      if (savedCompare) {
        try {
          const parsed = JSON.parse(savedCompare) as unknown;
          if (Array.isArray(parsed)) {
            setCompare(
              parsed
                .filter(
                  (slug, index): slug is string =>
                    typeof slug === "string" &&
                    parsed.indexOf(slug) === index &&
                    products.some((product) => product.slug === slug),
                )
                .slice(0, 4),
            );
          }
        } catch {
          /* ignore invalid local data */
        }
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem("qotun-cart", JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem("qotun-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, loaded]);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem("qotun-compare", JSON.stringify(compare));
    }
  }, [compare, loaded]);

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      count: cart.reduce((sum, item) => sum + item.quantity, 0),
      wishlist,
      wishlistCount: wishlist.length,
      cartOpen,
      setCartOpen,
      quickView,
      setQuickView,
      add(slug, quantity = 1, options = {}) {
        const id = [slug, options.size, options.colour]
          .filter(Boolean)
          .join("::");
        setCart((current) =>
          current.some((line) => line.id === id)
            ? current.map((line) =>
                line.id === id
                  ? { ...line, quantity: line.quantity + quantity }
                  : line,
              )
            : [...current, { id, slug, quantity, ...options }],
        );
        setCartOpen(true);
      },
      update(id, quantity) {
        setCart((current) =>
          current
            .map((line) => (line.id === id ? { ...line, quantity } : line))
            .filter((line) => line.quantity > 0),
        );
      },
      remove(id) {
        setCart((current) => current.filter((line) => line.id !== id));
      },
      isWishlisted(slug) {
        return wishlist.includes(slug);
      },
      toggleWishlist(slug) {
        setWishlist((current) =>
          current.includes(slug)
            ? current.filter((item) => item !== slug)
            : [...current, slug],
        );
      },
      removeFromWishlist(slug) {
        setWishlist((current) => current.filter((item) => item !== slug));
      },
      compare,
      compareLimit: 4,
      compareNotice,
      isCompared(slug) {
        return compare.includes(slug);
      },
      toggleCompare(slug) {
        setCompare((current) => {
          if (current.includes(slug)) {
            setCompareNotice(null);
            return current.filter((item) => item !== slug);
          }
          if (current.length >= 4) {
            setCompareNotice(
              "Your comparison is full. Remove one piece before adding another.",
            );
            return current;
          }
          setCompareNotice(null);
          return [...current, slug];
        });
      },
      removeFromCompare(slug) {
        setCompareNotice(null);
        setCompare((current) => current.filter((item) => item !== slug));
      },
      clearCompare() {
        setCompareNotice(null);
        setCompare([]);
      },
      dismissCompareNotice() {
        setCompareNotice(null);
      },
    }),
    [cart, cartOpen, compare, compareNotice, quickView, wishlist],
  );

  const quickViewProduct = products.find(
    (product) => product.slug === quickView,
  );

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <StoreContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        {children}
        <AnimatePresence>
          {quickViewProduct && (
            <QuickViewDialog
              key={quickViewProduct.slug}
              product={quickViewProduct}
            />
          )}
        </AnimatePresence>
        <CartDrawer />
        <CompareDock />
      </MotionConfig>
    </StoreContext.Provider>
  );
}

export function AddToCartButton({
  product,
  quantity = 1,
  className = "button button-dark",
}: {
  product: Product;
  quantity?: number;
  className?: string;
}) {
  const { add } = useStore();
  return (
    <button className={className} onClick={() => add(product.slug, quantity)}>
      Add to bag
    </button>
  );
}
