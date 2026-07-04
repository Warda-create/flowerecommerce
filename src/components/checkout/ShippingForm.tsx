"use client";

import { useFormContext } from "react-hook-form";
import { MapPin } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { useAuthStore } from "@/store/authStore";

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export default function ShippingForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { user } = useAuthStore();

  const handleSavedAddress = (addressId: string) => {
    const address = user?.addresses.find((a) => a.id === addressId);
    if (!address) return;
    setValue("shipping.firstName", address.firstName);
    setValue("shipping.lastName", address.lastName);
    setValue("shipping.street", address.street);
    setValue("shipping.city", address.city);
    setValue("shipping.state", address.state);
    setValue("shipping.zipCode", address.zipCode);
    setValue("shipping.phone", address.phone);
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft p-6 border border-cream-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center">
          <span className="font-display font-bold text-sm text-blush-700">2</span>
        </div>
        <h2 className="font-display text-lg font-semibold text-sage-900">
          Delivery Address
        </h2>
      </div>

      {/* Saved addresses */}
      {user && user.addresses.length > 0 && (
        <div className="mb-5">
          <p className="font-body text-sm font-medium text-sage-700 mb-2">
            Use a saved address:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {user.addresses.map((addr) => (
              <button
                key={addr.id}
                type="button"
                onClick={() => handleSavedAddress(addr.id)}
                className="text-left p-3 rounded-xl border border-cream-200 hover:border-blush-300 hover:bg-blush-50 transition-all"
              >
                <p className="font-body text-xs font-semibold text-sage-700">
                  {addr.label}
                  {addr.isDefault && (
                    <span className="ml-1.5 text-blush-600">(Default)</span>
                  )}
                </p>
                <p className="font-body text-xs text-sage-500 mt-0.5">
                  {addr.street}, {addr.city}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="Recipient's first name"
          error={errors?.["shipping.firstName"]?.message as string}
          {...register("shipping.firstName")}
          required
        />
        <Input
          label="Last Name"
          placeholder="Recipient's last name"
          error={errors?.["shipping.lastName"]?.message as string}
          {...register("shipping.lastName")}
          required
        />
        <div className="sm:col-span-2">
          <Input
            label="Street Address"
            placeholder="123 Rose Garden Ave, Apt 4B"
            leftIcon={<MapPin className="w-4 h-4" />}
            error={errors?.["shipping.street"]?.message as string}
            {...register("shipping.street")}
            required
          />
        </div>
        <Input
          label="City"
          placeholder="New York"
          error={errors?.["shipping.city"]?.message as string}
          {...register("shipping.city")}
          required
        />
        <Select
          label="State"
          options={US_STATES}
          placeholder="Select state"
          error={errors?.["shipping.state"]?.message as string}
          {...register("shipping.state")}
          required
        />
        <Input
          label="ZIP Code"
          placeholder="10001"
          error={errors?.["shipping.zipCode"]?.message as string}
          {...register("shipping.zipCode")}
          required
        />
        <Input
          label="Recipient's Phone"
          type="tel"
          placeholder="+1 (212) 555-0100"
          error={errors?.["shipping.phone"]?.message as string}
          {...register("shipping.phone")}
          required
        />
      </div>

      <div className="mt-4">
        <Input
          label="Delivery Instructions"
          placeholder="e.g. Leave at front door, ring bell, call recipient…"
          {...register("specialInstructions")}
        />
      </div>
    </div>
  );
}