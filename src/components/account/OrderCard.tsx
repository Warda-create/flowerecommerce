"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight, RotateCcw } from "lucide-react";
import { Order, OrderStatus } from "@/types";
import { formatPrice, formatDate, cn } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import Badge from "@/components/common/Badge";

interface OrderCardProps {
  order: Order;
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    variant: "success" | "warning" | "info" | "danger" | "default" | "primary";
    dot: string;
  }
> = {
  pending: {
    label: "Pending",
    variant: "warning",
    dot: "bg-amber-500",
  },
  confirmed: {
    label: "Confirmed",
    variant: "info",
    dot: "bg-blue-500",
  },
  preparing: {
    label: "Preparing",
    variant: "primary",
    dot: "bg-blush-500",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    variant: "info",
    dot: "bg-blue-500",
  },
  delivered: {
    label: "Delivered",
    variant: "success",
    dot: "bg-green-500",
  },
  cancelled: {
    label: "Cancelled",
    variant: "danger",
    dot: "bg-red-500",
  },
};

export default function OrderCard({ order }: OrderCardProps) {
  const config = statusConfig[order.status];

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-100 bg-white shadow-soft">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-cream-100 bg-cream-50 px-5 py-4">
        <div className="min-w-0">
          <div className="mb-0.5 flex items-center gap-2">
            <Package className="h-4 w-4 text-sage-400" />
            <span className="font-body text-sm font-semibold text-sage-800">
              {order.orderNumber}
            </span>
          </div>

          <p className="font-body text-xs text-sage-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>

        <Badge variant={config.variant} dot dotColor={config.dot} className="shrink-0 self-start sm:self-auto">
          {config.label}
        </Badge>
      </div>

      {/* Items */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-3">
          {/* Images */}
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-white shadow-sm"
                style={{ zIndex: order.items.length - index }}
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ))}

            {order.items.length > 3 && (
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-cream-100">
                <span className="font-body text-xs font-bold text-sage-600">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>

          {/* Product names */}
          <div className="min-w-0 flex-1">
            {order.items.slice(0, 2).map((item) => (
              <p
                key={item.id}
                className="truncate font-body text-sm text-sage-700"
              >
                {item.quantity}× {item.product.name}
              </p>
            ))}

            {order.items.length > 2 && (
              <p className="font-body text-xs text-sage-400">
                +{order.items.length - 2} more item
                {order.items.length - 2 !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Total */}
          <div className="shrink-0 text-right">
            <p className="font-display text-lg font-bold text-sage-900">
              {formatPrice(order.total)}
            </p>

            <p className="font-body text-xs text-sage-400">
              {order.paymentMethod === "card"
                ? "Card"
                : order.paymentMethod === "paypal"
                ? "PayPal"
                : "COD"}
            </p>
          </div>
        </div>

        {/* Delivery */}
        <div className="mt-3 border-t border-cream-50 pt-3">
          <p className="font-body text-xs text-sage-500">
            Delivery to{" "}
            <span className="font-medium text-sage-700">
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </span>{" "}
            on{" "}
            <span className="font-medium text-sage-700">
              {formatDate(order.deliveryDate)}
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-cream-100 bg-cream-50/50 px-5 py-3">
        <div>
          {order.status === "delivered" && (
            <button
              type="button"
              className="flex items-center gap-1.5 font-body text-xs text-sage-600 transition-colors hover:text-blush-600"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reorder
            </button>
          )}
        </div>

        <Link href={`/order-tracking?order=${order.orderNumber}`}>
          <Button
            variant="outline"
            size="sm"
            rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
          >
            {order.status === "delivered"
              ? "View Details"
              : "Track Order"}
          </Button>
        </Link>
      </div>
    </div>
  );
}