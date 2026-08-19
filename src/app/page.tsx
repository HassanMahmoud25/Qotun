import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { HomeHero } from "@/components/home-hero";
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
    title: "The Hotel Bed Edit",
    note: "The complete five-star setup",
    href: "/products/luxe-essential-bed-bundle",
    image: products[0].gallery[0],
    tone: "blue",
  },
  {
    title: "Find Your Fabric",
    note: "200TC or 500TC? Meet your match",
    href: "/fabric-guide",
    image: editorial.texture,
    tone: "sage",
  },
  {
    title: "The Bath Reset",
    note: "Towels worth lingering in",
    href: "/collections/bathroom",
    image: products[2].gallery[0],
    tone: "sand",
  },
];

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      <section className="trust-strip">
        <span>★★★★★</span>
        <strong>Thousands of better nights</strong>
        <span>100% Egyptian cotton</span>
        <span>14-day easy returns</span>
        <span>Free delivery over 3,000 EGP</span>
      </section>

      <section className="category-section section-pad">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">Start somewhere soft</span>
            <h2>Shop by Category</h2>
          </div>
          <div className="section-arrows">
            <button aria-label="Previous category">←</button>
            <button aria-label="Next category">→</button>
          </div>
        </div>
        <div className="category-rail">
          {shopCategories.map((category, index) => (
            <Link
              href={category.href}
              className="category-tile reveal"
              style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
              key={category.title}
            >
              <div>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 700px) 74vw, 22vw"
                />
                {category.badge && <span>{category.badge}</span>}
              </div>
              <h3>{category.title}</h3>
              <p>{category.note}</p>
            </Link>
          ))}
        </div>
      </section>

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

      <section className="spotlight-section section-pad">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">A little inspiration</span>
            <h2>Find Your Comfort Zone</h2>
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
                Shop now <ArrowIcon size={16} />
              </b>
            </Link>
          ))}
        </div>
      </section>

      <section className="reviews-section section-pad">
        <div className="reviews-heading reveal">
          <span className="review-stars">★★★★★</span>
          <h2>Good sleep speaks for itself.</h2>
          <p>Real notes from people who made room for better comfort.</p>
        </div>
        <div className="review-grid">
          <article className="reveal">
            <span>Like sleeping on a cloud</span>
            <blockquote>
              “The first night felt like checking into my favourite hotel—except
              I got to stay home.”
            </blockquote>
            <div>
              <strong>Mariam A.</strong>
              <small>Verified buyer · Cairo</small>
            </div>
          </article>
          <article className="reveal">
            <span>Now I get it</span>
            <blockquote>
              “I never understood what good sheets could change. They’re cool,
              crisp, and somehow softer every wash.”
            </blockquote>
            <div>
              <strong>Omar K.</strong>
              <small>Verified buyer · Giza</small>
            </div>
          </article>
          <article className="reveal">
            <span>Bath time, upgraded</span>
            <blockquote>
              “Thick without feeling heavy and genuinely more absorbent than my
              old hotel towels.”
            </blockquote>
            <div>
              <strong>Nour S.</strong>
              <small>Verified buyer · Alexandria</small>
            </div>
          </article>
        </div>
      </section>

      <section className="brand-intro section-pad reveal">
        <span className="eyebrow">Why Qotun?</span>
        <h2>
          Really good linens.
          <br />
          Refreshingly simple.
        </h2>
        <div className="brand-pillars">
          <div className="flex flex-col">
            <strong>
              <CheckIcon />
            </strong>
            <h3>Premium materials</h3>
            <p>
              100% Egyptian cotton, chosen for the right feel—not just a bigger
              number.
            </p>
          </div>
          <div>
            <strong>
              <CheckIcon />
            </strong>
            <h3>Hotel-tested quality</h3>
            <p>
              Made to stay soft, strong, and beautiful through real life and
              repeat washing.
            </p>
          </div>
          <div>
            <strong>
              <CheckIcon />
            </strong>
            <h3>Happiness, handled</h3>
            <p>
              Easy 14-day returns, attentive care, and a one-year manufacturing
              warranty.
            </p>
          </div>
        </div>
      </section>

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
            Flexible linen solutions for boutique hotels, serviced apartments,
            and spas.
          </p>
          <Link
            href="/pages/partner-with-qotun"
            className="button button-light"
          >
            Partner with Qotun
          </Link>
        </div>
      </section>
    </main>
  );
}
