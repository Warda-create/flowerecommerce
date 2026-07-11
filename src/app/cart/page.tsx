"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/common/EmptyState";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function CartPage() {
  const { items, clearCart } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Cart" }]} className="mb-6" />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sage-900">
            Your Cart
          </h1>
          {items.length > 0 && (
            <p className="font-body text-sage-500 mt-1">
              {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="font-body text-sm text-sage-400 hover:text-red-500 transition-colors"
          >
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="w-10 h-10" />}
          title="Your cart is empty"
          description="Discover our beautiful arrangements and add your favorites to get started."
          action={{ label: "Browse Flowers", href: "/shop" }}
        />
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-body text-sm text-blush-600 hover:text-blush-700 font-medium transition-colors mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}