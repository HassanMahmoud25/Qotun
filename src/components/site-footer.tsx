import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-logo" aria-label="Qotun home">
            <Image
              src="https://qotun.net/cdn/shop/files/Qotun_logo-02_1.png?height=144&v=1785079707"
              alt="Qotun"
              width={244}
              height={72}
            />
          </Link>
          <p>
            Hotel comfort, thoughtfully made for home in 100% Egyptian cotton.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <h3>Shop</h3>
            <Link href="/collections/bedroom">Bedding</Link>
            <Link href="/collections/bathroom">Bath</Link>
            <Link href="/collections/bundles">Bundles</Link>
            <Link href="/collections/all">View all</Link>
          </div>
          <div>
            <h3>Discover</h3>
            <Link href="/build-your-bed">Build your bed</Link>
            <Link href="/fabric-guide">Fabric guide</Link>
            <Link href="/pages/about">Our story</Link>
            <Link href="/pages/partner-with-qotun">Hospitality</Link>
          </div>
          <div>
            <h3>Care</h3>
            <Link href="/pages/contact">Contact</Link>
            <Link href="/pages/faq">FAQs</Link>
            <Link href="/pages/delivery-policy">Delivery</Link>
            <Link href="/pages/return-policy">Returns</Link>
            <Link href="/pages/terms-conditions">Terms</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Qotun — Cairo, Egypt</span>
        <span>Designed for unhurried living.</span>
      </div>
    </footer>
  );
}
