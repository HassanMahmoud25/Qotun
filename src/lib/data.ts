export type Product = {
  slug: string;
  name: string;
  category: "Bedding" | "Bath" | "Bundles";
  subcategory: string;
  price: number;
  compareAt?: number;
  eyebrow: string;
  description: string;
  image: string;
  gallery: string[];
  sizes?: string[];
  badge?: string;
};

const cdn = "https://qotun.net/cdn/shop";

export const products: Product[] = [
  {
    slug: "luxe-essential-bed-bundle",
    name: "Luxe Essential Bundle",
    category: "Bundles",
    subcategory: "Sleep Bundles",
    price: 12835,
    compareAt: 15100,
    eyebrow: "The complete hotel bed",
    description: "A perfectly coordinated sleep system in 500-thread-count Egyptian cotton, paired with cloud-like inserts for a bed that feels considered from the first touch.",
    image: `${cdn}/files/big-bundle-500TC-03.jpg?v=1786650587&width=1200`,
    gallery: [
      `${cdn}/files/Unit-500TC-lifestyle-U03.jpg?v=1786090924&width=1600`,
      `${cdn}/files/big-bundle-500TC-02_6c6a8c48-121d-4c23-ab11-bc031633eac0.jpg?v=1786650593&width=1600`,
      `${cdn}/files/Luxe_Duvet-Set-W02.jpg?v=1786094329&width=1600`,
    ],
    sizes: ["100×200", "120×200", "140×200", "160×200", "180×200", "200×200"],
    badge: "15% off",
  },
  {
    slug: "tranquility-essential-bundle",
    name: "Tranquility Essential Bundle",
    category: "Bundles",
    subcategory: "Sleep Bundles",
    price: 11475,
    compareAt: 13500,
    eyebrow: "Effortless comfort",
    description: "Crisp 200-thread-count cotton and lofty essentials, composed as one serene bedroom set.",
    image: `${cdn}/files/big-bundle-500TC-02.jpg?v=1786650587&width=1200`,
    gallery: [
      `${cdn}/files/Unit-200TC-lifestyle-U03.jpg?v=1786090919&width=1600`,
      `${cdn}/files/200TC-CoreSet-W01.jpg?v=1786094328&width=1600`,
      `${cdn}/files/2-pillows-new.jpg?v=1786297644&width=1600`,
    ],
    sizes: ["100×200", "120×200", "140×200", "160×200", "180×200"],
    badge: "15% off",
  },
  {
    slug: "full-house-bath-set",
    name: "Full House Bath Set",
    category: "Bundles",
    subcategory: "Bath Bundles",
    price: 5580,
    compareAt: 7440,
    eyebrow: "A complete bath reset",
    description: "Plush, absorbent Egyptian cotton towels and bath mats for a softly coordinated bathroom.",
    image: `${cdn}/files/Full-house-Bath-Bundle.jpg?v=1786297645&width=1200`,
    gallery: [
      `${cdn}/files/Unit-Towels-U06.jpg?v=1786090923&width=1600`,
      `${cdn}/files/BathSheet-Set-W03.jpg?v=1786094402&width=1600`,
      `${cdn}/files/Mat-W03.jpg?v=1786094409&width=1600`,
    ],
    badge: "25% off",
  },
  {
    slug: "luxe-bed-core-set",
    name: "Luxe Bed Core Set",
    category: "Bedding",
    subcategory: "Bed Sheets",
    price: 7740,
    compareAt: 8600,
    eyebrow: "500 thread count",
    description: "Our most refined fitted sheet and pillowcase pairing, woven for a smooth, cool hand-feel.",
    image: `${cdn}/files/500TC-Bundles.jpg?v=1786094332&width=1200`,
    gallery: [
      `${cdn}/files/Unit-500TC-lifestyle-U01.jpg?v=1786090919&width=1600`,
      `${cdn}/files/500TC-pillowcase-W01.jpg?v=1786094329&width=1600`,
      `${cdn}/files/Unit-500TC-closeup.jpg?v=1786090917&width=1600`,
    ],
    sizes: ["100×200", "120×200", "140×200", "160×200", "180×200"],
    badge: "10% off",
  },
  {
    slug: "balance-sheet-set",
    name: "Balance Fitted Sheet Set",
    category: "Bedding",
    subcategory: "Bed Sheets",
    price: 1000,
    eyebrow: "Everyday essential",
    description: "Breathable Egyptian cotton with a clean matte finish and easy, everyday softness.",
    image: `${cdn}/files/200TC-Set-W01.jpg?v=1786094326&width=1200`,
    gallery: [`${cdn}/files/Unit-200TC-closeup-U04.jpg?v=1786090922&width=1600`],
    sizes: ["100×200", "120×200", "140×200", "160×200", "180×200"],
  },
  {
    slug: "1-fitted-sheet-set",
    name: "Luxe Fitted Sheet Set",
    category: "Bedding",
    subcategory: "Bed Sheets",
    price: 3450,
    eyebrow: "Silky, never shiny",
    description: "Long-staple Egyptian cotton finished for a hotel-smooth feel and lasting strength.",
    image: `${cdn}/files/500TC-Set-W01.jpg?v=1786094326&width=1200`,
    gallery: [`${cdn}/files/Unit-500TC-lifestyle-U03.jpg?v=1786090924&width=1600`],
    sizes: ["100×200", "120×200", "140×200", "160×200", "180×200"],
  },
  {
    slug: "luxe-duvet-cover-set",
    name: "Luxe Duvet Cover Set",
    category: "Bedding",
    subcategory: "Duvet Covers",
    price: 5200,
    eyebrow: "A tailored finish",
    description: "A refined 500-thread-count duvet cover with matching pillowcases and discreet closures.",
    image: `${cdn}/files/500TC-coreplus-W01.jpg?v=1786094333&width=1200`,
    gallery: [`${cdn}/files/luxe-duvet-lifestyle-03.jpg?v=1786297604&width=1600`],
    sizes: ["Twin", "Full", "Queen", "King"],
  },
  {
    slug: "cloud-baffle-duvet",
    name: "Cloud Baffle Duvet",
    category: "Bedding",
    subcategory: "Duvets & Pillows",
    price: 5100,
    eyebrow: "Light as air",
    description: "Baffle-box construction keeps its lofty filling evenly distributed for balanced warmth.",
    image: `${cdn}/files/Luxe_Duvet-Set-W02.jpg?v=1786094329&width=1200`,
    gallery: [`${cdn}/files/Luxe_Duvet-close_up-W03.jpg?v=1786094333&width=1600`],
    sizes: ["Twin", "Full", "Queen", "King"],
  },
  {
    slug: "down-alternative-pillow",
    name: "Down Alternative Pillow",
    category: "Bedding",
    subcategory: "Duvets & Pillows",
    price: 700,
    eyebrow: "Soft support",
    description: "Hypoallergenic microfibre comfort with the inviting loft of down and dependable support.",
    image: `${cdn}/files/1-pillows-new.jpg?v=1786297643&width=1200`,
    gallery: [`${cdn}/files/2-pillows-new.jpg?v=1786297644&width=1600`],
    sizes: ["50×70", "50×90"],
  },
  {
    slug: "bath-towel",
    name: "Signature Bath Towel",
    category: "Bath",
    subcategory: "Towels",
    price: 690,
    eyebrow: "Dense, plush, absorbent",
    description: "Generously weighted Egyptian cotton terry with excellent absorbency and a soft hotel hand-feel.",
    image: `${cdn}/files/Bath_Towel-W01.jpg?v=1786094406&width=1200`,
    gallery: [`${cdn}/files/Unit-Towels-U06.jpg?v=1786090923&width=1600`],
  },
  {
    slug: "hotel-bath-robe",
    name: "Hotel Bath Robe",
    category: "Bath",
    subcategory: "Robes",
    price: 1850,
    eyebrow: "The slow morning ritual",
    description: "A relaxed unisex robe with a plush looped interior and softly tailored shawl collar.",
    image: `${cdn}/collections/Lifestyle.jpg?v=1786217641&width=1200`,
    gallery: [`${cdn}/collections/Lifestyle.jpg?v=1786217641&width=1600`],
    sizes: ["S/M", "L/XL"],
  },
  {
    slug: "essential-comfort-set",
    name: "Essential Comfort Set",
    category: "Bundles",
    subcategory: "Comfort Bundles",
    price: 2083,
    compareAt: 2450,
    eyebrow: "Instant comfort",
    description: "One airy duvet and two supportive pillows—the simplest way to refresh the feel of your bed.",
    image: `${cdn}/files/comfort-03.jpg?v=1786650565&width=1200`,
    gallery: [`${cdn}/files/500TC-coreplus-lifestyle_1.png?v=1786418965&width=1600`],
    badge: "15% off",
  },
];

