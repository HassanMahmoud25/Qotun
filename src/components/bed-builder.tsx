"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatPrice, products } from "@/lib/data";

const sizes = [
  { value: "100×200", label: "Single", note: "One sleeper" },
  { value: "120×200", label: "Wide Single", note: "A little more room" },
  { value: "140×200", label: "Double", note: "Compact for two" },
  { value: "160×200", label: "Queen", note: "Our most popular" },
  { value: "180×200", label: "King", note: "Generously spacious" },
];

const feels = [
  {
    id: "balance",
    name: "Balance",
    threadCount: "200 thread count",
    headline: "Cool, crisp, effortless",
    note: "Breathable cotton with a fresh matte finish—the feeling of a beautifully made bed on a warm morning.",
    slug: "tranquility-essential-bundle",
  },
  {
    id: "luxe",
    name: "Luxe",
    threadCount: "500 thread count",
    headline: "Smooth, refined, enveloping",
    note: "Long-staple Egyptian cotton with a polished hotel hand-feel that becomes softer with every wash.",
    slug: "luxe-essential-bed-bundle",
  },
];

const colours = [
  { name: "Hotel White", hex: "#f7f5ef", dark: false },
  { name: "Warm Ivory", hex: "#e8dfd2", dark: false },
  { name: "Desert Sand", hex: "#bdae99", dark: false },
  { name: "Quiet Sage", hex: "#929b86", dark: false },
  { name: "Nile Blue", hex: "#7f94a5", dark: true },
  { name: "Midnight", hex: "#283455", dark: true },
];

const steps = ["Your size", "Your feel", "Your colour", "Final details"];

