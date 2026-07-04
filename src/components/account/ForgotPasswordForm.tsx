"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmittedEmail(data.email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display text-xl font-semibold text-sage-900 mb-2">
          Check your inbox
        </h3>
        <p className="font-body text-sm text-sage-500 mb-6">
          We sent a password reset link to{" "}
          <span className="font-medium text-sage-800">{submittedEmail}</span>.
          It will expire in 30 minutes.
        </p>
        <Link href="/account/login">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <p className="font-body text-sm text-sage-500 mb-4">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register("email")}
        required
      />

      <Button
        type="submit"
        variant="luxury"
        fullWidth
        size="lg"
        isLoading={isSubmitting}
        loadingText="Sending reset link…"
      >
        Send Reset Link
      </Button>

      <div className="text-center">
        <Link
          href="/account/login"
          className="font-body text-sm text-sage-500 hover:text-blush-600 inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}