export const collections = {
  all: { title: "The Complete Collection", intro: "Considered essentials for every room and every ritual.", category: null, subcategory: null },
  bedroom: { title: "Bedding", intro: "Build a calmer bedroom with breathable cotton and cloud-soft layers.", category: "Bedding", subcategory: null },
  "bed-sheets": { title: "Bed Sheets", intro: "Crisp, breathable Egyptian cotton in a range of refined thread counts.", category: "Bedding", subcategory: "Bed Sheets" },
  "duvet-covers": { title: "Duvet Covers", intro: "Clean lines, quiet texture, and an impeccably made bed.", category: "Bedding", subcategory: "Duvet Covers" },
  duvets: { title: "Duvets & Pillows", intro: "The soft architecture behind a deeply comfortable night.", category: "Bedding", subcategory: "Duvets & Pillows" },
  "duvet-inserts-pillows": { title: "Duvets & Pillows", intro: "The soft architecture behind a deeply comfortable night.", category: "Bedding", subcategory: "Duvets & Pillows" },
  "mattresses-accessories": { title: "Mattress Essentials", intro: "Protective layers that make comfort last longer.", category: "Bedding", subcategory: "Mattress Essentials" },
  bathroom: { title: "Bath", intro: "Turn the everyday bath into a small, restorative ritual.", category: "Bath", subcategory: null },
  towels: { title: "Towels", intro: "Plush Egyptian cotton with exceptional absorbency.", category: "Bath", subcategory: "Towels" },
  "bath-robe": { title: "Robes", intro: "Soft layers made for slower mornings and quieter evenings.", category: "Bath", subcategory: "Robes" },
  "bath-mat": { title: "Bath Mats", intro: "A soft landing, finished with hotel polish.", category: "Bath", subcategory: "Bath Mats" },
  bundles: { title: "Curated Bundles", intro: "Everything you need, thoughtfully paired—and better together.", category: "Bundles", subcategory: null },
  "sleep-bundles": { title: "Sleep Bundles", intro: "Complete bed sets designed to work beautifully together.", category: "Bundles", subcategory: "Sleep Bundles" },
  "comfort-bundles": { title: "Comfort Bundles", intro: "The airy layers that transform how your bed feels.", category: "Bundles", subcategory: "Comfort Bundles" },
  "bath-bundles": { title: "Bath Bundles", intro: "A coordinated bath, from plush towel to finishing mat.", category: "Bundles", subcategory: "Bath Bundles" },
} as const;

