"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import ProfileForm from "@/components/account/ProfileForm";
import Breadcrumb from "@/components/common/Breadcrumb";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const accountNav = [
  { label: "Profile", href: "/account/profile", icon: User },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
];

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/account/login");
  }, [isAuthenticated, router]);

  if (!user) return null;
  console.log(user);
console.log(user.avatar);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[{ label: "Account" }, { label: "Profile" }]}
        className="mb-6"
      />

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-soft border border-cream-50 overflow-hidden">
            {/* User info */}
            <div className="p-6 text-center border-b border-cream-100">
              {user.avatar ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                  <Image src={user.avatar} alt={user.firstName} fill sizes="80px" className="object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mx-auto mb-3 text-blush-700 font-display font-bold text-2xl">
                  {getInitials(`${user.firstName} ${user.lastName}`)}
                </div>
              )}
              <p className="font-display font-semibold text-sage-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="font-body text-xs text-sage-500 mt-0.5">{user.email}</p>
            </div>

            {/* Nav */}
            <nav className="py-2">
              {accountNav.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3 font-body text-sm transition-colors",
                    href === "/account/profile"
                      ? "text-blush-700 bg-blush-50 font-medium"
                      : "text-sage-600 hover:text-blush-600 hover:bg-blush-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex items-center gap-3 px-5 py-3 w-full font-body text-sm text-sage-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-soft border border-cream-50 p-8">
            <h1 className="font-display text-2xl font-bold text-sage-900 mb-6">
              My Profile
            </h1>
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}