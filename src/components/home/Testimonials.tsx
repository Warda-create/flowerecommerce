"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((i) => (i + 1) % testimonials.length);

  const getVisible = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % testimonials.length);
    }
    return indices;
  };

  return (
    <section className="py-20 bg-sage-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-xs font-semibold text-blush-400 tracking-[0.2em] uppercase mb-2">
            What Our Customers Say
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Stories of Joy
          </h2>
          <p className="font-body text-cream-400 mt-2">
            Real experiences from real flower lovers
          </p>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
          {getVisible().map((idx, pos) => {
            const testimonial = testimonials[idx];
            return (
              <motion.div
                key={`${testimonial.id}-${pos}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: pos * 0.1 }}
                className={cn(
                  "bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col transition-all duration-300",
                  pos === 1 && "bg-blush-700/20 border-blush-500/30 scale-105 shadow-luxury"
                )}
              >
                <Quote className="w-8 h-8 text-blush-400/60 mb-4" />
                <p className="font-body text-sm text-cream-200 leading-relaxed flex-1 mb-5">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blush-700">
                    {testimonial.avatar && (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-white">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-xs text-cream-400">
                      {testimonial.location} · {testimonial.occasion}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <Quote className="w-7 h-7 text-blush-400/60 mb-3" />
              <p className="font-body text-sm text-cream-200 leading-relaxed mb-4">
                &ldquo;{testimonials[current].comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blush-700">
                  {testimonials[current].avatar && (
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-white">
                    {testimonials[current].name}
                  </p>
                  <p className="font-body text-xs text-cream-400">
                    {testimonials[current].location}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 text-cream-400 hover:text-white hover:border-white/40 flex items-center justify-center transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "rounded-full transition-all",
                  i === current ? "w-5 h-1.5 bg-blush-400" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 text-cream-400 hover:text-white hover:border-white/40 flex items-center justify-center transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}