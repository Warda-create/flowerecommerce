"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getBestSellers } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function BestSelling() {
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blush-500" />
              <p className="font-body text-xs font-semibold text-blush-500 tracking-[0.2em] uppercase">
                Customer Favourites
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900">
              Best Selling Bouquets
            </h2>
            <p className="font-body text-sage-500 mt-2 max-w-md">
              Our most-loved arrangements, chosen by thousands of happy customers
            </p>
          </div>
          <Link
            href="/shop?sort=popularity"
            className="hidden md:flex items-center gap-2 font-body text-sm font-medium text-blush-600 hover:text-blush-700 transition-colors"
          >
            See all bestsellers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <ProductCard product={product} priority={index < 2} />
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/shop?sort=popularity"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-blush-600 hover:text-blush-700 transition-colors"
          >
            See all bestsellers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}