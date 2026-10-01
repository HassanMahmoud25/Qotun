import NextImage, { type ImageProps } from "next/image";

// Vercel's Image Optimization API has proven unreliable in production for this
// project, so `images.unoptimized` is set globally in next.config.ts and no
// image here passes its own `unoptimized` value (doing so would override that
// global default per-instance). This wrapper stays as the single import point
// for next/image across the app.
export default function Image(props: ImageProps) {
  return <NextImage {...props} />;
}
