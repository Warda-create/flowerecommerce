"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import EmptyState from "@/components/common/EmptyState";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    getItemCount,
    getSubtotal,
    getDiscount,
    getShipping,
    getTotal,
    couponCode,
  } = useCartStore();

  const count = getItemCount();
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 flex flex-col shadow-luxury"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-blush-600" />
                <h2 className="font-display text-lg font-semibold text-sage-900">
                  Your Cart
                </h2>
                {count > 0 && (
                  <span className="w-6 h-6 rounded-full bg-blush-500 text-white text-xs font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-sage-400 hover:text-sage-600 hover:bg-sage-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyState
                  icon={<ShoppingBag className="w-10 h-10" />}
                  title="Your cart is empty"
                  description="Add some beautiful flowers to get started."
                  action={{ label: "Browse Flowers", href: "/shop" }}
                />
              ) : (
                <div className="divide-y divide-cream-50">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-50 shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/product/${item.product.slug}`}
                              onClick={onClose}
                              className="font-body font-semibold text-sm text-sage-800 hover:text-blush-600 transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="font-body text-xs text-sage-500 mt-0.5">
                              {item.selectedSize.label} — {item.selectedSize.description}
                            </p>
                            {item.giftMessage && (
                              <p className="font-body text-xs text-blush-600 mt-0.5 italic line-clamp-1">
                                "{item.giftMessage}"
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-sage-400 hover:text-red-500 transition-colors shrink-0"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Qty controls */}
                          <div className="flex items-center border border-cream-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-sage-500 hover:text-blush-600 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-body text-sm font-semibold text-sage-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-sage-500 hover:text-blush-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-display font-bold text-sm text-sage-900">
                            {formatPrice(item.selectedSize.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-100 p-5 space-y-3">
                {/* Free shipping progress */}
                {subtotal < 75 && (
                  <div className="bg-cream-50 rounded-xl p-3">
                    <p className="font-body text-xs text-sage-600 mb-1.5">
                      Add{" "}
                      <span className="font-semibold text-blush-600">
                        {formatPrice(75 - subtotal)}
                      </span>{" "}
                      more for free delivery
                    </p>
                    <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blush-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-sage-600">Subtotal</span>
                    <span className="text-sage-800 font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-body text-sm text-green-600">
                      <span>Discount ({couponCode})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-sage-600">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : "text-sage-800"}>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-base pt-2 border-t border-cream-100">
                    <span className="text-sage-900">Total</span>
                    <span className="text-blush-700">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Link href="/cart" onClick={onClose} className="flex-1">
                    <Button variant="outline" fullWidth size="md">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" onClick={onClose} className="flex-1">
                    <Button variant="luxury" fullWidth size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}