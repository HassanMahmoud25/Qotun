import Image from "@/components/cdn-image";
import Link from "next/link";
import { CategoryCarousel } from "@/components/category-carousel";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { editorial, products } from "@/lib/data";

const shopCategories = [
  {
    title: "All Bedding",
    note: "The foundation of better rest",
    href: "/collections/bedroom",
    image:
      "https://qotun.net/cdn/shop/collections/Unit-500TC-lifestyle-expanded.png?v=1786133185&width=1200",
  },
  {
    title: "Sheet Sets",
    note: "Crisp, cool, and smooth",
    href: "/collections/bed-sheets",
    image:
      "https://qotun.net/cdn/shop/collections/ChatGPT_Image_Aug_11_2026_06_15_36_AM.png?v=1786418971&width=1200",
  },
  {
    title: "Bundle Savings",
    note: "Everything you need, for less",
    href: "/collections/bundles",
    image:
      "https://qotun.net/cdn/shop/collections/500TC-coreplus-lifestyle.png?v=1786286507&width=1200",
    badge: "Save up to 15%",
  },
  {
    title: "Duvets & Pillows",
    note: "Cloud-soft comfort layers",
    href: "/collections/duvets",
    image:
      "https://qotun.net/cdn/shop/collections/Unit-200TC-lifestyle-pillows.jpg?v=1786118110&width=1200",
  },
  {
    title: "All Bath",
    note: "Plush everyday rituals",
    href: "/collections/bathroom",
    image:
      "https://qotun.net/cdn/shop/collections/Lifestyle.jpg?v=1786217641&width=1200",
  },
];

const spotlights = [
  {
    title: "Find Your Fabric",
    note: "Discover the cotton feel made for you",
    action: "Take the fabric quiz",
    href: "/fabric-guide",
    image: editorial.texture,
    tone: "blue",
  },
  {
    title: "Build Your Bed",
    note: "Four choices. One beautifully complete bed",
    action: "Start building",
    href: "/build-your-bed",
    image: products[0].gallery[0],
    tone: "sage",
  },
  {
    title: "Compare Your Favourites",
    note: "See every meaningful detail side by side",
    action: "Compare products",
    href: "/compare",
    image: products[0].gallery[1],
    tone: "sand",
  },
];

export function HomeTrustStrip() {
  return (
    <section className="trust-strip">
      <span>★★★★★</span>
      <strong>Thousands of better nights</strong>
      <span>100% Egyptian cotton</span>
      <span>14-day easy returns</span>
      <span>Free delivery over 3,000 EGP</span>
    </section>
  );
}

export function HomeCategories() {
  return (
    <section className="category-section section-pad">
      <CategoryCarousel categories={shopCategories} />
    </section>
  );
}

export function HomeFavourites() {
  return (
    <section className="favourites section-pad">
      <div className="section-heading reveal">
        <div>
          <span className="eyebrow">Best in bed</span>
          <h2>Most-Loved Comfort</h2>
        </div>
        <Link href="/collections/all" className="text-link">
          Shop all bestsellers <ArrowIcon size={16} />
        </Link>
      </div>
      <div className="product-grid product-grid--featured">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

export function HomeSpotlights() {
  return (
    <section className="spotlight-section section-pad">
      <div className="section-heading reveal">
        <div>
          <span className="eyebrow">Choose with confidence</span>
          <h2>Find Your Way to Better Sleep</h2>
        </div>
      </div>
      <div className="spotlight-grid">
        {spotlights.map((item) => (
          <Link
            href={item.href}
            className={`spotlight-card spotlight-card--${item.tone} reveal`}
            key={item.title}
          >
            <div>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 700px) 85vw, 33vw"
              />
            </div>
            <span>{item.note}</span>
            <h3>{item.title}</h3>
            <b>
              {item.action} <ArrowIcon size={16} />
            </b>
          </Link>
        ))}
      </div>
    </section>
  );
}

const reviews = [
  [
    "Like sleeping on a cloud",
    "“The first night felt like checking into my favourite hotel—except I got to stay home.”",
    "Mariam A.",
    "Verified buyer · Cairo",
  ],
  [
    "Now I get it",
    "“I never understood what good sheets could change. They’re cool, crisp, and somehow softer every wash.”",
    "Omar K.",
    "Verified buyer · Giza",
  ],
  [
    "Bath time, upgraded",
    "“Thick without feeling heavy and genuinely more absorbent than my old hotel towels.”",
    "Nour S.",
    "Verified buyer · Alexandria",
  ],
];

export function HomeReviews() {
  return (
    <section className="reviews-section section-pad">
      <div className="reviews-heading reveal">
        <span className="review-stars">★★★★★</span>
        <h2>Good sleep speaks for itself.</h2>
        <p>Real notes from people who made room for better comfort.</p>
      </div>
      <div className="review-grid">
        {reviews.map(([title, quote, name, detail]) => (
          <article className="reveal" key={title}>
            <span>{title}</span>
            <blockquote>{quote}</blockquote>
            <div>
              <strong>{name}</strong>
              <small>{detail}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const pillars = [
  [
    "Premium materials",
    "100% Egyptian cotton, chosen for the right feel—not just a bigger number.",
  ],
  [
    "Hotel-tested quality",
    "Made to stay soft, strong, and beautiful through real life and repeat washing.",
  ],
  [
    "Happiness, handled",
    "Easy 14-day returns, attentive care, and a one-year manufacturing warranty.",
  ],
];

export function HomeBrandIntro() {
  return (
    <section className="brand-intro section-pad reveal">
      <span className="eyebrow">Why Qotun?</span>
      <h2>
        Really good linens.
        <br />
        Refreshingly simple.
      </h2>
      <div className="brand-pillars">
        {pillars.map(([title, copy]) => (
          <div key={title}>
            <strong>
              <CheckIcon />
            </strong>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeBedBuilderFeature() {
  return (
    <section className="bundle-feature section-pad">
      <div className="bundle-feature__copy reveal">
        <span className="eyebrow">The Qotun sleep studio</span>
        <h2>Build a bed that feels like yours.</h2>
        <p>
          Choose your size, cotton feel, colour, and finishing pillows. We’ll
          bring every layer together into one beautifully considered bed.
        </p>
        <Link href="/build-your-bed" className="button button-dark">
          Build your bed
        </Link>
      </div>
      <Link href="/build-your-bed" className="bundle-feature__image reveal">
        <Image
          src={products[0].gallery[0]}
          alt="Luxe Essential Bundle in a serene bedroom"
          fill
          sizes="(max-width: 800px) 100vw, 55vw"
        />
        <span>
          Enter the Qotun sleep studio <ArrowIcon />
        </span>
      </Link>
    </section>
  );
}

export function HomeHospitalityBanner() {
  return (
    <section className="hospitality-banner">
      <Image
        src={editorial.room}
        alt="An elevated Qotun bedroom interior"
        fill
        sizes="100vw"
      />
      <div className="hospitality-banner__overlay" />
      <div className="reveal">
        <span className="eyebrow eyebrow--light">Qotun Hospitality</span>
        <h2>Comfort guests remember.</h2>
        <p>
          Flexible linen solutions for boutique hotels, serviced apartments, and
          spas.
        </p>
        <Link href="/pages/partner-with-qotun" className="button button-light">
          Partner with Qotun
        </Link>
      </div>
    </section>
  );
}
