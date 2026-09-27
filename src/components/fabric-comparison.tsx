"use client";

import Image from "@/components/cdn-image";
import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { formatPrice, products } from "@/lib/data";

type FabricId = "balance" | "luxe";
type AnswerKey = "temperature" | "texture" | "priority";

const balanceProduct = products.find(
  (product) => product.slug === "balance-sheet-set",
)!;
const luxeProduct = products.find(
  (product) => product.slug === "1-fitted-sheet-set",
)!;

const fabrics = {
  balance: {
    id: "balance" as const,
    name: "Balance",
    count: "200 thread count",
    signature: "Cool. Crisp. Effortless.",
    description:
      "An airy plain weave with a fresh matte finish. Light on the body, naturally breathable, and wonderfully easy to live with.",
    image: balanceProduct.gallery[0],
    lifestyle: products.find(
      (product) => product.slug === "tranquility-essential-bundle",
    )!.gallery[0],
    product: balanceProduct,
    tone: "#e2e7e2",
    facts: [
      "Lightweight drape",
      "Fresh matte hand-feel",
      "Excellent airflow",
      "Softens with every wash",
    ],
  },
  luxe: {
    id: "luxe" as const,
    name: "Luxe",
    count: "500 thread count",
    signature: "Smooth. Refined. Enveloping.",
    description:
      "A denser, finely woven cotton with a fluid hotel-smooth finish. Substantial without feeling heavy, polished without shine.",
    image: products.find((product) => product.slug === "luxe-bed-core-set")!
      .gallery[2],
    lifestyle: luxeProduct.gallery[0],
    product: luxeProduct,
    tone: "#e6e2dc",
    facts: [
      "Fluid, elegant drape",
      "Smooth polished hand-feel",
      "Balanced breathability",
      "Premium hotel finish",
    ],
  },
};

const comparisonRows = [
  { label: "First touch", balance: "Cool and crisp", luxe: "Smooth and silky" },
  { label: "Weight", balance: "Light and airy", luxe: "More substantial" },
  {
    label: "Breathability",
    balance: "Highest airflow",
    luxe: "Balanced airflow",
  },
  {
    label: "Surface",
    balance: "Clean matte finish",
    luxe: "Soft polished finish",
  },
  { label: "Drape", balance: "Relaxed and fresh", luxe: "Fluid and tailored" },
  {
    label: "Best for",
    balance: "Warm sleepers, everyday ease",
    luxe: "Hotel lovers, smoother comfort",
  },
  {
    label: "From",
    balance: formatPrice(balanceProduct.price),
    luxe: formatPrice(luxeProduct.price),
  },
];

const questions: Array<{
  id: AnswerKey;
  prompt: string;
  balance: string;
  luxe: string;
}> = [
  {
    id: "temperature",
    prompt: "Through the night, I usually…",
    balance: "Run warm and seek airflow",
    luxe: "Prefer a little more cocooning",
  },
  {
    id: "texture",
    prompt: "The bed I love feels…",
    balance: "Fresh, crisp, and newly made",
    luxe: "Smooth, fluid, and hotel-soft",
  },
  {
    id: "priority",
    prompt: "What matters most?",
    balance: "Easy everyday comfort",
    luxe: "The most elevated finish",
  },
];

