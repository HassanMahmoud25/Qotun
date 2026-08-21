"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowIcon, CheckIcon, CloseIcon, PlusIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatPrice, products, type Product } from "@/lib/data";
import { comparisonDetails } from "@/lib/product-comparison";

export function ComparePage() {
  const {
    add,
    clearCompare,
    compare,
    compareLimit,
    isCompared,
    removeFromCompare,
    toggleCompare,
  } = useStore();
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = compare
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
  const details = selected.map(comparisonDetails);
  const rows = useMemo(() => {
    if (!details.length) return [];
    return details[0].filter((row, rowIndex) => {
      if (!showOnlyDifferences || selected.length < 2) return true;
      return details.some(
        (productDetails) =>
          productDetails[rowIndex]?.value !== details[0][rowIndex]?.value,
      );
    });
  }, [details, selected.length, showOnlyDifferences]);
  const categories = new Set(selected.map((product) => product.category));
  const available = products.filter((product) => {
    const term = query.trim().toLowerCase();
    return (
      !isCompared(product.slug) &&
      (!term ||
        `${product.name} ${product.category} ${product.subcategory}`
          .toLowerCase()
          .includes(term))
    );
  });

  function addProduct(product: Product) {
    toggleCompare(product.slug);
    setQuery("");
    if (selected.length + 1 >= compareLimit) setPickerOpen(false);
  }

  if (!selected.length) {
    return (
      <main className="compare-page compare-page--empty">
        <section className="compare-empty">
          <span className="compare-empty__mark" aria-hidden="true">
            Q
          </span>
          <span className="eyebrow">A considered choice</span>
          <h1>Find your perfect comfort.</h1>
          <p>
            Add two to four pieces and we’ll lay out every meaningful detail—
            from feel and material to sizes and value.
          </p>
          <Link className="button button-dark" href="/collections/all">
            Explore the collection <ArrowIcon size={17} />
          </Link>
        </section>
        <section className="compare-empty__suggestions" aria-labelledby="compare-start">
          <div>
            <span className="eyebrow">A helpful place to start</span>
            <h2 id="compare-start">Most compared</h2>
          </div>
          <div>
            {products.slice(0, 3).map((product) => (
              <article key={product.slug}>
                <span className="compare-empty__image">
                  <Image src={product.image} alt={product.name} fill sizes="240px" />
                </span>
                <div>
                  <small>{product.eyebrow}</small>
                  <h3>{product.name}</h3>
                  <button onClick={() => toggleCompare(product.slug)}>
                    <PlusIcon size={15} /> Add to compare
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="compare-page">
      <header className="compare-hero">
        <div>
          <span className="eyebrow eyebrow--light">The comfort edit</span>
          <h1>Compare your favourites.</h1>
          <p>
            The details that matter, quietly arranged. Choose up to four pieces
            and find the one that feels most like home.
          </p>
        </div>
        <span className="compare-hero__count">
          <strong>{selected.length}</strong>
          <small>of {compareLimit} selected</small>
        </span>
      </header>

      <section className="compare-workspace" aria-label="Product comparison">
        {selected.length === 1 && (
          <div className="compare-guidance" role="status">
            <span aria-hidden="true">01</span>
            <p>
              A comparison is best with company. Add at least one more piece to
              reveal the differences.
            </p>
            <button onClick={() => setPickerOpen(true)}>Add another</button>
          </div>
        )}
        {categories.size > 1 && (
          <div className="compare-guidance compare-guidance--soft" role="note">
            <span aria-hidden="true">Mix</span>
            <p>
              You’re comparing across collections. Some details may naturally
              differ, but every available specification is still shown.
            </p>
          </div>
        )}

        <div className="compare-toolbar">
          <label>
            <input
              type="checkbox"
              checked={showOnlyDifferences}
              disabled={selected.length < 2}
              onChange={(event) => setShowOnlyDifferences(event.target.checked)}
            />
            <i aria-hidden="true"><CheckIcon size={13} /></i>
            Show differences only
          </label>
          <div>
            <button
              onClick={() => setPickerOpen(true)}
              disabled={selected.length >= compareLimit}
            >
              <PlusIcon size={15} /> Add a piece
            </button>
            <button onClick={clearCompare}>Clear all</button>
          </div>
        </div>

        <div className="compare-scroll">
          <div
            className="compare-grid"
            style={{ "--compare-count": selected.length } as React.CSSProperties}
          >
            <div className="compare-grid__corner">
              <span>At a glance</span>
              <small>Swipe to see every piece</small>
            </div>
            {selected.map((product) => (
              <article className="compare-product" key={product.slug}>
                <button
                  className="compare-product__remove"
                  onClick={() => removeFromCompare(product.slug)}
                  aria-label={`Remove ${product.name}`}
                >
                  <CloseIcon size={16} />
                </button>
                <Link href={`/products/${product.slug}`} className="compare-product__image">
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 58vw, 24vw" />
                  {product.badge && <span>{product.badge}</span>}
                </Link>
                <span className="eyebrow">{product.eyebrow}</span>
                <Link href={`/products/${product.slug}`}><h2>{product.name}</h2></Link>
                <p>
                  <strong>{formatPrice(product.price)}</strong>
                  {product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
                </p>
                <button className="button button-dark" onClick={() => add(product.slug)}>
                  Add to bag
                </button>
              </article>
            ))}

            {rows.map((row) => {
              const rowIndex = details[0].findIndex((detail) => detail.label === row.label);
              return (
                <div className="compare-row" key={row.label}>
                  <strong>{row.label}</strong>
                  {selected.map((product, productIndex) => (
                    <span key={product.slug}>{details[productIndex][rowIndex]?.value ?? "—"}</span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {pickerOpen && (
        <div className="compare-picker" role="dialog" aria-modal="true" aria-label="Add a product">
          <button className="compare-picker__scrim" onClick={() => setPickerOpen(false)} aria-label="Close product picker" />
          <section>
            <div className="compare-picker__head">
              <div>
                <span className="eyebrow">Complete your edit</span>
                <h2>Add a piece</h2>
              </div>
              <button onClick={() => setPickerOpen(false)} aria-label="Close product picker"><CloseIcon /></button>
            </div>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product or collection"
              aria-label="Search products to compare"
            />
            <div className="compare-picker__results">
              {available.length ? available.map((product) => (
                <button key={product.slug} onClick={() => addProduct(product)}>
                  <span><Image src={product.image} alt="" fill sizes="72px" /></span>
                  <span>
                    <small>{product.category} · {product.subcategory}</small>
                    <strong>{product.name}</strong>
                    <em>{formatPrice(product.price)}</em>
                  </span>
                  <PlusIcon size={18} />
                </button>
              )) : (
                <p>No more pieces match “{query.trim()}”. Try a broader search.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
