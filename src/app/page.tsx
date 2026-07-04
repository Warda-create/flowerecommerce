import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSelling from "@/components/home/BestSelling";
import NewArrivals from "@/components/home/NewArrivals";
import ShopByOccasion from "@/components/home/ShopByOccasion";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Flora & Grace — Premium Flower Shop | Handcrafted Bouquets",
  description:
    "Discover premium handcrafted bouquets delivered fresh to your door. Shop roses, peonies, mixed bouquets and more. Same-day delivery available in NYC.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedCategories />
      <BestSelling />
      <NewArrivals />
      <ShopByOccasion />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </>
  );
}