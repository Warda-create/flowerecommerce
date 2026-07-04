import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const phoneSchema = z
  .string()
  .min(10, "Please enter a valid phone number")
  .regex(/^[+\d\s\-()]+$/, "Invalid phone number format");

export const zipCodeSchema = z
  .string()
  .min(5, "ZIP code must be 5 digits")
  .max(10, "ZIP code too long")
  .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: emailSchema,
    phone: phoneSchema.optional().or(z.literal("")),
    password: passwordSchema,
    confirmPassword: z.string(),
    newsletter: z.boolean().optional(),
    terms: z.boolean().refine((v) => v === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const addressSchema = z.object({
  label: z.string().min(1, "Please provide a label (e.g., Home)"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  street: z.string().min(5, "Please enter a complete street address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: zipCodeSchema,
  country: z.string().default("United States"),
  phone: phoneSchema,
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});

export const newsletterSchema = z.object({
  email: emailSchema,
  name: z.string().optional(),
});

export const giftMessageSchema = z.object({
  message: z
    .string()
    .max(200, "Gift message cannot exceed 200 characters")
    .optional(),
});

export const checkoutSchema = z.object({
  customer: z.object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    email: emailSchema,
    phone: phoneSchema,
  }),
  shipping: addressSchema,
  deliveryDate: z.string().min(1, "Please select a delivery date"),
  deliverySlot: z.string().min(1, "Please select a time slot"),
  giftMessage: z.string().max(200).optional(),
  paymentMethod: z.enum(["card", "paypal", "cod"]),
  specialInstructions: z.string().optional(),
  couponCode: z.string().optional(),
});