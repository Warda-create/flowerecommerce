"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import WishlistGrid from "@/components/account/WishlistGrid";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function WishlistPage() {
  const { isAuthenticated } = useAuthStore();
  const { items } = useWishlistStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/account/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Account", href: "/account/profile" },
          { label: "Wishlist" },
        ]}
        className="mb-6"
      />

      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-6 h-6 text-blush-500 fill-blush-500 shrink-0" />
        <div>
          <h1 className="font-display text-3xl font-bold text-sage-900">
            My Wishlist
          </h1>
          <p className="font-body text-sage-500 text-sm mt-0.5">
            {items.length} saved item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <WishlistGrid />
    </>
  );
}
