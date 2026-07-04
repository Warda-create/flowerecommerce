"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Shield, Truck, Leaf } from "lucide-react";

export default function OrderSummary() {
  const {
    items,
    getSubtotal,
    getDiscount,
    getShipping,
    getTax,
    getTotal,
    couponCode,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-cream-50 overflow-hidden sticky top-24">
      <div className="px-6 py-5 border-b border-cream-100 bg-cream-50">
        <h2 className="font-display text-lg font-semibold text-sage-900">
          Order Summary
        </h2>
        <p className="font-body text-xs text-sage-500 mt-0.5">
          {items.reduce((sum, i) => sum + i.quantity, 0)} item{items.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Items */}
      <div className="divide-y divide-cream-50 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 px-5 py-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 shrink-0">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                sizes="56px"
                className="object-cover"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blush-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-semibold text-xs text-sage-800 line-clamp-1">
                {item.product.name}
              </p>
              <p className="font-body text-xs text-sage-500">
                {item.selectedSize.label}
              </p>
            </div>
            <span className="font-display font-bold text-sm text-sage-900 shrink-0">
              {formatPrice(item.selectedSize.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 py-5 border-t border-cream-100 space-y-2">
        <div className="flex justify-between font-body text-sm">
          <span className="text-sage-600">Subtotal</span>
          <span className="font-medium text-sage-800">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-body text-sm text-green-600">
            <span>Coupon ({couponCode})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-body text-sm">
          <span className="text-sage-600">Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : "text-sage-800"}>
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-sage-600">Tax</span>
          <span className="text-sage-800">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-cream-100">
          <span className="text-sage-900">Total</span>
          <span className="text-blush-700">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Guarantees */}
      <div className="px-6 pb-5 space-y-2">
        {[
          { icon: Shield, text: "Freshness guaranteed for 7 days" },
          { icon: Truck, text: "Free shipping on orders over $75" },
          { icon: Leaf, text: "Sustainably sourced flowers" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 text-sage-400 shrink-0" />
            <span className="font-body text-xs text-sage-500">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}