import Link from "next/link";
export default function CheckoutPage() {
  return (
    <main className="checkout-page">
      <div className="checkout-brand">
        <Link href="/" className="wordmark">
          <span>Qotun</span>
          <small>قُطْن</small>
        </Link>
        <span>Secure checkout</span>
      </div>
      <div className="checkout-grid">
        <section>
          <span className="eyebrow">Contact & delivery</span>
          <h1>Where should we send your comfort?</h1>
          <form className="checkout-form">
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <div className="field-row">
              <label>
                First name
                <input placeholder="First name" />
              </label>
              <label>
                Last name
                <input placeholder="Last name" />
              </label>
            </div>
            <label>
              Address
              <input placeholder="Street and building" />
            </label>
            <div className="field-row">
              <label>
                City
                <input placeholder="Cairo" />
              </label>
              <label>
                Phone
                <input placeholder="+20" />
              </label>
            </div>
            <div className="checkout-method">
              <strong>Delivery method</strong>
              <label>
                <input type="radio" defaultChecked name="delivery" />
                <span>
                  <b>Standard delivery</b>
                  <small>2–5 business days</small>
                </span>
                <em>Calculated next</em>
              </label>
            </div>
            <button type="button" className="button button-dark button-full">
              Continue to payment
            </button>
            <p>
              This is a design prototype. No payment or order will be submitted.
            </p>
          </form>
        </section>
        <aside>
          <span className="eyebrow">Your order</span>
          <h2>Rest is on its way.</h2>
          <p>
            Your live bag summary appears in the cart. Return there to adjust
            quantities before completing checkout.
          </p>
          <Link href="/cart" className="button button-outline button-full">
            Review shopping bag
          </Link>
          <div className="checkout-perks">
            <span>Complimentary delivery over 3,000 EGP</span>
            <span>Easy returns within 14 days</span>
            <span>1-year manufacturing warranty</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
