"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  Phone,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { label: "Shop", href: "/shop" },
  {
    label: "Collections",
    href: "#",
    children: [
      { label: "Roses", href: "/shop?category=roses" },
      { label: "Peonies", href: "/shop?category=peonies" },
      { label: "Mixed Bouquets", href: "/shop?category=mixed-bouquets" },
      { label: "Sunflowers", href: "/shop?category=sunflowers" },
      { label: "Wildflowers", href: "/shop?category=wildflowers" },
      { label: "Premium Collections", href: "/shop?category=premium-collections" },
      { label: "Plants & Succulents", href: "/shop?category=plants" },
      { label: "Dried Flowers", href: "/shop?category=dried-flowers" },
    ],
  },
  {
    label: "Occasions",
    href: "#",
    children: [
      { label: "Valentine's Day", href: "/shop?occasion=valentines-day" },
      { label: "Birthday", href: "/shop?occasion=birthday" },
      { label: "Anniversary", href: "/shop?occasion=anniversary" },
      { label: "Wedding", href: "/shop?occasion=wedding" },
      { label: "Mother's Day", href: "/shop?occasion=mothers-day" },
      { label: "Sympathy", href: "/shop?occasion=sympathy" },
      { label: "Congratulations", href: "/shop?occasion=congratulations" },
      { label: "Get Well", href: "/shop?occasion=get-well" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.getItemCount());
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        {/* Top bar */}
        <div className="hidden md:block border-b border-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-8 text-xs text-sage-600 font-body">
              <div className="flex items-center gap-4">
                <a
                  href="tel:+12125550100"
                  className="flex items-center gap-1.5 hover:text-blush-600 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>+1 (212) 555-0100</span>
                </a>
                <span className="text-cream-300">|</span>
                <span>Mon–Sat 8am–8pm · Sun 9am–6pm</span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/order-tracking"
                  className="hover:text-blush-600 transition-colors"
                >
                  Track Order
                </Link>
                <span className="text-cream-300">|</span>
                {isAuthenticated ? (
                  <Link
                    href="/account/profile"
                    className="hover:text-blush-600 transition-colors"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/account/login"
                    className="hover:text-blush-600 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blush-400 to-blush-700 flex items-center justify-center">
                  <span className="text-white font-display text-sm md:text-base font-bold">
                    F
                  </span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg md:text-xl font-semibold text-blush-800 tracking-tight">
                  Flora & Grace
                </span>
                <span className="font-body text-[9px] text-sage-500 tracking-[0.15em] uppercase">
                  Premium Florals
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && handleDropdownEnter(link.label)
                  }
                  onMouseLeave={handleDropdownLeave}
                >
                  {link.children ? (
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-body font-medium text-sage-700 hover:text-blush-600 transition-colors rounded-lg hover:bg-blush-50">
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-body font-medium text-sage-700 hover:text-blush-600 transition-colors rounded-lg hover:bg-blush-50 block"
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white rounded-2xl shadow-card border border-cream-100 overflow-hidden py-2 z-50"
                        onMouseEnter={() => handleDropdownEnter(link.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm font-body text-sage-700 hover:text-blush-600 hover:bg-blush-50 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl text-sage-600 hover:text-blush-600 hover:bg-blush-50 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="relative p-2 rounded-xl text-sage-600 hover:text-blush-600 hover:bg-blush-50 transition-colors"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blush-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href={isAuthenticated ? "/account/profile" : "/account/login"}
                className="hidden md:flex p-2 rounded-xl text-sage-600 hover:text-blush-600 hover:bg-blush-50 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl bg-blush-600 text-white hover:bg-blush-700 transition-colors ml-1"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-4.5 h-4.5 w-5 h-5" />
                {cartCount > 0 && (
                  <span className="text-xs font-bold tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-sage-600 hover:text-blush-600 hover:bg-blush-50 transition-colors ml-1"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />

      {/* Cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}