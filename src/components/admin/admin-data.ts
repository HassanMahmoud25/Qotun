import {
  BagIcon,
  HomeIcon,
  ShopIcon,
  TagIcon,
  UserIcon,
  ViewIcon,
} from "@/components/icons";
import { formatPrice, products } from "@/lib/data";

export type OrderStatus = "Ready" | "Review" | "In transit" | "Delayed";

export const nav = [
  { label: "Overview", icon: HomeIcon },
  { label: "Orders", icon: BagIcon, count: 12 },
  { label: "Products", icon: ShopIcon },
  { label: "Inventory", icon: TagIcon, count: 4 },
  { label: "Customers", icon: UserIcon },
  { label: "Marketing", icon: ViewIcon },
];

export const initialOrders: Array<{
  id: string;
  customer: string;
  initials: string;
  city: string;
  item: string;
  total: string;
  status: OrderStatus;
  time: string;
}> = [
  {
    id: "#QT-2849",
    customer: "Mariam El-Sayed",
    initials: "ME",
    city: "New Cairo",
    item: "Luxe Essential Bundle",
    total: "14,285 EGP",
    status: "Ready",
    time: "8 min ago",
  },
  {
    id: "#QT-2848",
    customer: "Omar Khalil",
    initials: "OK",
    city: "Sheikh Zayed",
    item: "Luxe Bed Core Set",
    total: "8,430 EGP",
    status: "Review",
    time: "24 min ago",
  },
  {
    id: "#QT-2847",
    customer: "Nour Hassan",
    initials: "NH",
    city: "Alexandria",
    item: "Full House Bath Set",
    total: "6,270 EGP",
    status: "In transit",
    time: "42 min ago",
  },
  {
    id: "#QT-2846",
    customer: "Karim Youssef",
    initials: "KY",
    city: "Maadi",
    item: "Tranquility Bundle",
    total: "12,165 EGP",
    status: "Delayed",
    time: "1 hr ago",
  },
];

export const statusFilters = ["All", "Ready", "Review", "Delayed"] as const;

export const sectionRoutes: Record<string, string> = {
  Overview: "/admin",
  Orders: "/admin/orders",
  Products: "/admin/products",
  Inventory: "/admin/inventory",
  Customers: "/admin/customers",
  Marketing: "/admin/marketing",
  Fulfillment: "/admin/fulfillment",
  "Returns & CX": "/admin/returns-cx",
  Automation: "/admin/automation",
  Reports: "/admin/reports",
};

export type ManagementRow = {
  name: string;
  detail: string;
  value: string;
  status: string;
};

export const managementData: Record<
  string,
  {
    eyebrow: string;
    description: string;
    primary: string;
    metrics: [string, string, string][];
    rows: ManagementRow[];
  }
