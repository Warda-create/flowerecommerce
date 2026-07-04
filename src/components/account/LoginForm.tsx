"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      toast.success("Welcome back! 🌸", { icon: "🌺" });
      router.push("/account/profile");
    } else {
      toast.error("Invalid email or password. Try: jane.doe@example.com / password123");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
        required
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Your password"
        leftIcon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sage-400 hover:text-sage-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        error={errors.password?.message}
        autoComplete="current-password"
        {...register("password")}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-cream-300 text-blush-600 focus:ring-blush-300"
            {...register("rememberMe")}
          />
          <span className="font-body text-sm text-sage-600">Remember me</span>
        </label>
        <Link
          href="/account/forgot-password"
          className="font-body text-sm text-blush-600 hover:text-blush-700 font-medium transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="luxury"
        fullWidth
        size="lg"
        isLoading={isLoading}
        loadingText="Signing in…"
        className="mt-2"
      >
        Sign In
      </Button>

      <p className="text-center font-body text-sm text-sage-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/account/register"
          className="text-blush-600 hover:text-blush-700 font-medium transition-colors"
        >
          Create one for free
        </Link>
      </p>

      {/* Demo hint */}
      <div className="bg-cream-50 rounded-xl p-3 text-center">
        <p className="font-body text-xs text-sage-500">
          Demo: <span className="font-mono text-sage-700">jane.doe@example.com</span> /{" "}
          <span className="font-mono text-sage-700">password123</span>
        </p>
      </div>
    </form>
  );
}