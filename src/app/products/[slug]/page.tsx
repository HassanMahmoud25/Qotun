import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { ProductReviews } from "@/components/product-reviews";
import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.category === product.category ||
          item.subcategory === product.subcategory),
    )
    .slice(0, 4);
  return (
    <main className="product-page page-shell">
      <nav className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link
          href={`/collections/${product.category === "Bedding" ? "bedroom" : product.category === "Bath" ? "bathroom" : "bundles"}`}
        >
          {product.category}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <ProductReviews productSlug={product.slug} productName={product.name} />

      <section className="related-products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Keep exploring</span>
            <h2>You may also love</h2>
          </div>
        </div>
        <div className="product-grid">
          {related.map((item, index) => (
            <ProductCard key={item.slug} product={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
