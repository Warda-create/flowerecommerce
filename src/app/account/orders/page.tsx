"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useOrderStore } from "@/store/orderStore";
import OrderCard from "@/components/account/OrderCard";
import EmptyState from "@/components/common/EmptyState";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function OrdersPage() {
  const { isAuthenticated, user } = useAuthStore();
  const getOrdersForUser = useOrderStore((s) => s.getOrdersForUser);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/account/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const orders = getOrdersForUser(user.id);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Account", href: "/account/profile" },
          { label: "My Orders" },
        ]}
        className="mb-6"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sage-900">
            My Orders
          </h1>
          <p className="font-body text-sage-500 mt-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
        <Link
          href="/shop"
          className="font-body text-sm text-blush-600 hover:text-blush-700 font-medium shrink-0"
        >
          Shop Again →
        </Link>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={<Package className="w-10 h-10" />}
          title="No orders yet"
          description="Once you place your first order, you'll be able to track it here."
          action={{ label: "Start Shopping", href: "/shop" }}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </>
  );
}
