"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid, List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "@/store/productStore";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import SortDropdown from "@/components/product/SortDropdown";
import Breadcrumb from "@/components/common/Breadcrumb";
import Pagination from "@/components/common/Pagination";
import Modal from "@/components/common/Modal";
import { occasions } from "@/data/occasions";

function ShopContent() {
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    filteredProducts,
    filters,
    sortBy,
    currentPage,
    perPage,
    setFilters,
    resetFilters,
    setSortBy,
    setPage,
    setSearchQuery,
    applyFiltersAndSearch,
  } = useProductStore();

  // Apply URL params on mount
  useEffect(() => {
  const category = searchParams.get("category");
  const occasion = searchParams.get("occasion");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const newFilters: any = {};

  if (category) newFilters.categories = [category];
  if (occasion) {
  const matchedOccasion = occasions.find(
    (o) => o.slug === occasion
  );

  if (matchedOccasion) {
    newFilters.occasions = [matchedOccasion.name];
  }
}

  if (Object.keys(newFilters).length > 0) {
    setFilters(newFilters);
  }

  if (search) setSearchQuery(search);
  if (sort) setSortBy(sort);

  applyFiltersAndSearch();
}, [searchParams]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Shop" }]} className="mb-6" />

      {/* Page header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sage-900">
            All Flowers
          </h1>
          <p className="font-body text-sage-500 mt-1">
            {filteredProducts.length} arrangement{filteredProducts.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={resetFilters}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream-200 text-sm font-body text-sage-700 hover:border-blush-300 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <div className="ml-auto">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Products */}
          <ProductGrid products={paginatedProducts} columns={3} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        title="Filter Products"
        size="md"
      >
        <ProductFilters
          filters={filters}
          onFilterChange={(f) => {
            setFilters(f);
          }}
          onReset={() => {
            resetFilters();
            setShowMobileFilters(false);
          }}
          isMobile
        />
        <div className="mt-4">
          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full py-3 bg-blush-600 text-white rounded-xl font-body font-semibold hover:bg-blush-700 transition-colors"
          >
            Show {filteredProducts.length} Results
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}