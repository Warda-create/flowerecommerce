"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getFeaturedCategories } from "@/data/categories";

export default function FeaturedCategories() {
  const categories = getFeaturedCategories().slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs font-semibold text-blush-500 tracking-[0.2em] uppercase mb-2">
              Browse by Type
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-blush-600 hover:text-blush-700 transition-colors"
          >
            View all categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Link
                href={`/shop?category=${category.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-cream-50 mb-3 shadow-soft group-hover:shadow-card transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="w-3 h-3 text-blush-600" />
                  </div>
                </div>
                <h3 className="font-display text-sm font-semibold text-sage-800 group-hover:text-blush-600 transition-colors">
                  {category.name}
                </h3>
                <p className="font-body text-xs text-sage-400 mt-0.5">
                  {category.productCount} products
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-blush-600 hover:text-blush-700 transition-colors"
          >
            View all categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}