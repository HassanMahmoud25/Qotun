# Qotun Storefront Concept

A polished e-commerce redesign for Qotun, built with Next.js App Router, TypeScript, React, and Tailwind CSS.

The visual system takes inspiration from Brooklinen’s friendly, product-first personality: warm off-whites, deep navy, soft utility colors, compact editorial typography, horizontal shopping rails, social proof, and subtle motion. It uses the licensed Google-font pairing Nunito Sans and Lora as close alternatives to Brooklinen’s proprietary Brandon Text and Toledo TS families.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Included

- Editorial, responsive storefront homepage
- Collection and subcategory routes
- Product detail pages with gallery, size selection, quantity, and wishlist feedback
- Product-card lifestyle reveals, ratings, colour swatches, badges, and animated quick-add controls
- Persistent local shopping bag and cart drawer
- Cart, checkout prototype, search, and account pages
- Story, hospitality/B2B, contact, FAQ, delivery, returns, and terms pages
- Responsive mobile navigation and reduced-motion support

Product content is defined in `src/lib/data.ts`. This front-end concept uses Qotun’s current Shopify CDN imagery as the visual source. Connect the data layer and checkout to Shopify or another commerce backend before production launch.

## Quality checks

```bash
npm run lint
npm run build
```
