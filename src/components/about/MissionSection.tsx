"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Globe, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Crafted with Passion",
    description:
      "Every arrangement is hand-crafted by our master florists who bring artistry, creativity, and genuine love for flowers to every bouquet they create.",
    color: "bg-blush-50 text-blush-600",
  },
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    description:
      "We work exclusively with certified sustainable farms that use eco-friendly practices, fair wages, and responsible water usage. Beauty should never cost the planet.",
    color: "bg-sage-50 text-sage-600",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Heart",
    description:
      "While we source from the world's finest flower-growing regions — Colombia, Kenya, Holland — we stay deeply rooted in our local communities through charitable partnerships.",
    color: "bg-cream-100 text-cream-700",
  },
  {
    icon: Sparkles,
    title: "Experience, Not Just Flowers",
    description:
      "We believe sending flowers is an experience — from the moment you browse our collection to the delight on the recipient's face. Every detail matters to us.",
    color: "bg-gold-50 text-gold-600",
  },
];

export default function MissionSection() {
  return (
    <section className="py-20 bg-sage-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <p className="font-body text-xs font-semibold text-blush-400 tracking-[0.2em] uppercase mb-3">
            Our Mission
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Connecting People Through the Language of Flowers
          </h2>
          <p className="font-body text-lg text-cream-300 leading-relaxed">
            We believe that flowers are one of humanity&apos;s most powerful tools for
            expressing emotion — love, gratitude, sympathy, celebration. Our mission
            is to make that expression accessible, beautiful, and sustainable.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, description, color }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/8 transition-colors"
            >
              <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                {title}
              </h3>
              <p className="font-body text-sm text-cream-400 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            "Certified B Corp",
            "Rainforest Alliance",
            "Fair Trade Certified",
            "Sustainably Grown",
            "Carbon Neutral Delivery",
          ].map((cert) => (
            <div
              key={cert}
              className="flex items-center gap-2 text-cream-400 font-body text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-blush-400" />
              {cert}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}