"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart, Gift, Star, Flower, Sun, Trophy, ArrowRight
} from "lucide-react";
import { occasions } from "@/data/occasions";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Gift,
  Star,
  Flower,
  Flower2: Flower,
  Sun,
  Trophy,
};

export default function ShopByOccasion() {
  return (
    <section className="py-20 bg-gradient-to-b from-blush-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-xs font-semibold text-blush-500 tracking-[0.2em] uppercase mb-2">
            Find the Perfect Gift
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900">
            Shop by Occasion
          </h2>
          <p className="font-body text-sage-500 mt-2 max-w-xl mx-auto">
            Whatever the moment, we have the perfect floral arrangement to make it unforgettable
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {occasions.map((occasion, index) => {
            const Icon = iconMap[occasion.icon] || Heart;
            return (
              <motion.div
                key={occasion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <Link
                  href={`/shop?occasion=${occasion.slug}`}
                  className="group relative block rounded-2xl overflow-hidden aspect-[3/4] shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <Image
                    src={occasion.image}
                    alt={occasion.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 border border-white/30">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-white text-sm leading-tight mb-0.5">
                      {occasion.name}
                    </h3>
                    <p className="font-body text-[11px] text-cream-300">
                      {occasion.productCount} arrangements
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blush-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-blush-700 font-body font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}