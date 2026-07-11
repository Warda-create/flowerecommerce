"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package } from "lucide-react";
import { sampleOrders, getTrackingEventsForOrder } from "@/data/orders";
import { useOrderStore } from "@/store/orderStore";
import TrackingTimeline from "@/components/tracking/TrackingTimeline";
import Breadcrumb from "@/components/common/Breadcrumb";
import { formatDate, formatPrice } from "@/lib/utils";
import Badge from "@/components/common/Badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

function TrackingContent() {
  const searchParams = useSearchParams();
  const getOrderByNumber = useOrderStore((s) => s.getOrderByNumber);
  const initialOrder = searchParams.get("order")
    ? getOrderByNumber(searchParams.get("order")!)
    : null;
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") || "");
  const [searched, setSearched] = useState(!!searchParams.get("order"));
  const [order, setOrder] = useState(initialOrder);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setSearched(true);
    setOrder(getOrderByNumber(orderNumber) || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Order Tracking" }]} className="mb-6" />

      <div className="text-center mb-10">
        <Package className="w-10 h-10 text-blush-500 mx-auto mb-3" />
        <h1 className="font-display text-3xl font-bold text-sage-900 mb-2">
          Track Your Order
        </h1>
        <p className="font-body text-sage-500">
          Enter your order number to see real-time updates on your flowers
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-10 max-w-lg mx-auto"
      >
        <div className="flex-1 relative min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400 pointer-events-none" />
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. FS-LK3P9X-AB12"
            className="w-full pl-10 pr-4 py-3 border border-cream-200 rounded-xl font-body text-sm text-sage-800 placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-blush-600 text-white rounded-xl font-body font-semibold text-sm hover:bg-blush-700 transition-colors shrink-0"
        >
          Track
        </button>
      </form>

      <div className="text-center mb-8">
        <button
          onClick={() => {
            const demoNumber = sampleOrders[1].orderNumber;
            setOrderNumber(demoNumber);
            setSearched(true);
            setOrder(getOrderByNumber(demoNumber) || null);
          }}
          className="font-body text-xs text-blush-600 hover:underline"
        >
          Try a demo order: {sampleOrders[1].orderNumber}
        </button>
      </div>

      {searched && order && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-soft border border-cream-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-cream-100 bg-cream-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-body text-xs text-sage-500 mb-0.5">Order Number</p>
                <p className="font-display font-bold text-sage-900 break-all">
                  {order.orderNumber}
                </p>
              </div>
              <Badge
                variant={order.status === "delivered" ? "success" : "info"}
                dot
                dotColor={order.status === "delivered" ? "bg-green-500" : "bg-blue-500"}
                className="shrink-0 self-start sm:self-auto"
              >
                {ORDER_STATUS_LABELS[order.status] || order.status}
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream-100">
              <div className="px-6 py-4">
                <p className="font-body text-xs text-sage-500 mb-1">Delivery Date</p>
                <p className="font-body font-semibold text-sage-800 text-sm">
                  {formatDate(order.deliveryDate)}
                </p>
                <p className="font-body text-xs text-sage-500">{order.deliveryTimeSlot}</p>
              </div>
              <div className="px-6 py-4">
                <p className="font-body text-xs text-sage-500 mb-1">Delivering to</p>
                <p className="font-body font-semibold text-sage-800 text-sm">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p className="font-body text-xs text-sage-500">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
              </div>
              <div className="px-6 py-4">
                <p className="font-body text-xs text-sage-500 mb-1">Order Total</p>
                <p className="font-display font-bold text-sage-900">
                  {formatPrice(order.total)}
                </p>
                <p className="font-body text-xs text-sage-500">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-soft border border-cream-100 p-6">
            <h2 className="font-display text-lg font-semibold text-sage-900 mb-6">
              Delivery Timeline
            </h2>
            <TrackingTimeline
              events={getTrackingEventsForOrder(order)}
              currentStatus={order.status}
            />
          </div>
        </div>
      )}

      {searched && !order && (
        <div className="text-center py-12 bg-cream-50 rounded-3xl">
          <Package className="w-12 h-12 text-sage-300 mx-auto mb-3" />
          <p className="font-display text-lg text-sage-700 mb-1">Order Not Found</p>
          <p className="font-body text-sm text-sage-500">
            We couldn&apos;t find an order with that number. Please check and try again.
          </p>
        </div>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <TrackingContent />
    </Suspense>
  );
}
