import NextImage, { type ImageProps } from "next/image";

// Must match the `qotun.net` / "/cdn/shop/**" remotePattern in next.config.ts.
const SHOPIFY_CDN_HOSTNAME = "qotun.net";
const SHOPIFY_CDN_PATH_PREFIX = "/cdn/shop/";

function isShopifyCdnUrl(src: ImageProps["src"]) {
  if (typeof src !== "string") return false;
  try {
    const url = new URL(src);
    return (
      url.hostname === SHOPIFY_CDN_HOSTNAME &&
      url.pathname.startsWith(SHOPIFY_CDN_PATH_PREFIX)
    );
  } catch {
    return false;
  }
}

// Qotun's product/collection/logo imagery is served from Shopify's CDN, which
// already resizes (via its own `width` param) and negotiates WebP/AVIF output.
// Routing it through Vercel's Image Optimization API too is redundant and makes
// every image on the site depend on that API's quota, so it's bypassed here.
// Local assets and any other external source keep normal Next.js optimization.
export default function Image({ unoptimized, ...props }: ImageProps) {
  return (
    <NextImage
      {...props}
      unoptimized={unoptimized ?? isShopifyCdnUrl(props.src)}
    />
  );
}
