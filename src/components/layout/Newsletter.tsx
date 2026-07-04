"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Newsletter subscription:", data.email);
    setIsSubmitted(true);
    toast.success("Welcome to Flora & Grace! Check your inbox for a 15% off code.");
  };

  return (
    <section className="bg-gradient-to-br from-blush-800 via-blush-700 to-rose-800 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-blush-600/30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cream-300" />
                <span className="font-body text-cream-300 text-sm tracking-widest uppercase">
                  Join our garden
                </span>
                <Sparkles className="w-5 h-5 text-cream-300" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-3">
                Bloom with us
              </h2>
              <p className="font-body text-cream-200 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Subscribe for seasonal inspiration, exclusive offers, and
                get{" "}
                <span className="font-semibold text-cream-100">
                  15% off your first order
                </span>
                .
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                noValidate
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-sage-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3.5 bg-white rounded-xl font-body text-sage-800 placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-cream-300 text-sm"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-cream-100 hover:bg-white text-blush-700 font-body font-semibold rounded-xl transition-all text-sm shrink-0 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-blush-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {errors.email && (
                <p id="email-error" className="mt-2 text-cream-200 text-xs font-body">
                  {errors.email.message}
                </p>
              )}

              <p className="mt-4 text-cream-400 text-xs font-body">
                No spam, ever. Unsubscribe at any time.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <CheckCircle className="w-14 h-14 text-cream-200 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-white font-semibold mb-2">
                You&apos;re in the garden!
              </h3>
              <p className="font-body text-cream-300 text-sm">
                Welcome to Flora & Grace. Check your inbox for your 15% off
                code — it&apos;s waiting for you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}