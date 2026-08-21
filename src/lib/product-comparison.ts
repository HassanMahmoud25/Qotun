import type { Product } from "@/lib/data";

export type ComparisonDetail = {
  label: string;
  value: string;
};

const subcategoryDetails: Record<
  string,
  Record<"material" | "feel" | "bestFor" | "includes", string>
> = {
  "Bed Sheets": {
    material: "Long-staple Egyptian cotton",
    feel: "Smooth, cool and breathable",
    bestFor: "Everyday sleeping and warm nights",
    includes: "Fitted sheet with matching pillowcases",
  },
  "Duvet Covers": {
    material: "500-thread-count Egyptian cotton",
    feel: "Silky-smooth with a tailored drape",
    bestFor: "A polished, hotel-style bed",
    includes: "Duvet cover with matching pillowcases",
  },
  "Duvets & Pillows": {
    material: "Hypoallergenic microfibre fill",
    feel: "Airy loft with balanced support",
    bestFor: "Layering warmth and cloud-like comfort",
    includes: "One piece in your selected size",
  },
  Towels: {
    material: "Plush Egyptian cotton terry",
    feel: "Dense, absorbent and soft",
    bestFor: "A hotel-inspired daily bath ritual",
    includes: "One signature bath towel",
  },
  Robes: {
    material: "Egyptian cotton terry",
    feel: "Plush inside, softly tailored outside",
    bestFor: "Slow mornings and post-bath comfort",
    includes: "One unisex bath robe",
  },
  "Sleep Bundles": {
    material: "Coordinated Egyptian cotton and lofty inserts",
    feel: "Crisp, layered and hotel-soft",
    bestFor: "A complete bedroom refresh",
    includes: "Coordinated sheets, covers and comfort essentials",
  },
  "Bath Bundles": {
    material: "Egyptian cotton terry",
    feel: "Plush, absorbent and coordinated",
    bestFor: "A complete bathroom reset",
    includes: "Towels and bath mats as pictured",
  },
  "Comfort Bundles": {
    material: "Hypoallergenic microfibre fill",
    feel: "Light, lofty and supportive",
    bestFor: "An instant comfort upgrade",
    includes: "One duvet and two pillows",
  },
};

export function comparisonDetails(product: Product): ComparisonDetail[] {
  const details = subcategoryDetails[product.subcategory] ?? {
    material: "Premium Egyptian cotton",
    feel: "Soft, breathable and made for repeat use",
    bestFor: product.eyebrow,
    includes: "One complete set",
  };
  const savings = product.compareAt
    ? `${Math.round((1 - product.price / product.compareAt) * 100)}% (${new Intl.NumberFormat("en-EG").format(product.compareAt - product.price)} EGP)`
    : "—";

  return [
    { label: "Collection", value: `${product.category} · ${product.subcategory}` },
    { label: "Material", value: details.material },
    { label: "Feel", value: details.feel },
    { label: "Best for", value: details.bestFor },
    { label: "What’s included", value: details.includes },
    {
      label: "Available sizes",
      value: product.sizes?.length ? product.sizes.join(", ") : "One size",
    },
    { label: "Colour palette", value: "6 hotel-inspired shades" },
    { label: "Savings", value: savings },
    { label: "Care", value: "Machine wash cool · Tumble dry low" },
    { label: "Returns", value: "Easy returns within 14 days" },
    { label: "Warranty", value: "1-year manufacturing warranty" },
  ];
}
