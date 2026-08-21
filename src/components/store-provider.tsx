"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowIcon,
  BagIcon,
  CloseIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/icons";
import { formatPrice, products, type Product } from "@/lib/data";

type CartOptions = { size?: string; colour?: string };
type CartLine = CartOptions & { id: string; slug: string; quantity: number };
type StoreContextValue = {
  cart: CartLine[];
  count: number;
  wishlist: string[];
  wishlistCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  quickView: string | null;
  setQuickView: (slug: string | null) => void;
  add: (slug: string, quantity?: number, options?: CartOptions) => void;
  update: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  compare: string[];
  compareLimit: number;
  compareNotice: string | null;
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  dismissCompareNotice: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
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
              parsed.filter(
                (slug): slug is string => typeof slug === "string",
              ),
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

function CompareDock() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const {
    cartOpen,
    clearCompare,
    compare,
    compareLimit,
    compareNotice,
    dismissCompareNotice,
    quickView,
    removeFromCompare,
  } = useStore();
  const selected = compare
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
  const hidden =
    !selected.length ||
    cartOpen ||
    quickView !== null ||
    pathname === "/compare" ||
    pathname.startsWith("/checkout") ||
    pathname === "/account/create";

  return (
    <AnimatePresence initial={false} mode="wait">
      {!hidden && collapsed && !compareNotice ? (
        <motion.aside
          className="compare-dock compare-dock--collapsed"
          aria-label="Product comparison"
          key="collapsed"
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="compare-dock__reopen"
            onClick={() => setCollapsed(false)}
            aria-label={`Expand comparison with ${selected.length} products`}
          >
            <span className="eyebrow">Compare pieces</span>
            <strong aria-label={`${selected.length} selected`}>
              {selected.length}
            </strong>
            <PlusIcon size={17} />
          </button>
        </motion.aside>
      ) : !hidden ? (
        <motion.aside
          className="compare-dock"
          aria-label="Product comparison"
          key="expanded"
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.985 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence initial={false}>
            {compareNotice && (
              <motion.div
                className="compare-dock__notice"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
              >
                <span>{compareNotice}</span>
                <button
                  onClick={dismissCompareNotice}
                  aria-label="Dismiss message"
                >
                  <CloseIcon size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="compare-dock__inner">
            <div className="compare-dock__intro">
              <span className="eyebrow">Compare pieces</span>
              <div>
                <strong>
                  {selected.length} of {compareLimit}
                </strong>
                <button onClick={clearCompare}>Clear</button>
                <button
                  className="compare-dock__collapse"
                  onClick={() => setCollapsed(true)}
                  aria-label="Minimize comparison"
                  title="Minimize comparison"
                >
                  <MinusIcon size={14} />
                </button>
              </div>
            </div>
            <div className="compare-dock__pieces">
              <AnimatePresence initial={false}>
                {selected.map((product) => (
                  <motion.div
                    className="compare-dock__piece"
                    key={product.slug}
                    layout
                    initial={{ opacity: 0, x: 12, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.92 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={product.image} alt="" fill sizes="54px" />
                    <span>{product.name}</span>
                    <button
                      onClick={() => removeFromCompare(product.slug)}
                      aria-label={`Remove ${product.name} from comparison`}
                    >
                      <CloseIcon size={14} />
                    </button>
                  </motion.div>
                ))}
                {Array.from({ length: compareLimit - selected.length }).map(
                  (_, index) => {
                    const position = selected.length + index;
                    return (
                      <motion.span
                        className="compare-dock__slot"
                        key={`slot-${position}`}
                        layout
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        +
                      </motion.span>
                    );
                  },
                )}
              </AnimatePresence>
            </div>
            <div className="compare-dock__actions">
              {selected.length >= 2 ? (
                <Link className="button button-light" href="/compare">
                  Compare now
                </Link>
              ) : (
                <span>Add one more piece</span>
              )}
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
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

function QuickViewDialog({ product }: { product: Product }) {
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

function CartDrawer() {
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
