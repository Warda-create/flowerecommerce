import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/components/account/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Flora & Grace account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cream-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-soft p-8 border border-cream-100">
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blush-400 to-blush-700 flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">F</span>
            </div>
            <span className="font-display text-xl font-semibold text-blush-800">
              Flora & Grace
            </span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-sage-900 mb-1">
            Forgot Password?
          </h1>
          <p className="font-body text-sage-500 mb-6">
            No worries — we&apos;ll send you a reset link
          </p>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}