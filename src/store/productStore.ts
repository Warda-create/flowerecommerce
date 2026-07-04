import { create } from "zustand";
import { Product, FilterOptions } from "@/types";
import { products as allProducts } from "@/data/products";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  filters: FilterOptions;
  sortBy: string;
  currentPage: number;
  perPage: number;

  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  setSortBy: (sort: string) => void;
  setPage: (page: number) => void;
  applyFiltersAndSearch: () => void;
}

const defaultFilters: FilterOptions = {
  categories: [],
  occasions: [],
  priceRange: [0, 500],
  rating: null,
  inStock: false,
  onSale: false,
  colors: [],
  flowerTypes: [],
};

function applyFilters(
  products: Product[],
  searchQuery: string,
  filters: FilterOptions,
  sortBy: string
): Product[] {
  let result = [...products];

  // Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.flowerTypes.some((f) => f.toLowerCase().includes(q)) ||
        p.occasions.some((o) => o.toLowerCase().includes(q))
    );
  }

  // Category filter
 if (filters.categories.length > 0) {
  const normalized = filters.categories.map((c) =>
    c.toLowerCase()
  );

  result = result.filter((p) =>
    normalized.includes(p.categorySlug.toLowerCase())
  );
}

  // Occasion filter
 if (filters.occasions.length > 0) {
  const normalized = filters.occasions.map((o) =>
    o.toLowerCase()
  );

  result = result.filter((p) =>
    p.occasions.some((o) =>
      normalized.includes(o.toLowerCase())
    )
  );
}

  // Price range filter
  result = result.filter(
    (p) =>
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  // Rating filter
  if (filters.rating !== null) {
    result = result.filter((p) => p.rating >= (filters.rating as number));
  }

  // In stock filter
  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  // On sale filter
  if (filters.onSale) {
    result = result.filter(
      (p) => p.discount !== undefined && p.discount > 0
    );
  }

  // Color filter
  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c))
    );
  }

  // Flower type filter
  if (filters.flowerTypes.length > 0) {
    result = result.filter((p) =>
      p.flowerTypes.some((f) => filters.flowerTypes.includes(f))
    );
  }

  // Sort
  switch (sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "popularity":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "featured":
    default:
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.bestSeller && !b.bestSeller) return -1;
        if (!a.bestSeller && b.bestSeller) return 1;
        return 0;
      });
      break;
  }

  return result;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: allProducts,
  filteredProducts: allProducts,
  searchQuery: "",
  filters: defaultFilters,
  sortBy: "featured",
  currentPage: 1,
  perPage: 12,

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    const state = get();
    set({
      filteredProducts: applyFilters(
        state.products,
        query,
        state.filters,
        state.sortBy
      ),
    });
  },

  setFilters: (newFilters) => {
    const updatedFilters = { ...get().filters, ...newFilters };
    set({ filters: updatedFilters, currentPage: 1 });
    const state = get();
    set({
      filteredProducts: applyFilters(
        state.products,
        state.searchQuery,
        updatedFilters,
        state.sortBy
      ),
    });
  },

  resetFilters: () => {
    set({
      filters: defaultFilters,
      searchQuery: "",
      currentPage: 1,
      filteredProducts: applyFilters(
        get().products,
        "",
        defaultFilters,
        get().sortBy
      ),
    });
  },

  setSortBy: (sort) => {
    set({ sortBy: sort });
    const state = get();
    set({
      filteredProducts: applyFilters(
        state.products,
        state.searchQuery,
        state.filters,
        sort
      ),
    });
  },

  setPage: (page) => set({ currentPage: page }),

  applyFiltersAndSearch: () => {
    const state = get();
    set({
      filteredProducts: applyFilters(
        state.products,
        state.searchQuery,
        state.filters,
        state.sortBy
      ),
    });
  },
}));