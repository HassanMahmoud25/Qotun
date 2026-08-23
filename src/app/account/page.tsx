import Link from "next/link";

export default function AccountPage() {
  return (
    <main className="account-page">
      <section>
        <span className="eyebrow">Welcome back</span>
        <h1>Your Qotun</h1>
        <p>
          Sign in to see orders, save addresses, and make returning to comfort a
          little easier.
        </p>
        <form>
          <label>
            Email address
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <div>
              <input type="password" placeholder="••••••••" />
              <button type="button">Show</button>
            </div>
          </label>
          <button type="button" className="button button-dark button-full">
            Sign in
          </button>
          <a href="#">Forgot your password?</a>
        </form>
        <div className="account-divider">
          <span>New to Qotun?</span>
        </div>
        <Link
          href="/account/create"
          className="button button-outline button-full"
        >
          Create an account
        </Link>
        <Link href="/collections/all" className="account-guest-link">
          Continue as guest
        </Link>
      </section>
      <aside>
        <span className="eyebrow eyebrow--light">A softer place to land</span>
        <h2>Comfort, remembered.</h2>
        <p>
          Keep your favourites close and make every future order feel
          effortless.
        </p>
      </aside>
    </main>
  );
}
