"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getNewArrivals } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function NewArrivals() {
  const newArrivals = getNewArrivals().slice(0, 3);
  const [featured, ...rest] = newArrivals;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-blush-500" />
            <p className="font-body text-xs font-semibold text-blush-500 tracking-[0.2em] uppercase">
              Fresh From Our Florists
            </p>
            <Sparkles className="w-4 h-4 text-blush-500" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900">
            New Arrivals
          </h2>
          <p className="font-body text-sage-500 mt-2">
            The latest additions to our curated floral collection
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured large card */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={`/shop/${featured.slug}`}
                className="group relative block aspect-[4/3] rounded-3xl overflow-hidden bg-cream-50 shadow-card"
              >
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="new">New Arrival</Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-body text-xs text-cream-300 tracking-wide uppercase mb-1">
                    {featured.category}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {featured.name}
                  </h3>
                  <p className="font-body text-sm text-cream-200 mb-3 line-clamp-2">
                    {featured.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-white">
                      {formatPrice(featured.price)}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-body font-medium px-3 py-1.5 rounded-full border border-white/30 group-hover:bg-white/30 transition-colors">
                      Shop Now <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Two smaller cards */}
          <div className="flex flex-col gap-6">
            {rest.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="group flex gap-4 bg-cream-50 rounded-2xl p-4 hover:bg-blush-50 transition-colors"
                >
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-white shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <Badge variant="new" size="xs">New</Badge>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="font-body text-xs text-blush-500 uppercase tracking-wide mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-display font-semibold text-sage-900 group-hover:text-blush-700 transition-colors leading-snug mb-1">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-sage-500 line-clamp-2 mb-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sage-900">
                        {formatPrice(product.price)}
                      </span>
                      <span className="font-body text-xs text-blush-600 font-medium group-hover:underline">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* CTA */}
            <Link href="/shop?new=true">
              <Button variant="outline" fullWidth size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}