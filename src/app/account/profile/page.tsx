"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfileForm from "@/components/account/ProfileForm";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/account/login");
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <>
      <Breadcrumb
        items={[{ label: "Account" }, { label: "Profile" }]}
        className="mb-6"
      />

      <div className="bg-white rounded-3xl shadow-soft border border-cream-50 p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-sage-900 mb-6">
          My Profile
        </h1>
        <ProfileForm />
      </div>
    </>
  );
}
