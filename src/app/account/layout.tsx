"use client";

import { usePathname } from "next/navigation";
import AccountSidebar from "@/components/account/AccountSidebar";

const SIDEBAR_ROUTES = [
  "/account/profile",
  "/account/orders",
  "/account/wishlist",
  "/account/addresses",
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = SIDEBAR_ROUTES.includes(pathname);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        <AccountSidebar />
        <div className="lg:col-span-3 min-w-0">{children}</div>
      </div>
    </div>
  );
}
