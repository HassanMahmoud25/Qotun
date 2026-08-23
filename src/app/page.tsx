import { HomeHero } from "@/components/home-hero";
import {
  HomeBedBuilderFeature,
  HomeBrandIntro,
  HomeCategories,
  HomeFavourites,
  HomeHospitalityBanner,
  HomeReviews,
  HomeSpotlights,
  HomeTrustStrip,
} from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeTrustStrip />
      <HomeCategories />
      <HomeFavourites />
      <HomeSpotlights />
      <HomeReviews />
      <HomeBrandIntro />
      <HomeBedBuilderFeature />
      <HomeHospitalityBanner />
    </main>
  );
}
