import Link from "next/link";
export default function NotFound() {
  return (
    <main className="empty-page">
      <span className="eyebrow">404 — tucked away</span>
      <h1>This page has gone to bed.</h1>
      <p>Let’s bring you back to something softer.</p>
      <Link href="/" className="button button-dark">
        Return home
      </Link>
    </main>
  );
}
