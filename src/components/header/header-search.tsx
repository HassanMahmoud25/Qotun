"use client";

import Image from "@/components/cdn-image";
import Link from "next/link";
import type { FormEvent } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { formatPrice, type Product } from "@/lib/data";

export function HeaderSearch({
  open,
  query,
  normalizedQuery,
  results,
  onQueryChange,
  onClose,
  onSubmit,
}: {
  open: boolean;
  query: string;
  normalizedQuery: string;
  results: Product[];
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}) {
  const search = open;
  const setSearch = (value: boolean) => {
    if (!value) onClose();
  };
  const setQuery = onQueryChange;
  const searchResults = results;
  const submit = onSubmit;
  return (
    <div
      className={`search-overlay ${search ? "is-open" : ""}`}
      aria-hidden={!search}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onMouseDown={() => setSearch(false)}
    >
      <div
        className="search-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-panel__head">
          <h2>Search</h2>
          <button
            className="icon-button"
            type="button"
            onClick={() => setSearch(false)}
            aria-label="Close search"
          >
            <CloseIcon size={22} />
          </button>
        </div>
        <form onSubmit={submit} role="search">
          <div className="search-field">
            <button className="search-field__submit" aria-label="Submit search">
              <SearchIcon size={21} />
            </button>
            <input
              key={search ? "search-open" : "search-closed"}
              autoFocus={search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Qotun..."
              aria-label="Search products"
            />
            <button
              className="search-field__close"
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              hidden={!query}
            >
              <CloseIcon size={21} />
            </button>
          </div>
          <div className="predictive-search" aria-live="polite">
            <div className="predictive-search__title">
              <span>{normalizedQuery ? "Products" : "Popular products"}</span>
              {normalizedQuery && (
                <small>
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "result" : "results"}
                </small>
              )}
            </div>
            {searchResults.length ? (
              <div className="predictive-search__products">
                {searchResults.map((product) => (
                  <Link
                    className="predictive-product"
                    href={`/products/${product.slug}`}
                    key={product.slug}
                    onClick={() => setSearch(false)}
                  >
                    <span className="predictive-product__image">
                      <Image src={product.image} alt="" fill sizes="96px" />
                    </span>
                    <span className="predictive-product__copy">
                      <strong>{product.name}</strong>
                      <small>
                        {product.category} · {product.subcategory}
                      </small>
                      <span>
                        {formatPrice(product.price)}
                        {product.compareAt && (
                          <del>{formatPrice(product.compareAt)}</del>
                        )}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="predictive-search__empty">
                <strong>No products found</strong>
                <p>
                  Try a broader term such as sheets, towels, pillows, or
                  bundles.
                </p>
              </div>
            )}
            {normalizedQuery && (
              <button className="predictive-search__all" type="submit">
                View all results for “{query.trim()}”
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
