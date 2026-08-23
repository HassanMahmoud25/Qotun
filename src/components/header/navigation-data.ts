export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  feature?: { title: string; href: string; image: string };
};

export const categories: NavItem[] = [
  {
    label: "Bedding",
    href: "/collections/bedroom",
    children: [
      { label: "Bed sheets", href: "/collections/bed-sheets" },
      { label: "Compare fabrics", href: "/fabric-guide" },
      { label: "Duvet covers", href: "/collections/duvet-covers" },
      { label: "Duvets & pillows", href: "/collections/duvets" },
      {
        label: "Mattress essentials",
        href: "/collections/mattresses-accessories",
      },
    ],
    feature: {
      title: "Fresh sheets, better mornings",
      href: "/collections/bed-sheets",
      image:
        "https://qotun.net/cdn/shop/collections/Unit-500TC-lifestyle-expanded.png?v=1786133185&width=1200",
    },
  },
  {
    label: "Bath",
    href: "/collections/bathroom",
    children: [
      { label: "Towels", href: "/collections/towels" },
      { label: "Robes", href: "/collections/bath-robe" },
      { label: "Bath mats", href: "/collections/bath-mat" },
    ],
    feature: {
      title: "Bring the spa home",
      href: "/collections/bathroom",
      image:
        "https://qotun.net/cdn/shop/collections/Lifestyle.jpg?v=1786217641&width=1200",
    },
  },
  {
    label: "Bundles",
    href: "/collections/bundles",
    children: [
      { label: "Sleep bundles", href: "/collections/sleep-bundles" },
      { label: "Comfort bundles", href: "/collections/comfort-bundles" },
      { label: "Bath bundles", href: "/collections/bath-bundles" },
    ],
    feature: {
      title: "Everything you need, beautifully bundled",
      href: "/collections/bundles",
      image:
        "https://qotun.net/cdn/shop/files/big-bundle-500TC-03.jpg?v=1786650587&width=1200",
    },
  },
];

export const secondary = [
  { label: "Build your bed", href: "/build-your-bed" },
  { label: "Compare", href: "/compare" },
  { label: "Our story", href: "/pages/about" },
];
