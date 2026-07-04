"use client";

import { useState } from "react";
import { X, Truck, Tag, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const announcements = [
  {
    id: 1,
    icon: <Truck className="w-3.5 h-3.5 shrink-0" />,
    text: "Free delivery on orders over $75",
    link: "/shop",
    linkText: "Shop now",
  },
  {
    id: 2,
    icon: <Tag className="w-3.5 h-3.5 shrink-0" />,
    text: "Use code BLOOM20 for 20% off your first order",
    link: "/shop",
    linkText: "Claim offer",
  },
  {
    id: 3,
    icon: <Phone className="w-3.5 h-3.5 shrink-0" />,
    text: "Same-day delivery available — order by 2 PM",
    link: "/shop",
    linkText: "Order now",
  },
];

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-blush-700 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9 text-xs">
              {/* Prev arrow */}
              <button
                onClick={() =>
                  setCurrentIndex(
                    (i) => (i - 1 + announcements.length) % announcements.length
                  )
                }
                className="p-1 opacity-60 hover:opacity-100 transition-opacity hidden sm:block"
                aria-label="Previous announcement"
              >
                ‹
              </button>

              {/* Message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex items-center justify-center gap-2 text-center"
                >
                  {current.icon}
                  <span className="font-body tracking-wide">
                    {current.text}
                  </span>
                  <Link
                    href={current.link}
                    className="underline underline-offset-2 font-semibold hover:text-cream-200 transition-colors ml-1"
                  >
                    {current.linkText} →
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Next arrow + close */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentIndex((i) => (i + 1) % announcements.length)
                  }
                  className="p-1 opacity-60 hover:opacity-100 transition-opacity hidden sm:block"
                  aria-label="Next announcement"
                >
                  ›
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 opacity-60 hover:opacity-100 transition-opacity ml-1"
                  aria-label="Close announcement"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}