export const categories = [
  { title: "Bedding", href: "/collections/bedroom", image: `${cdn}/collections/Unit-500TC-lifestyle-expanded.png?v=1786133185&width=1200`, note: "Sheets · Duvets · Pillows" },
  { title: "Bath", href: "/collections/bathroom", image: `${cdn}/collections/Lifestyle.jpg?v=1786217641&width=1200`, note: "Towels · Robes · Mats" },
  { title: "Bundles", href: "/collections/bundles", image: `${cdn}/collections/Unit-Towels-U08.jpg?v=1786219969&width=1200`, note: "Better together" },
];

export const editorial = {
  hero: `${cdn}/files/banner1.jpg?v=1785100909&width=2560`,
  texture: `${cdn}/files/14.jpg?v=1785105716&width=1920`,
  room: `${cdn}/files/ChatGPT_Image_Jul_31_2026_11_57_24_PM.png?height=1200&v=1785531776`,
};

export const formatPrice = (value: number) => new Intl.NumberFormat("en-EG").format(value) + " EGP";

export function productsForCollection(slug: string) {
  const collection = collections[slug as keyof typeof collections];
  if (!collection) return [];
  return products.filter((product) => {
    if (collection.category && product.category !== collection.category) return false;
    if (collection.subcategory && product.subcategory !== collection.subcategory) return false;
    return true;
  });
}
