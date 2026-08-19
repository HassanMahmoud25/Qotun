import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { collections, products, productsForCollection } from "@/lib/data";

const cdn = "https://qotun.net/cdn/shop";

type VisualLink = { label: string; slug: string; image: string };

const collectionVisuals: Record<"Bedding" | "Bath" | "Bundles" | "All", { hero: string; links: VisualLink[] }> = {
  Bedding: {
    hero: `${cdn}/collections/Unit-500TC-lifestyle-expanded.png?v=1786133185&width=2000`,
    links: [
      { label: "All bedding", slug: "bedroom", image: `${cdn}/collections/Unit-500TC-lifestyle-expanded.png?v=1786133185&width=900` },
      { label: "Bed sheets", slug: "bed-sheets", image: `${cdn}/collections/ChatGPT_Image_Aug_11_2026_06_15_36_AM.png?v=1786418971&width=900` },
      { label: "Duvet covers", slug: "duvet-covers", image: `${cdn}/files/luxe-duvet-lifestyle-03.jpg?v=1786297604&width=900` },
      { label: "Duvets & pillows", slug: "duvets", image: `${cdn}/files/2-pillows-new.jpg?v=1786297644&width=900` },
    ],
  },
  Bath: {
    hero: `${cdn}/files/Unit-Towels-U06.jpg?v=1786090923&width=2000`,
    links: [
      { label: "All bath", slug: "bathroom", image: `${cdn}/collections/Lifestyle.jpg?v=1786217641&width=900` },
      { label: "Towels", slug: "towels", image: `${cdn}/files/Unit-Towels-U06.jpg?v=1786090923&width=900` },
      { label: "Robes", slug: "bath-robe", image: `${cdn}/collections/Lifestyle.jpg?v=1786217641&width=900` },
      { label: "Bath mats", slug: "bath-mat", image: `${cdn}/files/Mat-W03.jpg?v=1786094409&width=900` },
    ],
  },
  Bundles: {
    hero: `${cdn}/files/big-bundle-500TC-03.jpg?v=1786650587&width=2000`,
    links: [
      { label: "All bundles", slug: "bundles", image: `${cdn}/files/big-bundle-500TC-03.jpg?v=1786650587&width=900` },
      { label: "Sleep bundles", slug: "sleep-bundles", image: `${cdn}/collections/500TC-coreplus-lifestyle.png?v=1786286507&width=900` },
      { label: "Comfort bundles", slug: "comfort-bundles", image: `${cdn}/files/comfort-03.jpg?v=1786650565&width=900` },
      { label: "Bath bundles", slug: "bath-bundles", image: `${cdn}/files/Full-house-Bath-Bundle.jpg?v=1786297645&width=900` },
    ],
  },
  All: {
    hero: `${cdn}/files/banner1.jpg?v=1785100909&width=2000`,
    links: [
      { label: "Bedding", slug: "bedroom", image: `${cdn}/collections/Unit-500TC-lifestyle-expanded.png?v=1786133185&width=900` },
      { label: "Bath", slug: "bathroom", image: `${cdn}/collections/Lifestyle.jpg?v=1786217641&width=900` },
      { label: "Bundles", slug: "bundles", image: `${cdn}/collections/500TC-coreplus-lifestyle.png?v=1786286507&width=900` },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = collections[slug as keyof typeof collections];
  if (!collection) notFound();

  let collectionProducts = productsForCollection(slug);
  if (!collectionProducts.length) collectionProducts = products.filter((product) => product.category === collection.category);

  const family = collection.category ?? "All";
  const visuals = collectionVisuals[family];
  const familyTitle = collection.category ? `${collection.category} Collection` : "Explore Qotun";

  return (
    <main className="collection-page">
      <header className="collection-hero collection-hero--visual">
        <Image src={visuals.hero} alt={`${collection.title} collection`} fill priority sizes="100vw" />
        <div className="collection-hero__wash" />
        <div className="collection-hero__content">
          <span className="eyebrow eyebrow--light">The Qotun collection</span>
          <h1>{collection.title}</h1>
          <p>{collection.intro}</p>
        </div>
      </header>

      <section className="collection-navigation" aria-labelledby="collection-family-title">
        <div className="collection-navigation__heading">
          <span className="eyebrow">Explore by category</span>
          <h2 id="collection-family-title">{familyTitle}</h2>
        </div>
        <nav className="collection-tabs collection-tabs--visual" aria-label="Collection categories">
          {visuals.links.map((item) => (
            <Link className={slug === item.slug ? "active" : ""} key={item.slug} href={`/collections/${item.slug}`} aria-current={slug === item.slug ? "page" : undefined}>
              <Image src={item.image} alt="" fill sizes="(max-width: 700px) 78vw, 33vw" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </section>

      <div className="collection-toolbar"><span>{collectionProducts.length} considered pieces</span><div><button>Filter +</button><select aria-label="Sort products" defaultValue="featured"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div>
      <section className="product-grid collection-grid">{collectionProducts.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</section>
      <section className="collection-note"><span>Not sure where to begin?</span><h2>Let us help you make the bed.</h2><Link className="text-link" href="/pages/contact">Speak with Qotun care →</Link></section>
    </main>
  );
}
