"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { sampleOrders } from "@/data/orders";
import OrderCard from "@/components/account/OrderCard";
import EmptyState from "@/components/common/EmptyState";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/account/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Account", href: "/account/profile" },
          { label: "My Orders" },
        ]}
        className="mb-6"
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sage-900">
            My Orders
          </h1>
          <p className="font-body text-sage-500 mt-1">
            {sampleOrders.length} order{sampleOrders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
        <Link href="/shop" className="font-body text-sm text-blush-600 hover:text-blush-700 font-medium">
          Shop Again →
        </Link>
      </div>

      {sampleOrders.length === 0 ? (
        <EmptyState
          icon={<Package className="w-10 h-10" />}
          title="No orders yet"
          description="Once you place your first order, you'll be able to track it here."
          action={{ label: "Start Shopping", href: "/shop" }}
        />
      ) : (
        <div className="space-y-4">
          {sampleOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}