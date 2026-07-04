"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "/images/hero/7.jpg",
    badge: "Valentine's Day Collection",
    title: "Love in Every Petal",
    subtitle: "Handcrafted bouquets that speak louder than words",
    cta: { label: "Shop Romance", href: "/shop?occasion=valentines-day" },
    ctaSecondary: { label: "Customize Bouquet", href: "/shop" },
    accent: "from-blush-900/70 to-blush-700/20",
  },
  {
    id: 2,
    image: "/images/hero/4.jpg",
    badge: "New Season Collection",
    title: "Spring Has Arrived",
    subtitle: "Fresh peonies, tulips, and seasonal blooms now in stock",
    cta: { label: "Explore Spring", href: "/shop?category=peonies" },
    ctaSecondary: { label: "View New Arrivals", href: "/shop?new=true" },
    accent: "from-sage-900/60 to-sage-700/10",
  },
  {
    id: 3,
    image: "/images/hero/6.jpg",
    badge: "Wedding & Events",
    title: "Your Perfect Day Deserves Perfect Flowers",
    subtitle: "Bespoke floral arrangements for weddings and special events",
    cta: { label: "Wedding Florals", href: "/shop?occasion=wedding" },
    ctaSecondary: { label: "Get a Quote", href: "/contact" },
    accent: "from-cream-900/60 to-cream-700/10",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, []);

  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="relative h-[75vh] md:h-[85vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured collections"
    >
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {/* Background image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    slide.accent
                  )}
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                      <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block font-body text-xs font-semibold text-cream-200 tracking-[0.2em] uppercase mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                      >
                        {slide.badge}
                      </motion.span>

                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
                      >
                        {slide.title}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="font-body text-lg text-cream-200 mb-8 leading-relaxed"
                      >
                        {slide.subtitle}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-3"
                      >
                        <Link href={slide.cta.href}>
                          <Button variant="luxury" size="lg">
                            {slide.cta.label}
                          </Button>
                        </Link>
                        <Link href={slide.ctaSecondary.href}>
                          <Button
                            variant="white"
                            size="lg"
                            className="bg-white/15 backdrop-blur-sm border-white/30 text-white hover:bg-white/25"
                          >
                            {slide.ctaSecondary.label}
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 flex items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 flex items-center justify-center transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "rounded-full transition-all duration-300",
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}