export function FabricComparison() {
  const [focus, setFocus] = useState<FabricId | null>(null);
  const [answers, setAnswers] = useState<Partial<Record<AnswerKey, FabricId>>>(
    {},
  );
  const answered = Object.keys(answers).length;
  const balanceScore = Object.values(answers).filter(
    (answer) => answer === "balance",
  ).length;
  const match = balanceScore >= 2 ? fabrics.balance : fabrics.luxe;

  return (
    <div className="fabric-guide">
      <header className="fabric-hero">
        <div className="fabric-hero__copy">
          <span className="eyebrow eyebrow--light">The Qotun fabric guide</span>
          <h1>Feel is everything.</h1>
          <p>
            Thread count is only the beginning. Discover how weave, weight, and
            finish shape the way your bed actually feels.
          </p>
          <a href="#compare" className="button button-light">
            Compare the fabrics <ArrowIcon size={16} />
          </a>
        </div>
        <div
          className="fabric-hero__textures"
          aria-label="Balance and Luxe cotton textures"
        >
          {Object.values(fabrics).map((fabric) => (
            <button
              type="button"
              onClick={() => setFocus(fabric.id)}
              key={fabric.id}
            >
              <Image
                src={fabric.image}
                alt={`${fabric.name} Egyptian cotton close-up`}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 35vw"
              />
              <span>
                <small>{fabric.count}</small>
                <b>{fabric.name}</b>
              </span>
            </button>
          ))}
        </div>
      </header>

      <section className="fabric-intro" id="compare">
        <span className="eyebrow">Two considered expressions of cotton</span>
        <h2>
          Not better or worse.
          <br />
          Simply a different kind of comfort.
        </h2>
        <p>
          Both collections begin with premium Egyptian cotton and hotel-tested
          construction. Your choice comes down to the sensation you want when
          you get into bed.
        </p>
      </section>

      <section className={`fabric-cards ${focus ? `is-focused-${focus}` : ""}`}>
        {Object.values(fabrics).map((fabric) => (
          <article
            className={`fabric-card fabric-card--${fabric.id}`}
            key={fabric.id}
          >
            <button
              className="fabric-card__focus"
              type="button"
              onClick={() => setFocus(focus === fabric.id ? null : fabric.id)}
              aria-pressed={focus === fabric.id}
            >
              {focus === fabric.id ? "Showing details" : "Focus this fabric"}
            </button>
            <div className="fabric-card__image">
              <Image
                src={fabric.lifestyle}
                alt={`${fabric.name} bedding in a calm bedroom`}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <span>{fabric.count}</span>
            </div>
            <div
              className="fabric-card__body"
              style={{ backgroundColor: fabric.tone }}
            >
              <span className="eyebrow">Qotun {fabric.name}</span>
              <h2>{fabric.signature}</h2>
              <p>{fabric.description}</p>
              <ul>
                {fabric.facts.map((fact) => (
                  <li key={fact}>
                    <CheckIcon size={15} /> {fact}
                  </li>
                ))}
              </ul>
              <div>
                <strong>From {formatPrice(fabric.product.price)}</strong>
                <Link
                  className="text-link"
                  href={`/products/${fabric.product.slug}`}
                >
                  Shop {fabric.name} <ArrowIcon size={15} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="fabric-matrix">
        <div className="fabric-section-heading">
          <span className="eyebrow">Side by side</span>
          <h2>The difference, translated.</h2>
          <p>
            A quick, honest comparison of the qualities you will notice every
            night.
          </p>
        </div>
        <div className="fabric-matrix__scroll">
          <div
            className="fabric-matrix__table"
            role="table"
            aria-label="Balance and Luxe fabric comparison"
          >
            <div className="fabric-matrix__head" role="row">
              <span role="columnheader">Quality</span>
              <span role="columnheader">
                <small>200TC</small>Balance
              </span>
              <span role="columnheader">
                <small>500TC</small>Luxe
              </span>
            </div>
            {comparisonRows.map((row) => (
              <div role="row" key={row.label}>
                <strong role="rowheader">{row.label}</strong>
                <span role="cell">{row.balance}</span>
                <span role="cell">{row.luxe}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fabric-count-story">
        <div>
          <span className="eyebrow eyebrow--light">
            Thread count, made simple
          </span>
          <h2>A number cannot tell you how a sheet feels.</h2>
          <p>
            Thread count describes the number of threads woven into a square
            inch. It influences density, but cotton quality, yarn fineness,
            weave, and finishing matter just as much.
          </p>
          <p>
            That is why our 200TC feels intentionally crisp—not basic—and our
            500TC feels refined without becoming heavy or overly glossy.
          </p>
        </div>
        <div className="fabric-count-story__diagram">
          <article>
            <span>200</span>
            <b>Balance</b>
            <p>
              Fewer, carefully spaced threads create more room for air to move.
            </p>
          </article>
          <i aria-hidden="true">versus</i>
          <article>
            <span>500</span>
            <b>Luxe</b>
            <p>
              More fine threads create a denser, smoother surface and fluid
              drape.
            </p>
          </article>
        </div>
      </section>

      <section className="fabric-finder">
        <div className="fabric-finder__questions">
          <div className="fabric-section-heading">
            <span className="eyebrow">Find your feel</span>
            <h2>
              Three questions.
              <br />
              One clear match.
            </h2>
            <p>
              Choose the answer that sounds most like you. There are no wrong
              sheets—only the ones that suit you better.
            </p>
          </div>
          <div className="fabric-finder__progress">
            <span
              style={{ width: `${(answered / questions.length) * 100}%` }}
            />
            <small>
              {answered} of {questions.length} answered
            </small>
          </div>
          {questions.map((question, index) => (
            <fieldset key={question.id}>
              <legend>
                <span>0{index + 1}</span>
                {question.prompt}
              </legend>
              <div>
                <button
                  type="button"
                  className={
                    answers[question.id] === "balance" ? "is-selected" : ""
                  }
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: "balance",
                    }))
                  }
                  aria-pressed={answers[question.id] === "balance"}
                >
                  {question.balance}
                  <small>Balance</small>
                </button>
                <button
                  type="button"
                  className={
                    answers[question.id] === "luxe" ? "is-selected" : ""
                  }
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: "luxe",
                    }))
                  }
                  aria-pressed={answers[question.id] === "luxe"}
                >
                  {question.luxe}
                  <small>Luxe</small>
                </button>
              </div>
            </fieldset>
          ))}
        </div>
        <aside
          className={`fabric-result ${answered === questions.length ? "is-ready" : ""}`}
          aria-live="polite"
        >
          {answered < questions.length ? (
            <>
              <span className="fabric-result__number">{3 - answered}</span>
              <span className="eyebrow eyebrow--light">Your fabric match</span>
              <h2>A little more about you.</h2>
              <p>
                Answer{" "}
                {3 - answered === 1
                  ? "one more question"
                  : `${3 - answered} more questions`}{" "}
                and we’ll reveal the Qotun fabric that fits your sleep best.
              </p>
            </>
          ) : (
            <>
              <div className="fabric-result__image">
                <Image
                  src={match.lifestyle}
                  alt={`${match.name} bedding`}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
              <span className="eyebrow eyebrow--light">Your fabric match</span>
              <h2>You are {match.name}.</h2>
              <p>{match.description}</p>
              <div>
                <Link
                  href={`/products/${match.product.slug}`}
                  className="button button-light"
                >
                  Shop {match.name}
                </Link>
                <Link
                  href="/build-your-bed"
                  className="text-link text-link--light"
                >
                  Use it in your bed <ArrowIcon size={15} />
                </Link>
              </div>
            </>
          )}
        </aside>
      </section>

      <section className="fabric-care">
        <div className="fabric-section-heading">
          <span className="eyebrow">Care that rewards you</span>
          <h2>Both get better with time.</h2>
        </div>
        <div>
          {[
            "Wash cool with similar colours",
            "Use a gentle liquid detergent",
            "Tumble dry low and remove promptly",
            "Skip optical brighteners and softener",
          ].map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
        <p>
          Balance relaxes into lived-in softness. Luxe becomes even smoother
          while keeping its refined drape.
        </p>
      </section>

      <section className="fabric-final-cta">
        <span className="eyebrow eyebrow--light">Ready to make the bed?</span>
        <h2>
          Choose the feel.
          <br />
          We’ll handle the layers.
        </h2>
        <p>
          Take your fabric match into the Qotun Sleep Studio and build a
          complete bed around it.
        </p>
        <Link href="/build-your-bed" className="button button-light">
          Build your bed <ArrowIcon size={16} />
        </Link>
      </section>
    </div>
  );
}
