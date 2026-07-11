import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "@/types";
import { sampleOrders } from "@/data/orders";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  getOrdersForUser: (userId: string) => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      getOrderByNumber: (orderNumber) => {
        const normalized = orderNumber.trim().toUpperCase();
        const placed = get().orders.find(
          (o) => o.orderNumber.toUpperCase() === normalized
        );
        if (placed) return placed;
        return sampleOrders.find(
          (o) => o.orderNumber.toUpperCase() === normalized
        );
      },

      getOrdersForUser: (userId) => {
        const placed = get().orders.filter((o) => o.userId === userId);
        const sample = sampleOrders.filter((o) => o.userId === userId);
        const placedNumbers = new Set(placed.map((o) => o.orderNumber));
        const merged = [
          ...placed,
          ...sample.filter((o) => !placedNumbers.has(o.orderNumber)),
        ];
        return merged.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
    }),
    {
      name: "flora-grace-orders",
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);