> = {
  Products: {
    eyebrow: "CATALOG HEALTH",
    description: "Manage assortment, pricing, merchandising, and publishing.",
    primary: "Add product",
    metrics: [
      ["ACTIVE PRODUCTS", "12", "All channels"],
      ["AVG. MARGIN", "61.8%", "+2.4% this quarter"],
      ["BUNDLE ATTACH", "18.6%", "+4.1% this month"],
    ],
    rows: products.slice(0, 6).map((p) => ({
      name: p.name,
      detail: `${p.category} · ${p.subcategory}`,
      value: formatPrice(p.price),
      status: p.badge ? "Promoted" : "Active",
    })),
  },
  Inventory: {
    eyebrow: "DEMAND PLANNING",
    description:
      "Forecast demand, prevent stockouts, and coordinate purchase orders.",
    primary: "Create purchase order",
    metrics: [
      ["STOCK VALUE", "2.46M EGP", "Across 148 variants"],
      ["AT RISK", "4", "Within 14 days"],
      ["SELL-THROUGH", "72.4%", "+8.2% vs target"],
    ],
    rows: products.slice(3, 9).map((p, i) => ({
      name: p.name,
      detail: `${[9, 14, 22, 28, 35, 41][i]} days of cover`,
      value: `${[18, 34, 49, 64, 71, 83][i]} units`,
      status: i < 2 ? "Reorder" : "Healthy",
    })),
  },
  Customers: {
    eyebrow: "CUSTOMER INTELLIGENCE",
    description: "Understand loyalty, lifetime value, and conversion journeys.",
    primary: "Create segment",
    metrics: [
      ["ACTIVE CUSTOMERS", "18,420", "+12.8% YoY"],
      ["CUSTOMER PULSE", "92", "Exceptional"],
      ["REPEAT RATE", "31.4%", "Top 12% of category"],
    ],
    rows: [
      {
        name: "Mariam El-Sayed",
        detail: "New Cairo · 8 orders",
        value: "68,420 EGP LTV",
        status: "Champion",
      },
      {
        name: "Omar Khalil",
        detail: "Sheikh Zayed · 5 orders",
        value: "42,880 EGP LTV",
        status: "Loyal",
      },
      {
        name: "Nour Hassan",
        detail: "Alexandria · 3 orders",
        value: "21,460 EGP LTV",
        status: "Growing",
      },
      {
        name: "Salma Farouk",
        detail: "Maadi · 1 order",
        value: "9,250 EGP LTV",
        status: "New",
      },
    ],
  },
  Marketing: {
    eyebrow: "GROWTH STUDIO",
    description:
      "Build audiences and campaigns from predictive customer intent.",
    primary: "Create campaign",
    metrics: [
      ["ATTRIBUTED SALES", "486K EGP", "+22.5%"],
      ["BLENDED ROAS", "6.8×", "+1.2× vs target"],
      ["OPEN OPPORTUNITY", "186K EGP", "412 customers"],
    ],
    rows: [
      {
        name: "Complete your sleep system",
        detail: "WhatsApp · 412 recipients",
        value: "Est. 186K EGP",
        status: "Draft",
      },
      {
        name: "Hotel-at-home edit",
        detail: "Email · 3,820 recipients",
        value: "8.4× ROAS",
        status: "Live",
      },
      {
        name: "Bath reset",
        detail: "Meta · Retargeting",
        value: "5.9× ROAS",
        status: "Live",
      },
      {
        name: "Win-back: 90 days",
        detail: "Email + WhatsApp",
        value: "62K EGP",
        status: "Scheduled",
      },
    ],
  },
  Fulfillment: {
    eyebrow: "DELIVERY CONTROL",
    description:
      "Monitor every shipment against customer promise and carrier SLA.",
    primary: "Create batch",
    metrics: [
      ["ON-TIME RATE", "96.8%", "+1.6% this month"],
      ["READY TO SHIP", "43", "12 priority"],
      ["AVG. DISPATCH", "3h 17m", "43m under target"],
    ],
    rows: [
      {
        name: "Cairo morning wave",
        detail: "21 orders · Bosta",
        value: "10:30 cutoff",
        status: "Packing",
      },
      {
        name: "Giza express",
        detail: "14 orders · Mylerz",
        value: "11:15 cutoff",
        status: "Ready",
      },
      {
        name: "Alexandria linehaul",
        detail: "8 orders · Bosta",
        value: "13:00 cutoff",
        status: "At risk",
      },
      {
        name: "Upper Egypt",
        detail: "6 orders · Aramex",
        value: "15:30 cutoff",
        status: "Queued",
      },
    ],
  },
  "Returns & CX": {
    eyebrow: "CUSTOMER CARE",
    description:
      "Resolve returns and service conversations without losing context.",
    primary: "New case",
    metrics: [
      ["OPEN CASES", "17", "4 priority"],
      ["FIRST RESPONSE", "6m", "−3m this week"],
      ["RETURN RATE", "3.2%", "Below 5% target"],
    ],
    rows: [
      {
        name: "#CX-1924 · Exchange size",
        detail: "Mariam A. · WhatsApp",
        value: "4 min ago",
        status: "Priority",
      },
      {
        name: "#CX-1923 · Delivery question",
        detail: "Omar K. · Email",
        value: "12 min ago",
        status: "Open",
      },
      {
        name: "#RT-0841 · Return requested",
        detail: "Nour H. · Luxe Core Set",
        value: "1,290 EGP",
        status: "Review",
      },
      {
        name: "#CX-1921 · Care guidance",
        detail: "Salma F. · Instagram",
        value: "38 min ago",
        status: "Waiting",
      },
    ],
  },
  Automation: {
    eyebrow: "OPERATIONS ENGINE",
    description: "Design workflows for orders, stock, care, and retention.",
    primary: "Build automation",
    metrics: [
      ["ACTIVE FLOWS", "18", "100% healthy"],
      ["RUNS THIS MONTH", "12,849", "99.7% success"],
      ["TIME SAVED", "184h", "Est. 92K EGP"],
    ],
    rows: [
      {
        name: "VIP order prioritization",
        detail: "Order created → tag + priority queue",
        value: "2,481 runs",
        status: "Active",
      },
      {
        name: "Stockout prevention",
        detail: "14 days cover → alert + draft PO",
        value: "38 runs",
        status: "Active",
      },
      {
        name: "Post-delivery care",
        detail: "Delivered + 3 days → WhatsApp",
        value: "1,824 runs",
        status: "Active",
      },
      {
        name: "High-risk return review",
        detail: "Return score > 70 → manual review",
        value: "14 runs",
        status: "Paused",
      },
    ],
  },
  Reports: {
    eyebrow: "DECISION CENTER",
    description:
      "Turn live commerce data into operational and executive reporting.",
    primary: "Build report",
    metrics: [
      ["SCHEDULED REPORTS", "8", "Next in 42 min"],
      ["DATA FRESHNESS", "Live", "Updated seconds ago"],
      ["SHARED VIEWS", "14", "Across 6 teammates"],
    ],
    rows: [
      {
        name: "Weekly executive brief",
        detail: "Revenue, CX, operations",
        value: "22 Aug 2026",
        status: "Ready",
      },
      {
        name: "Inventory cover forecast",
        detail: "Variant-level · 90 days",
        value: "21 Aug 2026",
        status: "Ready",
      },
      {
        name: "Marketing attribution",
        detail: "Blended channel view",
        value: "Daily 08:00",
        status: "Scheduled",
      },
      {
        name: "Customer cohort analysis",
        detail: "Acquisition month",
        value: "Monthly",
        status: "Scheduled",
      },
    ],
  },
};
