"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream-50 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt={`${productName} - image ${activeIndex + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-sage-600 shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-blush-600"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-sage-600 shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-blush-600"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Zoom button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-sage-600 shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-blush-600"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "rounded-full transition-all",
                    i === activeIndex
                      ? "w-4 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/60 hover:bg-white/80"
                  )}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                  i === activeIndex
                    ? "border-blush-500 shadow-glow"
                    : "border-transparent hover:border-blush-200"
                )}
                aria-label={`View image ${i + 1}`}
                aria-current={i === activeIndex}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoom"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-2xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={productName}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}