// src/store/wishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistItem, Product } from "@/types";

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          const newItem: WishlistItem = {
            id: `wishlist-${product.id}-${Date.now()}`,
            productId: product.id,
            product,
            addedAt: new Date().toISOString(),
          };
          set((state) => ({ items: [...state.items, newItem] }));
        }
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) =>
        get().items.some((item) => item.productId === productId),

      getItemCount: () => get().items.length,
    }),
    {
      name: "flora-grace-wishlist",
    }
  )
);