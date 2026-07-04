import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/account/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Flora & Grace account to manage orders and wishlist.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual panel */}
      <div className="hidden lg:block relative">
        <Image
          src="/images/categories/110.jpg"
          alt="Beautiful roses"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blush-900/60 to-blush-700/20" />
        <div className="absolute bottom-12 left-12 text-white max-w-xs">
          <p className="font-display text-3xl font-bold mb-2">
            Welcome back to Flora & Grace
          </p>
          <p className="font-body text-cream-200 text-sm leading-relaxed">
            Sign in to access your order history, wishlist, and exclusive member offers.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center px-4 py-16 bg-white">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blush-400 to-blush-700 flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">F</span>
            </div>
            <span className="font-display text-xl font-semibold text-blush-800">
              Flora & Grace
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-sage-900 mb-1">
            Sign In
          </h1>
          <p className="font-body text-sage-500 mb-8">
            Good to see you again 🌸
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}