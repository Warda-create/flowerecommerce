"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types";
import { formatPrice, debounce } from "@/lib/utils";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = [
  "Red roses",
  "Peonies",
  "Birthday bouquet",
  "Wedding flowers",
  "Sunflowers",
  "Mother's Day",
];

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const stored = localStorage.getItem("flora-recent-searches");
      if (stored) setRecentSearches(JSON.parse(stored).slice(0, 5));
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const performSearch = useCallback(
    debounce((q: string) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const lower = q.toLowerCase();
      const found = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower) ||
            p.tags.some((t) => t.toLowerCase().includes(lower)) ||
            p.flowerTypes.some((f) => f.toLowerCase().includes(lower))
        )
        .slice(0, 6);
      setResults(found);
    }, 250),
    []
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    performSearch(value);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("flora-recent-searches", JSON.stringify(updated));
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
      window.location.href = `/shop?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 inset-x-0 z-50 bg-white shadow-luxury"
          >
            <div className="max-w-3xl mx-auto px-4 py-4">
              {/* Search input */}
              <form onSubmit={handleSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Search flowers, occasions, arrangements…"
                  className="w-full pl-12 pr-12 py-3.5 bg-cream-50 border border-cream-200 rounded-2xl font-body text-sage-800 placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300 transition-all"
                  aria-label="Search products"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => handleQueryChange("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-sage-400 hover:text-sage-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Results / suggestions */}
              <div className="mt-4 pb-4">
                {results.length > 0 ? (
                  <div>
                    <p className="text-xs font-body font-semibold text-sage-400 uppercase tracking-wider mb-3">
                      Products
                    </p>
                    <div className="space-y-1">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={() => {
                            handleSearch(query);
                            onClose();
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-blush-50 transition-colors group"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body font-medium text-sage-800 text-sm truncate group-hover:text-blush-600 transition-colors">
                              {product.name}
                            </p>
                            <p className="font-body text-xs text-sage-500">
                              {product.category}
                            </p>
                          </div>
                          <span className="font-body font-semibold text-sm text-blush-600 shrink-0">
                            {formatPrice(product.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                    {results.length === 6 && (
                      <Link
                        href={`/shop?search=${encodeURIComponent(query)}`}
                        onClick={() => {
                          handleSearch(query);
                          onClose();
                        }}
                        className="flex items-center gap-2 mt-3 px-2 py-2 text-sm font-body text-blush-600 hover:text-blush-700 font-medium transition-colors"
                      >
                        View all results for &ldquo;{query}&rdquo;
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                ) : query.trim() ? (
                  <div className="text-center py-6">
                    <p className="font-body text-sage-500 text-sm">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="text-blush-600 text-sm font-medium hover:underline mt-1 inline-block"
                    >
                      Browse all products →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {recentSearches.length > 0 && (
                      <div>
                        <p className="text-xs font-body font-semibold text-sage-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Recent searches
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setQuery(s);
                                performSearch(s);
                              }}
                              className="px-3 py-1.5 bg-cream-100 text-sage-600 text-xs font-body rounded-full hover:bg-blush-100 hover:text-blush-700 transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-body font-semibold text-sage-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Trending
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setQuery(s);
                              performSearch(s);
                            }}
                            className="px-3 py-1.5 bg-blush-50 text-blush-700 text-xs font-body rounded-full hover:bg-blush-100 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-sage-500 hover:text-sage-800 hover:bg-sage-100 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}