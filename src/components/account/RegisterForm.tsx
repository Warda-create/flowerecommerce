"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";

const schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  newsletter: z.boolean().optional(),
  terms: z.boolean().refine((v) => v === true, "You must accept the terms"),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const success = await registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });

    if (success) {
      toast.success("Welcome to Flora & Grace! 🌸");
      router.push("/account/profile");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          placeholder="Jane"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.firstName?.message}
          {...register("firstName")}
          required
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
          required
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register("email")}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (212) 555-0100"
        leftIcon={<Phone className="w-4 h-4" />}
        error={errors.phone?.message}
        hint="Optional — for delivery notifications"
        {...register("phone")}
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Min. 8 characters"
        leftIcon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sage-400 hover:text-sage-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        error={errors.password?.message}
        {...register("password")}
        required
      />

      <Input
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        placeholder="Repeat your password"
        leftIcon={<Lock className="w-4 h-4" />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
        required
      />

      <div className="space-y-2.5 pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-cream-300 text-blush-600 focus:ring-blush-300 shrink-0"
            {...register("newsletter")}
          />
          <span className="font-body text-sm text-sage-600">
            Subscribe to our newsletter for exclusive offers and floral inspiration
          </span>
        </label>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-cream-300 text-blush-600 focus:ring-blush-300 shrink-0"
            {...register("terms")}
          />
          <span className="font-body text-sm text-sage-600">
            I agree to the{" "}
            <Link href="/terms" className="text-blush-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blush-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.terms && (
          <p className="text-xs font-body text-red-500">{errors.terms.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="luxury"
        fullWidth
        size="lg"
        isLoading={isLoading}
        loadingText="Creating account…"
      >
        Create Account
      </Button>

      <p className="text-center font-body text-sm text-sage-500">
        Already have an account?{" "}
        <Link
          href="/account/login"
          className="text-blush-600 hover:text-blush-700 font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}