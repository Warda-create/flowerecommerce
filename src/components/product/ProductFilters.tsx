"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { FilterOptions } from "@/types";
import { categories } from "@/data/categories";
import { occasions } from "@/data/occasions";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onReset: () => void;
  isMobile?: boolean;
}

const priceRanges: [number, number][] = [
  [0, 50],
  [50, 100],
  [100, 150],
  [150, 250],
  [250, 500],
];

const ratingOptions = [4, 3, 2];

const colors = [
  "Red", "Pink", "White", "Yellow", "Purple", "Orange",
  "Blush", "Burgundy", "Peach", "Multi-color",
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-cream-100 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 font-body font-semibold text-sm text-sage-800"
      >
        {title}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-sage-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
}: ProductFiltersProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.occasions.length > 0 ||
    filters.rating !== null ||
    filters.inStock ||
    filters.onSale ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500;

  const toggleCategory = (slug: string) => {
    const updated = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onFilterChange({ categories: updated });
  };

  const toggleOccasion = (name: string) => {
    const updated = filters.occasions.includes(name)
      ? filters.occasions.filter((o) => o !== name)
      : [...filters.occasions, name];
    onFilterChange({ occasions: updated });
  };

  const toggleColor = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ colors: updated });
  };

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sage-600" />
          <span className="font-body font-semibold text-sm text-sage-800">
            Filters
          </span>
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-blush-500 text-white text-xs font-bold flex items-center justify-center">
              {filters.categories.length +
                filters.occasions.length +
                (filters.rating ? 1 : 0) +
                (filters.inStock ? 1 : 0) +
                (filters.onSale ? 1 : 0)}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-body text-blush-600 hover:text-blush-700 font-medium"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Category filter */}
      <FilterSection title="Category">
        <div className="space-y-1.5 mt-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center justify-between gap-2 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                  className="w-4 h-4 rounded border-cream-300 text-blush-600 focus:ring-blush-300 cursor-pointer"
                />
                <span className="font-body text-sm text-sage-600 group-hover:text-sage-900 transition-colors">
                  {cat.name}
                </span>
              </div>
              <span className="font-body text-xs text-sage-400">
                {cat.productCount}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price filter */}
      <FilterSection title="Price Range">
        <div className="space-y-1.5 mt-1">
          {priceRanges.map(([min, max]) => {
            const isActive =
              filters.priceRange[0] === min && filters.priceRange[1] === max;
            return (
              <label
                key={`${min}-${max}`}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="price-range"
                  checked={isActive}
                  onChange={() =>
                    onFilterChange({ priceRange: [min, max] })
                  }
                  className="w-4 h-4 border-cream-300 text-blush-600 focus:ring-blush-300 cursor-pointer"
                />
                <span className="font-body text-sm text-sage-600 group-hover:text-sage-900 transition-colors">
                  {formatPrice(min)} – {formatPrice(max)}
                </span>
              </label>
            );
          })}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
            <button
              onClick={() => onFilterChange({ priceRange: [0, 500] })}
              className="text-xs text-blush-600 hover:text-blush-700 font-body mt-1"
            >
              Clear price filter
            </button>
          )}
        </div>
      </FilterSection>

      {/* Occasion filter */}
      <FilterSection title="Occasion" defaultOpen={false}>
        <div className="space-y-1.5 mt-1">
          {occasions.map((occ) => (
            <label
              key={occ.id}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.occasions.includes(occ.name)}
                onChange={() => toggleOccasion(occ.name)}
                className="w-4 h-4 rounded border-cream-300 text-blush-600 focus:ring-blush-300 cursor-pointer"
              />
              <span className="font-body text-sm text-sage-600 group-hover:text-sage-900 transition-colors">
                {occ.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating filter */}
      <FilterSection title="Minimum Rating" defaultOpen={false}>
        <div className="space-y-1.5 mt-1">
          {ratingOptions.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() =>
                  onFilterChange({
                    rating: filters.rating === rating ? null : rating,
                  })
                }
                className="w-4 h-4 border-cream-300 text-blush-600 focus:ring-blush-300 cursor-pointer"
              />
              <span className="font-body text-sm text-sage-600 group-hover:text-sage-900 flex items-center gap-1">
                {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                <span className="text-sage-400 text-xs">& up</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Color filter */}
      <FilterSection title="Color" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-body transition-all border",
                filters.colors.includes(color)
                  ? "bg-blush-600 text-white border-blush-600"
                  : "bg-white text-sage-600 border-cream-200 hover:border-blush-300"
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Additional filters */}
      <FilterSection title="Availability" defaultOpen={false}>
        <div className="space-y-2 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange({ inStock: e.target.checked })}
              className="w-4 h-4 rounded border-cream-300 text-blush-600 focus:ring-blush-300 cursor-pointer"
            />
            <span className="font-body text-sm text-sage-600">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) => onFilterChange({ onSale: e.target.checked })}
              className="w-4 h-4 rounded border-cream-300 text-blush-600 focus:ring-blush-300 cursor-pointer"
            />
            <span className="font-body text-sm text-sage-600">On Sale</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );
}