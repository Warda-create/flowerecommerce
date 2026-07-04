"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  User,
  Package,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const { isAuthenticated, user } = useAuthStore();
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={menuRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 lg:hidden flex flex-col shadow-luxury overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-cream-100">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blush-400 to-blush-700 flex items-center justify-center">
                  <span className="text-white font-display text-sm font-bold">
                    F
                  </span>
                </div>
                <span className="font-display text-lg font-semibold text-blush-800">
                  Flora & Grace
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-sage-500 hover:text-blush-600 hover:bg-blush-50 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User area */}
            {isAuthenticated && user ? (
              <Link
                href="/account/profile"
                onClick={onClose}
                className="flex items-center gap-3 p-5 bg-blush-50 border-b border-cream-100 hover:bg-blush-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blush-200 flex items-center justify-center text-blush-700 font-display font-semibold text-sm">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
                <div>
                  <p className="font-body font-semibold text-sage-800 text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="font-body text-xs text-sage-500">{user.email}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-sage-400 ml-auto" />
              </Link>
            ) : (
              <div className="flex gap-2 p-4 border-b border-cream-100">
                <Link
                  href="/account/login"
                  onClick={onClose}
                  className="flex-1 text-center py-2.5 rounded-xl border border-blush-300 text-blush-600 text-sm font-body font-medium hover:bg-blush-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/account/register"
                  onClick={onClose}
                  className="flex-1 text-center py-2.5 rounded-xl bg-blush-600 text-white text-sm font-body font-medium hover:bg-blush-700 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4">
              {links.map((link) => (
                <div key={link.label} className="mb-1">
                  {link.children ? (
                    <div>
                      <p className="px-2 py-2.5 font-body font-semibold text-sm text-sage-800 uppercase tracking-wider">
                        {link.label}
                      </p>
                      <div className="pl-2 mb-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center gap-2 px-2 py-2 text-sm font-body text-sage-600 hover:text-blush-600 hover:bg-blush-50 rounded-lg transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-blush-300 shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-2 py-2.5 font-body font-medium text-sage-700 hover:text-blush-600 hover:bg-blush-50 rounded-lg transition-colors"
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 text-sage-400" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Quick links */}
            <div className="border-t border-cream-100 p-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link
                  href="/account/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-cream-200 text-sage-600 text-sm font-body hover:border-blush-300 hover:text-blush-600 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-blush-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/track"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-cream-200 text-sage-600 text-sm font-body hover:border-blush-300 hover:text-blush-600 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span>Track Order</span>
                </Link>
              </div>

              {/* Contact */}
              <div className="space-y-2 text-xs text-sage-500 font-body">
                <a
                  href="tel:+12125550100"
                  className="flex items-center gap-2 hover:text-blush-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +1 (212) 555-0100
                </a>
                <a
                  href="mailto:hello@floraandgrace.com"
                  className="flex items-center gap-2 hover:text-blush-600 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  hello@floraandgrace.com
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}