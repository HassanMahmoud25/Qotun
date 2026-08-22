"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpful: number;
  verified: boolean;
  recommended: boolean;
  response?: string;
};

const ratingBreakdown = [
  { rating: 5, count: 107 },
  { rating: 4, count: 15 },
  { rating: 3, count: 4 },
  { rating: 2, count: 1 },
  { rating: 1, count: 0 },
];

const featuredReviews: Review[] = [
  {
    id: "amira-h",
    author: "Amira H.",
    rating: 5,
    title: "The quality is apparent straight away",
    body: "Beautifully finished and even better in person. It feels considered rather than over-designed, and the quality has held up perfectly with regular use.",
    date: "August 14, 2026",
    helpful: 24,
    verified: true,
    recommended: true,
  },
  {
    id: "nour-a",
    author: "Nour A.",
    rating: 5,
    title: "Quiet luxury, exactly as described",
    body: "The texture, weight, and colour are all spot on. Delivery was quick and the packaging felt thoughtful. I have already ordered another for our guest room.",
    date: "August 3, 2026",
    helpful: 18,
    verified: true,
    recommended: true,
    response:
      "Thank you, Nour. We’re delighted it found a place in your guest room too.",
  },
  {
    id: "karim-m",
    author: "Karim M.",
    rating: 4,
    title: "Excellent feel and finish",
    body: "A genuinely premium piece and very comfortable from the first use. I would love to see a few more deep colour options, but the quality itself is excellent.",
    date: "July 19, 2026",
    helpful: 11,
    verified: true,
    recommended: true,
  },
  {
    id: "salma-r",
    author: "Salma R.",
    rating: 5,
    title: "Made the whole room feel more polished",
    body: "Simple, soft, and beautifully made. The sizing guidance was accurate and everything arrived exactly when promised.",
    date: "July 8, 2026",
    helpful: 8,
    verified: true,
    recommended: true,
  },
  {
    id: "dina-s",
    author: "Dina S.",
    rating: 3,
    title: "Lovely, but check the size guide",
    body: "The quality is lovely, though I needed to exchange my first size. Customer care made the exchange easy and the replacement is perfect.",
    date: "June 27, 2026",
    helpful: 14,
    verified: true,
    recommended: true,
  },
  {
    id: "omar-e",
    author: "Omar E.",
    rating: 5,
    title: "Worth the upgrade",
    body: "This has the substantial, refined feel I was looking for without feeling fussy. Very pleased with the purchase.",
    date: "June 12, 2026",
    helpful: 6,
    verified: true,
    recommended: true,
  },
];

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <span
      className="product-reviews__stars"
      aria-label={label ?? `${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={star <= Math.round(rating) ? "is-filled" : ""}
        >
          <path d="m10 1.8 2.47 5.01 5.53.8-4 3.9.95 5.51L10 14.42 5.05 17l.95-5.5-4-3.9 5.53-.8L10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({
  review,
  voted,
  onHelpful,
}: {
  review: Review;
  voted: boolean;
  onHelpful: () => void;
}) {
  const initials = review.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="product-review-card">
      <header>
        <div className="product-review-card__person">
          <span aria-hidden="true">{initials}</span>
          <div>
            <strong>{review.author}</strong>
            {review.verified && <small>✓ Verified purchaser</small>}
          </div>
        </div>
        <time>{review.date}</time>
      </header>
      <Stars rating={review.rating} />
      <h3>{review.title}</h3>
      <p>{review.body}</p>
      {review.recommended && (
        <div className="product-review-card__recommend">
          <span aria-hidden="true">✓</span> Yes, I recommend this product
        </div>
      )}
      {review.response && (
        <div className="product-review-card__response">
          <strong>Response from Qotun</strong>
          <p>{review.response}</p>
        </div>
      )}
      <footer>
        <span>Was this helpful?</span>
        <button
          type="button"
          className={voted ? "is-voted" : ""}
          onClick={onHelpful}
          aria-pressed={voted}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M7.5 17H4.8A1.8 1.8 0 0 1 3 15.2V9.8A1.8 1.8 0 0 1 4.8 8h2.7m0 9h7.1a1.8 1.8 0 0 0 1.77-1.48l.98-5.4A1.8 1.8 0 0 0 15.58 8H12l.55-2.75A1.88 1.88 0 0 0 10.7 3h-.2l-3 5v9Z" />
          </svg>
          Helpful ({review.helpful + (voted ? 1 : 0)})
        </button>
      </footer>
    </article>
  );
}

export function ProductReviews({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [visibleCount, setVisibleCount] = useState(4);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedReviews, setSavedReviews] = useState<Review[]>([]);
  const [helpfulVotes, setHelpfulVotes] = useState<Set<string>>(new Set());
  const totalReviews = ratingBreakdown.reduce((sum, item) => sum + item.count, 0);
  const average =
    ratingBreakdown.reduce(
      (sum, item) => sum + item.rating * item.count,
      0,
    ) / totalReviews;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const stored = window.localStorage.getItem(`qotun-reviews-${productSlug}`);
      if (stored) {
        const parsed = JSON.parse(stored) as Review[];
        timer = setTimeout(() => setSavedReviews(parsed), 0);
      }
    } catch {
      // Reviews still work when storage is unavailable.
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [productSlug]);

  const reviews = useMemo(() => {
    const filtered = [...savedReviews, ...featuredReviews].filter(
      (review) =>
        ratingFilter === "all" || review.rating === Number(ratingFilter),
    );

    return filtered.sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      if (sort === "helpful") return b.helpful - a.helpful;
      return Date.parse(b.date) - Date.parse(a.date);
    });
  }, [ratingFilter, savedReviews, sort]);

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newReview: Review = {
      id: `customer-${Date.now()}`,
      author: String(form.get("name")),
      rating: Number(form.get("rating")),
      title: String(form.get("title")),
      body: String(form.get("review")),
      date: new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date()),
      helpful: 0,
      verified: false,
      recommended: form.get("recommended") === "on",
    };
    const next = [newReview, ...savedReviews];
    setSavedReviews(next);
    try {
      window.localStorage.setItem(
        `qotun-reviews-${productSlug}`,
        JSON.stringify(next),
      );
    } catch {
      // Keep the submitted review for the current session.
    }
    event.currentTarget.reset();
    setSubmitted(true);
    setFormOpen(false);
    setRatingFilter("all");
    setSort("recent");
    setVisibleCount(4);
  };

  const toggleHelpful = (id: string) => {
    setHelpfulVotes((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="product-reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="product-reviews__heading">
        <div>
          <span className="eyebrow">Shared by the Qotun community</span>
          <h2 id="reviews-title">Customer reviews</h2>
          <button
            type="button"
            className="button button-dark"
            onClick={() => {
              setSubmitted(false);
              setFormOpen((open) => !open);
            }}
            aria-expanded={formOpen}
            aria-controls="review-form"
          >
            {formOpen ? "Close form" : "Write a review"}
          </button>
        </div>
      </div>

      {submitted && (
        <div className="product-reviews__success" role="status">
          <span aria-hidden="true">✓</span>
          Thank you. Your review has been added.
        </div>
      )}

      {formOpen && (
        <form className="product-review-form" id="review-form" onSubmit={submitReview}>
          <div className="product-review-form__intro">
            <span className="eyebrow">Your experience</span>
            <h3>Review {productName}</h3>
            <p>
              Help other guests choose well. Your email is used for verification
              only and will not be published.
            </p>
          </div>
          <fieldset className="product-review-form__rating">
            <legend>Overall rating</legend>
            <div>
              {[5, 4, 3, 2, 1].map((value) => (
                <label key={value}>
                  <input type="radio" name="rating" value={value} required />
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m10 1.8 2.47 5.01 5.53.8-4 3.9.95 5.51L10 14.42 5.05 17l.95-5.5-4-3.9 5.53-.8L10 1.8Z" />
                  </svg>
                  <span>{value} stars</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="product-review-form__fields">
            <label>
              Your name
              <input name="name" autoComplete="name" required maxLength={50} />
            </label>
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="is-wide">
              Review title
              <input name="title" required maxLength={90} />
            </label>
            <label className="is-wide">
              Your review
              <textarea name="review" required minLength={20} maxLength={1000} />
            </label>
          </div>
          <label className="product-review-form__recommend">
            <input type="checkbox" name="recommended" defaultChecked />
            I would recommend this product to a friend
          </label>
          <button className="button button-dark" type="submit">
            Submit review
          </button>
        </form>
      )}

      <div className="product-reviews__overview">
        <div className="product-reviews__score">
          <strong>{average.toFixed(1)}</strong>
          <div>
            <Stars rating={average} label={`${average.toFixed(1)} out of 5 stars`} />
            <b>Exceptional</b>
            <span>Based on {totalReviews + savedReviews.length} reviews</span>
            <small>98% would recommend</small>
          </div>
        </div>
        <div className="product-reviews__breakdown">
          {ratingBreakdown.map((item) => (
            <button
              type="button"
              key={item.rating}
              onClick={() => {
                setRatingFilter(String(item.rating));
                setVisibleCount(4);
              }}
              aria-label={`Show ${item.rating} star reviews`}
            >
              <span>{item.rating} star</span>
              <i>
                <b style={{ width: `${(item.count / totalReviews) * 100}%` }} />
              </i>
              <small>{item.count}</small>
            </button>
          ))}
        </div>
        <div className="product-reviews__promise">
          <span aria-hidden="true">Q</span>
          <div>
            <strong>Reviews you can trust</strong>
            <p>
              Verified purchaser labels identify reviews linked to a completed
              Qotun order. We publish constructive feedback, too.
            </p>
          </div>
        </div>
      </div>

      <div className="product-reviews__toolbar">
        <strong>
          {ratingFilter === "all"
            ? `All reviews (${totalReviews + savedReviews.length})`
            : `${ratingFilter}-star reviews (${reviews.length})`}
        </strong>
        <div>
          <label>
            <span>Rating</span>
            <select
              value={ratingFilter}
              onChange={(event) => {
                setRatingFilter(event.target.value);
                setVisibleCount(4);
              }}
            >
              <option value="all">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </label>
          <label>
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="recent">Most recent</option>
              <option value="helpful">Most helpful</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </label>
        </div>
      </div>

      <div className="product-reviews__list">
        {reviews.slice(0, visibleCount).map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            voted={helpfulVotes.has(review.id)}
            onHelpful={() => toggleHelpful(review.id)}
          />
        ))}
        {reviews.length === 0 && (
          <div className="product-reviews__empty">
            No reviews at this rating yet. Be the first to share your experience.
          </div>
        )}
      </div>
      {visibleCount < reviews.length && (
        <button
          type="button"
          className="product-reviews__more"
          onClick={() => setVisibleCount((count) => count + 2)}
        >
          Show more reviews
        </button>
      )}
    </section>
  );
}
