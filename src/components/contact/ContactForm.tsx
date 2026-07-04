"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Textarea } from "@/components/common/Textarea";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const subjectOptions = [
  { value: "order", label: "Order Inquiry" },
  { value: "delivery", label: "Delivery Question" },
  { value: "custom", label: "Custom Arrangement" },
  { value: "wedding", label: "Wedding & Events" },
  { value: "corporate", label: "Corporate Orders" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Contact form:", data);
    setSubmitted(true);
    toast.success("Message sent! We'll reply within 24 hours.");
    reset();
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft p-8 border border-cream-100">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-sage-900 mb-2">
              Message Sent!
            </h3>
            <p className="font-body text-sage-500 mb-6">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Your Name"
                placeholder="Jane Doe"
                error={errors.name?.message}
                {...register("name")}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
                required
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (212) 555-0100"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <Select
              label="Subject"
              options={subjectOptions}
              placeholder="Select a subject"
              error={errors.subject?.message}
              {...register("subject")}
              required
            />

            <Textarea
              label="Message"
              placeholder="Tell us how we can help you…"
              rows={5}
              charLimit={1000}
              currentLength={messageLength}
              error={errors.message?.message}
              {...register("message", {
                onChange: (e) => setMessageLength(e.target.value.length),
              })}
              required
            />

            <Button
              type="submit"
              variant="luxury"
              fullWidth
              size="lg"
              isLoading={isSubmitting}
              loadingText="Sending your message…"
              rightIcon={<Send className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}