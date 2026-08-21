import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a Qotun account to save favourites, follow orders, and enjoy a more considered shopping experience.",
};

const benefits = [
  "Keep your wishlist close across every visit",
  "See orders and delivery updates in one place",
  "Save your details for an easier checkout",
];

export default function CreateAccountPage() {
  return (
    <main className="create-account-page">
      <section className="create-account__form">
        <div>
          <span className="eyebrow">Welcome to Qotun</span>
          <h1>Create your account</h1>
          <p>
            A quieter way to keep track of the pieces you love and the comfort
            on its way home.
          </p>

          <form>
            <div className="create-account__names">
              <label>
                First name
                <input name="firstName" autoComplete="given-name" />
              </label>
              <label>
                Last name
                <input name="lastName" autoComplete="family-name" />
              </label>
            </div>
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" />
            </label>
            <label className="create-account__consent">
              <input type="checkbox" name="offers" />
              <span>
                Keep me close to new collections, considered offers, and Qotun
                stories. You can unsubscribe at any time.
              </span>
            </label>
            <button type="button" className="button button-dark button-full">
              Create my account
            </button>
          </form>

          <p className="create-account__legal">
            By creating an account, you agree to our{" "}
            <Link href="/pages/terms-conditions">terms and conditions</Link>.
          </p>
        </div>
      </section>

      <aside className="create-account__story">
        <div>
          <span className="eyebrow eyebrow--light">Made personal</span>
          <h2>Your comfort, remembered.</h2>
          <p>
            Thoughtful details now. A more effortless return to Qotun later.
          </p>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <span><CheckIcon size={15} /></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
