import type { Metadata } from "next";
import Image from "@/components/cdn-image";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How a feeling discovered in remarkable stays became Qotun—hotel comfort, thoughtfully made for home in Egyptian cotton.",
};

const storyChapters = [
  {
    number: "01",
    marker: "Check-out",
    title: "A feeling we weren’t ready to leave behind.",
    copy: "It began in the quiet moments before check-out—the last slow morning, the cool touch of fresh sheets, the robe you kept on for five minutes longer. Years spent creating beautiful stays taught us that real comfort is never one grand gesture. It is a hundred thoughtful details, working together.",
    image: "/images/our-story/01-hotel-checkout.png",
    alt: "A traveller at hotel check-out looking back at the beautifully made bed",
  },
  {
    number: "02",
    marker: "Back home",
    title: "Why should that feeling belong only to somewhere else?",
    copy: "We watched guests leave hotels and considered homes with the same thought: the best part of being away should be able to come home with you. Not as a souvenir, but as an everyday ritual—made for real mornings, real laundry days, and real life.",
    image: "/images/our-story/02-comfort-gap.png",
    alt: "The traveller back at home comparing his pillow with the memory of the hotel stay",
  },
  {
    number: "03",
    marker: "Building the answer",
    title: "Hospitality knowledge met Egyptian craft.",
    copy: "We returned to what we knew: the details behind a remarkable stay. Then we worked with Egyptian makers—testing cotton, comparing weaves, refining weights and living with every prototype. The goal was never to copy a hotel room. It was to understand its comfort, then make it belong at home.",
    image: "/images/our-story/03-egyptian-cotton-craft.png",
    alt: "Qotun's founder and an Egyptian textile artisan comparing cotton and weave samples",
  },
  {
    number: "04",
    marker: "The Qotun solution",
    title: "The stay ended. The feeling came home.",
    copy: "Qotun brings the complete experience together: breathable Egyptian cotton bedding, cloud-soft layers, plush towels and robes made for slower mornings. Hotel comfort, thoughtfully rebuilt for the rhythms of everyday life—and made to stay long after check-out.",
    image: "/images/our-story/04-qotun-at-home.png",
    alt: "A calm home transformed with Qotun bedding, towels and robe",
  },
];

const principles = [
  {
    number: "01",
    title: "Comfort with purpose",
    copy: "Every weave, weight and finish is chosen for how it feels—and how beautifully it lives.",
  },
  {
    number: "02",
    title: "Made of home",
    copy: "Premium Egyptian cotton, transformed with pride into a softer expression of where we come from.",
  },
  {
    number: "03",
    title: "Luxury that stays",
    copy: "Designed for repeat washes, unhurried mornings and the familiar pleasure of coming home.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="https://qotun.net/cdn/shop/files/Unit-500TC-lifestyle-U03.jpg?v=1786090924&width=2000"
          alt="A serene Qotun bed dressed in Egyptian cotton"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroWash} />
        <div className={styles.heroGrain} />
        <div className={styles.heroContent}>
          <span className={`${styles.lightEyebrow} eyebrow`}>
            The story of Qotun
          </span>
          <h1>
            Comfort shouldn’t end at <em>check-out.</em>
          </h1>
          <p>
            A feeling discovered in remarkable stays.
            <br />A promise remade for home.
          </p>
        </div>
        <div className={styles.heroFooter}>
          <span>Cairo, Egypt</span>
          <a href="#the-beginning">Read our story</a>
          <span>Est. with intention</span>
        </div>
      </section>

      <section className={styles.prologue} id="the-beginning">
        <div className={styles.prologueIndex}>
          <span>Our beginning</span>
          <i />
          <small>01 — 04</small>
        </div>
        <div className={styles.prologueCopy}>
          <p className={styles.dropcap}>
            Some ideas begin with a business plan. Ours began with a feeling.
          </p>
          <p>
            The kind you notice only when it is time to leave: a room that made
            you breathe a little slower, sheets that changed the way you slept,
            and the thought that comfort this considered should not disappear
            when the stay is over.
          </p>
        </div>
      </section>

      <section className={styles.chapters} aria-label="The Qotun story">
        {storyChapters.map((chapter, index) => (
          <article className={styles.chapter} key={chapter.number}>
            <div className={styles.chapterVisual}>
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                className={styles.chapterImage}
              />
              <span className={styles.chapterImageLabel}>{chapter.marker}</span>
              <span className={styles.chapterNumber}>{chapter.number}</span>
            </div>
            <div className={styles.chapterCopy}>
              <div className={styles.chapterMeta}>
                <span>{chapter.number}</span>
                <i />
                <span>{chapter.marker}</span>
              </div>
              <h2>{chapter.title}</h2>
              <p>{chapter.copy}</p>
              {index === 3 && (
                <blockquote>
                  “Keep the feeling.
                  <br />
                  Let the room change.”
                </blockquote>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className={styles.origin}>
        <div className={styles.originImage}>
          <Image
            src="https://qotun.net/cdn/shop/files/Unit-500TC-closeup.jpg?v=1786090917&width=1600"
            alt="Close detail of Qotun Egyptian cotton fabric"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <div className={styles.cottonSeal} aria-hidden="true">
            <span>100%</span>
            <small>Egyptian cotton</small>
          </div>
        </div>
        <div className={styles.originCopy}>
          <span className="eyebrow">Rooted here</span>
          <h2>The material was always part of the answer.</h2>
          <p>
            Cotton is not simply in our name. It is in our story. We work with
            premium Egyptian cotton, selecting the weave and thread count for
            what each piece needs to do—not for a number on a label.
          </p>
          <ul>
            <li>
              <CheckIcon size={17} /> Breathable by nature
            </li>
            <li>
              <CheckIcon size={17} /> Chosen for the right hand-feel
            </li>
            <li>
              <CheckIcon size={17} /> Made to soften into your life
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.manifesto}>
        <span className={styles.manifestoLabel}>What we believe</span>
        <p>
          Luxury is not a room you book.
          <br />
          It is how your home makes you <em>feel.</em>
        </p>
        <div className={styles.manifestoOrbit} aria-hidden="true">
          <span>Q</span>
        </div>
      </section>

      <section className={styles.principles}>
        <header>
          <span className="eyebrow">The Qotun standard</span>
          <h2>Thoughtful in every detail.</h2>
        </header>
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <div className={styles.principleIcon} aria-hidden="true">
                <i />
                <i />
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.epilogue}>
        <div className={styles.epilogueImage}>
          <Image
            src="https://qotun.net/cdn/shop/collections/Lifestyle.jpg?v=1786217641&width=1600"
            alt="A soft Qotun robe made for slow mornings"
            fill
            sizes="(max-width: 800px) 100vw, 52vw"
          />
        </div>
        <div className={styles.epilogueCopy}>
          <span className={`${styles.lightEyebrow} eyebrow`}>
            The story continues at home
          </span>
          <h2>Stay a little longer.</h2>
          <p>
            In bed. In your robe. In the quiet before the day begins. Qotun is
            an invitation to make ordinary moments feel worth staying for.
          </p>
          <div className={styles.epilogueActions}>
            <Link href="/collections/bedroom" className="button button-light">
              Discover bedding <ArrowIcon size={16} />
            </Link>
            <Link href="/collections/bathroom" className={styles.bathLink}>
              Explore bath
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
