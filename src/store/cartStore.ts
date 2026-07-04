// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductSize, ProductCustomization } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string;
  couponDiscount: number;

  addItem: (
    product: Product,
    size: ProductSize,
    quantity?: number,
    giftMessage?: string,
    deliveryDate?: string,
    customizations?: ProductCustomization
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateGiftMessage: (itemId: string, message: string) => void;
  updateDeliveryDate: (itemId: string, date: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;

  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShipping: () => number;
  getTax: () => number;
  getTotal: () => number;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: "",
      couponDiscount: 0,

      addItem: (product, size, quantity = 1, giftMessage, deliveryDate, customizations) => {
        const existing = get().items.find(
          (item) => item.productId === product.id && item.selectedSize.id === size.id
        );

        if (existing) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === existing.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }));
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${size.id}-${Date.now()}`,
            productId: product.id,
            product,
            quantity,
            selectedSize: size,
            giftMessage,
            deliveryDate,
            customizations,
          };
          set((state) => ({ items: [...state.items, newItem] }));
        }
      },

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      updateGiftMessage: (itemId, message) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, giftMessage: message } : item
          ),
        })),

      updateDeliveryDate: (itemId, date) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, deliveryDate: date } : item
          ),
        })),

      clearCart: () => set({ items: [], couponCode: "", couponDiscount: 0 }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      applyCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: "", couponDiscount: 0 }),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.selectedSize.price * item.quantity,
          0
        ),

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const couponDiscount = get().couponDiscount;
        return (subtotal * couponDiscount) / 100;
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 75 ? 0 : 9.99;
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return (subtotal - discount) * 0.09;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShipping();
        const tax = get().getTax();
        return subtotal - discount + shipping + tax;
      },

      isInCart: (productId) =>
        get().items.some((item) => item.productId === productId),
    }),
    {
      name: "flora-grace-cart",
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);