"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Truck, Shield } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-cream-50 via-blush-50 to-rose-50">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blush-100/50 -translate-y-1/4 translate-x-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-rose-100/40 translate-y-1/3 -translate-x-1/4 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-cream-200/60 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="font-body text-sm text-sage-600 font-medium">
              Trusted by 50,000+ happy customers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-sage-900 leading-[1.05] tracking-tight mb-6"
          >
            Beautiful{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blush-600">Flowers</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-blush-200/60 rounded-full -z-0" />
            </span>
            ,<br />
            Delivered with{" "}
            <span className="text-sage-600 italic font-accent">Love</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-lg text-sage-600 leading-relaxed mb-8 max-w-lg"
          >
            Handcrafted bouquets from sustainably sourced blooms, delivered fresh
            to your door. Every arrangement is a work of art designed to bring joy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <Link href="/shop">
              <Button
                variant="luxury"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="text-base shadow-luxury"
              >
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="xl" className="text-base">
                Our Story
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            {[
              { icon: Truck, text: "Free delivery over $75" },
              { icon: Shield, text: "7-day freshness guarantee" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white shadow-soft flex items-center justify-center">
                  <Icon className="w-4 h-4 text-blush-500" />
                </div>
                <span className="font-body text-sm text-sage-600">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden lg:block"
        >
          {/* Main image */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] bg-gradient-to-br from-blush-200 to-rose-200 rotate-6" />
            <div
              className="absolute inset-4 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80')",
              }}
            />

            {/* Floating cards */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-card p-3 flex items-center gap-2.5 w-40"
            >
              <div className="w-8 h-8 rounded-xl bg-blush-100 flex items-center justify-center text-lg shrink-0">
                🌹
              </div>
              <div>
                <p className="font-display text-xs font-bold text-sage-900">New Arrival</p>
                <p className="font-body text-[10px] text-sage-500">Spring Collection</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -right-6 bottom-1/4 bg-white rounded-2xl shadow-card p-3 w-36"
            >
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="font-body text-[10px] text-sage-600 leading-snug">
                &ldquo;Absolutely stunning!&rdquo;
              </p>
              <p className="font-body text-[10px] font-semibold text-sage-800 mt-0.5">
                — Sophia M.
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [-6, 2, -6] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-4 right-8 bg-blush-600 text-white rounded-2xl shadow-luxury p-3 text-center w-28"
            >
              <p className="font-display text-2xl font-bold">50K+</p>
              <p className="font-body text-[10px] text-blush-200">Happy Customers</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-body text-xs text-sage-400 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-6 bg-gradient-to-b from-sage-300 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}