"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Award, Heart } from "lucide-react";

const milestones = [
  { year: "2008", event: "Founded in a small NYC studio apartment" },
  { year: "2012", event: "Opened our first flagship store in Manhattan" },
  { year: "2016", event: "Launched nationwide same-day delivery" },
  { year: "2020", event: "Achieved B Corp certification for sustainability" },
  { year: "2024", event: "Served our 50,000th happy customer" },
];

export default function BrandStory() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury">
              <Image
                src="/images/categories/108.jpg"
                alt="Our floral studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-card p-5 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-gold-500" />
                <span className="font-body text-xs font-bold text-sage-700 uppercase tracking-wide">
                  Award Winning
                </span>
              </div>
              <p className="font-display text-sm text-sage-800 leading-snug">
                Best Florist NYC — 5 years running
              </p>
            </div>
            {/* Small accent image */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-card border-4 border-white">
              <Image
                src="/images/categories/109.jpg"
                alt="Fresh peonies"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-body text-xs font-semibold text-blush-500 tracking-[0.2em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-sage-900 leading-tight mb-6">
              Born from a Love of Flowers
            </h2>
            <div className="space-y-4 font-body text-sage-600 leading-relaxed text-base mb-8">
              <p>
                Flora & Grace began in 2008 when founder Grace Laurent, freshly returned from
                training at the École Nationale Supérieure de Fleuriste in Paris, decided that
                New York deserved flowers arranged with the same artistry and passion she had
                discovered in Europe.
              </p>
              <p>
                From a small studio apartment, she began creating breathtaking arrangements
                for a handful of devoted clients. Word spread quickly — not just about the
                beauty of the flowers, but about the care and attention that went into every
                single arrangement.
              </p>
              <p>
                Today, Flora & Grace is a team of 35 passionate florists serving over 50,000
                customers across the country. Our commitment hasn&apos;t changed: every bouquet
                is a labor of love, crafted with the finest sustainably sourced blooms.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "16", label: "Years of Excellence" },
                { value: "100%", label: "Sustainably Sourced" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 bg-blush-50 rounded-2xl">
                  <p className="font-display text-2xl font-bold text-blush-700 mb-0.5">
                    {value}
                  </p>
                  <p className="font-body text-xs text-sage-500">{label}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-display font-bold text-sm text-blush-600 w-12 shrink-0">
                    {m.year}
                  </span>
                  <p className="font-body text-sm text-sage-600">{m.event}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}