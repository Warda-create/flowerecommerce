"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, Save } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";

const schema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  newsletter: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  orderUpdates: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ProfileForm() {
  const { user, updateProfile } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        newsletter: user.preferences.newsletter,
        smsNotifications: user.preferences.smsNotifications,
        orderUpdates: user.preferences.orderUpdates,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 600));
    updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      preferences: {
        newsletter: data.newsletter ?? false,
        smsNotifications: data.smsNotifications ?? false,
        orderUpdates: data.orderUpdates ?? true,
      },
    });
    toast.success("Profile updated successfully!");
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.firstName?.message}
          {...register("firstName")}
          required
        />
        <Input
          label="Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
          required
        />
        <div className="sm:col-span-2">
          <Input
            label="Email Address"
            type="email"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Phone Number"
            type="tel"
            leftIcon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
      </div>

      {/* Notification preferences */}
      <div className="border-t border-cream-100 pt-5">
        <h3 className="font-display text-base font-semibold text-sage-800 mb-3">
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { name: "newsletter", label: "Newsletter & promotions", desc: "Seasonal inspiration and exclusive offers" },
            { name: "orderUpdates", label: "Order updates", desc: "Delivery status and tracking notifications" },
            { name: "smsNotifications", label: "SMS notifications", desc: "Text message alerts for your orders" },
          ].map(({ name, label, desc }) => (
            <label key={name} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-cream-300 text-blush-600 focus:ring-blush-300 shrink-0"
                {...register(name as keyof FormData)}
              />
              <div>
                <p className="font-body text-sm font-medium text-sage-800">{label}</p>
                <p className="font-body text-xs text-sage-500">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        loadingText="Saving changes…"
        disabled={!isDirty}
        leftIcon={<Save className="w-4 h-4" />}
      >
        Save Changes
      </Button>
    </form>
  );
}