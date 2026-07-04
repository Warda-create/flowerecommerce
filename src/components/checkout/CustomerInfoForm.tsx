"use client";

import { useFormContext } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import { Input } from "@/components/common/Input";

export default function CustomerInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-3xl shadow-soft p-6 border border-cream-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center">
          <span className="font-display font-bold text-sm text-blush-700">1</span>
        </div>
        <h2 className="font-display text-lg font-semibold text-sage-900">
          Contact Information
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="Jane"
          leftIcon={<User className="w-4 h-4" />}
          error={errors?.["customer.firstName"]?.message as string}
          {...register("customer.firstName")}
          required
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          error={errors?.["customer.lastName"]?.message as string}
          {...register("customer.lastName")}
          required
        />
        <div className="sm:col-span-2">
          <Input
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors?.["customer.email"]?.message as string}
            hint="Order confirmation will be sent to this address"
            {...register("customer.email")}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (212) 555-0100"
            leftIcon={<Phone className="w-4 h-4" />}
            error={errors?.["customer.phone"]?.message as string}
            hint="For delivery updates and coordination"
            {...register("customer.phone")}
            required
          />
        </div>
      </div>
    </div>
  );
}