export function BedBuilder() {
  const { add } = useStore();
  const [step, setStep] = useState(0);
  const [size, setSize] = useState("160×200");
  const [feelId, setFeelId] = useState("luxe");
  const [colourName, setColourName] = useState("Hotel White");
  const [pillowCount, setPillowCount] = useState(2);

  const feel = feels.find((option) => option.id === feelId)!;
  const colour = colours.find((option) => option.name === colourName)!;
  const bundle = products.find((product) => product.slug === feel.slug)!;
  const pillow = products.find(
    (product) => product.slug === "down-alternative-pillow",
  )!;
  const extraPillowTotal = pillowCount === 4 ? pillow.price * 2 : 0;
  const total = bundle.price + extraPillowTotal;
  const compareAt = (bundle.compareAt ?? bundle.price) + extraPillowTotal;
  const savings = compareAt - total;
  const previewImage =
    feelId === "luxe"
      ? bundle.gallery[0]
      : products.find(
          (product) => product.slug === "tranquility-essential-bundle",
        )!.gallery[0];

  function addConfiguration() {
    add(bundle.slug, 1, { size, colour: colourName });
    if (pillowCount === 4)
      add(pillow.slug, 2, { size: "50×70", colour: colourName });
  }

  return (
    <div className="bed-builder-page">
      <header className="bed-builder-intro">
        <span className="eyebrow eyebrow--light">The Qotun sleep studio</span>
        <h1>Build your bed.</h1>
        <p>
          Four considered choices. One beautifully complete bed, tailored to the
          way you like to rest.
        </p>
        <div>
          <span>01 Fit</span>
          <span>02 Feel</span>
          <span>03 Palette</span>
          <span>04 Finish</span>
        </div>
      </header>

      <section className="bed-builder" aria-label="Build your bed configurator">
        <div className="bed-builder__visual">
          <div className="bed-builder__image">
            <Image
              key={previewImage}
              src={previewImage}
              alt={`${feel.name} bedding styled in ${colourName}`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div
              className="bed-builder__wash"
              style={{ backgroundColor: colour.hex }}
            />
            <span
              className={`bed-builder__colour-chip ${colour.dark ? "is-dark" : ""}`}
              style={{ backgroundColor: colour.hex }}
            >
              {colour.name}
            </span>
          </div>

          <div className="bed-builder__receipt" aria-live="polite">
            <div>
              <span className="eyebrow">Your Qotun bed</span>
              <h2>
                {feel.name} · {size}
              </h2>
            </div>
            <dl>
              <div>
                <dt>Cotton feel</dt>
                <dd>{feel.threadCount}</dd>
              </div>
              <div>
                <dt>Colour</dt>
                <dd>{colourName}</dd>
              </div>
              <div>
                <dt>Pillow finish</dt>
                <dd>{pillowCount} pillows</dd>
              </div>
            </dl>
            <ul>
              <li>
                <CheckIcon size={15} /> Fitted sheet and pillowcase set
              </li>
              <li>
                <CheckIcon size={15} /> Coordinated duvet cover
              </li>
              <li>
                <CheckIcon size={15} /> Cloud baffle duvet insert
              </li>
              <li>
                <CheckIcon size={15} /> {pillowCount} down-alternative pillows
              </li>
            </ul>
            <div className="bed-builder__price">
              <div>
                <span>Complete bed</span>
                {savings > 0 && <small>You save {formatPrice(savings)}</small>}
              </div>
              <div>
                <del>{compareAt > total ? formatPrice(compareAt) : null}</del>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="bed-builder__panel">
          <nav className="bed-builder__steps" aria-label="Builder progress">
            {steps.map((label, index) => (
              <button
                type="button"
                className={
                  index === step
                    ? "is-active"
                    : index < step
                      ? "is-complete"
                      : ""
                }
                onClick={() => setStep(index)}
                aria-current={index === step ? "step" : undefined}
                key={label}
              >
                <span>
                  {index < step ? <CheckIcon size={13} /> : `0${index + 1}`}
                </span>
                <b>{label}</b>
              </button>
            ))}
          </nav>

          <div className="bed-builder__stage" key={step}>
            {step === 0 && (
              <fieldset>
                <legend>
                  <span className="eyebrow">Step one</span>
                  <strong>What size is your mattress?</strong>
                  <small>Measurements are width × length in centimetres.</small>
                </legend>
                <div className="bed-builder__size-grid">
                  {sizes.map((option) => (
                    <button
                      type="button"
                      className={size === option.value ? "is-selected" : ""}
                      onClick={() => setSize(option.value)}
                      aria-pressed={size === option.value}
                      key={option.value}
                    >
                      <b>{option.label}</b>
                      <span>{option.value} cm</span>
                      <small>{option.note}</small>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend>
                  <span className="eyebrow">Step two</span>
                  <strong>How should your bed feel?</strong>
                  <small>
                    Both are woven from premium Egyptian cotton. The difference
                    is in the finish.
                  </small>
                </legend>
                <div className="bed-builder__feel-grid">
                  {feels.map((option) => (
                    <button
                      type="button"
                      className={feelId === option.id ? "is-selected" : ""}
                      onClick={() => setFeelId(option.id)}
                      aria-pressed={feelId === option.id}
                      key={option.id}
                    >
                      <span>{option.threadCount}</span>
                      <h3>{option.name}</h3>
                      <b>{option.headline}</b>
                      <p>{option.note}</p>
                      <i>
                        {feelId === option.id ? "Selected" : "Choose this feel"}
                      </i>
                    </button>
                  ))}
                </div>
                <Link className="bed-builder__guide-link" href="/fabric-guide">
                  Need more detail? Compare our fabrics <ArrowIcon size={14} />
                </Link>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend>
                  <span className="eyebrow">Step three</span>
                  <strong>Choose your quiet.</strong>
                  <small>
                    A calm, hotel-inspired palette designed to layer
                    effortlessly.
                  </small>
                </legend>
                <div className="bed-builder__colour-grid">
                  {colours.map((option) => (
                    <button
                      type="button"
                      className={
                        colourName === option.name ? "is-selected" : ""
                      }
                      onClick={() => setColourName(option.name)}
                      aria-pressed={colourName === option.name}
                      key={option.name}
                    >
                      <i style={{ backgroundColor: option.hex }} />
                      <b>{option.name}</b>
                      <span>
                        {colourName === option.name ? "Selected" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset>
                <legend>
                  <span className="eyebrow">Step four</span>
                  <strong>Add the hotel finish.</strong>
                  <small>
                    Your complete bed includes two pillows. Add two more for a
                    generous layered look.
                  </small>
                </legend>
                <div className="bed-builder__finish-grid">
                  <button
                    type="button"
                    className={pillowCount === 2 ? "is-selected" : ""}
                    onClick={() => setPillowCount(2)}
                    aria-pressed={pillowCount === 2}
                  >
                    <span>Essential</span>
                    <h3>Two-pillow finish</h3>
                    <p>Clean, considered, and beautifully simple.</p>
                    <b>Included</b>
                  </button>
                  <button
                    type="button"
                    className={pillowCount === 4 ? "is-selected" : ""}
                    onClick={() => setPillowCount(4)}
                    aria-pressed={pillowCount === 4}
                  >
                    <span>Most hotel-like</span>
                    <h3>Four-pillow finish</h3>
                    <p>Extra depth for reading, lounging, and a fuller bed.</p>
                    <b>+ {formatPrice(pillow.price * 2)}</b>
                  </button>
                </div>
                <div className="bed-builder__assurance">
                  <CheckIcon size={18} />
                  <p>
                    <strong>Everything works together.</strong>
                    <span>
                      We match the fitted sheet, duvet cover, inserts, and
                      pillows to your selected bed size and palette.
                    </span>
                  </p>
                </div>
              </fieldset>
            )}
          </div>

          <div className="bed-builder__actions">
            <button
              type="button"
              className="bed-builder__back"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                className="button button-dark"
                onClick={() => setStep(step + 1)}
              >
                Continue <ArrowIcon size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="button button-dark bed-builder__add"
                onClick={addConfiguration}
              >
                Add complete bed · {formatPrice(total)}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bed-builder-note">
        <span className="eyebrow">Made simple, made well</span>
        <h2>No guesswork between layers.</h2>
        <p>
          Every selection is proportioned to fit together, using the same
          hotel-tested standards Qotun brings to hospitality partners.
        </p>
        <div>
          <span>
            <b>100%</b> Egyptian cotton
          </span>
          <span>
            <b>14 days</b> Easy returns
          </span>
          <span>
            <b>1 year</b> Manufacturing warranty
          </span>
        </div>
      </section>
    </div>
  );
}
