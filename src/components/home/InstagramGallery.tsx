"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Heart, ExternalLink } from "lucide-react";

const instagramPosts = [
  {
    id: "1",
    image: "/images/instagram/53.jpg",
    likes: 342,
    caption: "Red roses for a red-hot romance 🌹",
  },
  {
    id: "2",
    image: "/images/instagram/54.jpg",
    likes: 518,
    caption: "Peony season is here 🌸",
  },
  {
    id: "3",
    image: "/images/instagram/55.jpg",
    likes: 267,
    caption: "Sunshine in a vase 🌻",
  },
  {
    id: "4",
    image: "/images/instagram/56.jpg",
    likes: 891,
    caption: "Dream wedding florals ✨",
  },
  {
    id: "5",
    image: "/images/instagram/57.jpg",
    likes: 423,
    caption: "Spring bouquet magic 🌺",
  },
  {
    id: "6",
    image: "/images/instagram/58.jpg",
    likes: 356,
    caption: "White elegance, always timeless 🤍",
  },
];

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-sage-600 hover:text-blush-600 transition-colors mb-2"
          >
            <Instagram className="w-4 h-4" />
            @floraandgrace
          </a>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900">
            Follow Our Story
          </h2>

          <p className="font-body text-sage-500 mt-2">
            Daily floral inspiration on Instagram
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square rounded-2xl overflow-hidden bg-cream-100"
                aria-label={post.caption}
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="font-body font-bold text-sm">
                        {post.likes}
                      </span>
                    </div>

                    <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-cream-300 font-body font-medium text-sage-700 hover:border-blush-400 hover:text-blush-700 transition-all"
          >
            <Instagram className="w-4 h-4" />
            Follow @floraandgrace
          </a>
        </div>
      </div>
    </section>
  );
}