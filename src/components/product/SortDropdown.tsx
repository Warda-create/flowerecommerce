"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SortDropdown({ value, onChange, className }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = sortOptions.find((o) => o.value === value) || sortOptions[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-200 rounded-xl text-sm font-body text-sage-700 hover:border-blush-300 transition-all min-w-[180px] justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sage-400 text-xs">Sort:</span>
        <span className="font-medium flex-1 text-left">{selected.label}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-sage-400 transition-transform shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-card border border-cream-100 overflow-hidden z-30 py-1"
            role="listbox"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2.5 text-sm font-body text-left transition-colors",
                  option.value === value
                    ? "text-blush-600 bg-blush-50 font-medium"
                    : "text-sage-700 hover:bg-cream-50"
                )}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
                {option.value === value && (
                  <Check className="w-4 h-4 text-blush-500 shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}