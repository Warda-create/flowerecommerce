import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "@/components/account/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Flora & Grace account for a personalized shopping experience.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual panel */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1588710929990-6ede4eccc6b3?w=1200&q=80"
          alt="Beautiful peonies"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sage-900/60 to-sage-700/20" />
        <div className="absolute bottom-12 left-12 text-white max-w-xs">
          <p className="font-display text-3xl font-bold mb-2">
            Join the Flora & Grace Family
          </p>
          <p className="font-body text-cream-200 text-sm leading-relaxed">
            Create an account to save your favourites, track orders, and enjoy
            exclusive member benefits.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center px-4 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blush-400 to-blush-700 flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">F</span>
            </div>
            <span className="font-display text-xl font-semibold text-blush-800">
              Flora & Grace
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-sage-900 mb-1">
            Create Account
          </h1>
          <p className="font-body text-sage-500 mb-6">
            Start your floral journey today 🌺
          </p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}