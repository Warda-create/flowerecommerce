import type { Metadata } from "next";
import BrandStory from "@/components/about/BrandStory";
import MissionSection from "@/components/about/MissionSection";
import TeamSection from "@/components/about/TeamSection";
import Breadcrumb from "@/components/common/Breadcrumb";
import Newsletter from "@/components/layout/Newsletter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Flora & Grace — our story, our mission, and the passionate team of florists behind every beautiful arrangement.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blush-50 to-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "About Us" }]} className="mb-6" />
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold text-blush-500 tracking-[0.2em] uppercase mb-3">
              Our Journey
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 leading-tight">
              We Are Flora & Grace
            </h1>
            <p className="font-body text-lg text-sage-600 mt-4 leading-relaxed">
              A team of passionate florists on a mission to connect people through the
              timeless beauty of flowers — sustainably, artistically, joyfully.
            </p>
          </div>
        </div>
      </div>

      <BrandStory />
      <MissionSection />
      <TeamSection />
      <Newsletter />
    </>
  );
}