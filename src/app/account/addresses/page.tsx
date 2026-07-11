"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MapPin } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Address } from "@/types";
import AddressCard from "@/components/account/AddressCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import Modal from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const addressSchema = z.object({
  label: z.string().min(1, "Label required"),
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  street: z.string().min(5, "Full address required"),
  city: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  zipCode: z.string().min(5, "Required"),
  phone: z.string().min(10, "Required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

const US_STATES = [
  { value: "NY", label: "New York" },
  { value: "CA", label: "California" },
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
  { value: "IL", label: "Illinois" },
];

export default function AddressesPage() {
  const { isAuthenticated, user, addAddress, updateAddress } = useAuthStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({ resolver: zodResolver(addressSchema) });

  useEffect(() => {
    if (!isAuthenticated) router.push("/account/login");
  }, [isAuthenticated, router]);

  const openAdd = () => {
    setEditingAddress(null);
    reset({ label: "", firstName: "", lastName: "", street: "", city: "", state: "", zipCode: "", phone: "" });
    setIsModalOpen(true);
  };

  const openEdit = (address: Address) => {
    setEditingAddress(address);
    reset({
      label: address.label,
      firstName: address.firstName,
      lastName: address.lastName,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phone: address.phone,
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (data: AddressFormData) => {
    await new Promise((r) => setTimeout(r, 500));
    if (editingAddress) {
      updateAddress(editingAddress.id, { ...data, country: "United States", isDefault: editingAddress.isDefault });
      toast.success("Address updated!");
    } else {
      addAddress({ ...data, country: "United States", isDefault: false });
      toast.success("Address added!");
    }
    setIsModalOpen(false);
  };

  if (!user) return null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Account", href: "/account/profile" },
          { label: "Addresses" },
        ]}
        className="mb-6"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sage-900">
            Saved Addresses
          </h1>
          <p className="font-body text-sage-500 mt-1">
            {user.addresses.length} address{user.addresses.length !== 1 ? "es" : ""} saved
          </p>
        </div>
        <Button
          variant="primary"
          onClick={openAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0"
        >
          Add Address
        </Button>
      </div>

      {user.addresses.length === 0 ? (
        <div className="text-center py-16 bg-cream-50 rounded-3xl">
          <MapPin className="w-12 h-12 text-sage-300 mx-auto mb-3" />
          <p className="font-display text-lg text-sage-700 mb-1">No addresses saved</p>
          <p className="font-body text-sm text-sage-500 mb-6">
            Add a delivery address to speed up checkout.
          </p>
          <Button variant="primary" onClick={openAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {user.addresses.map((address) => (
            <AddressCard key={address.id} address={address} onEdit={openEdit} />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAddress ? "Edit Address" : "Add New Address"}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input label="Label" placeholder="Home, Work, etc." error={errors.label?.message} {...register("label")} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="First Name" error={errors.firstName?.message} {...register("firstName")} required />
            <Input label="Last Name" error={errors.lastName?.message} {...register("lastName")} required />
          </div>
          <Input label="Street Address" error={errors.street?.message} {...register("street")} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="City" error={errors.city?.message} {...register("city")} required />
            <Select label="State" options={US_STATES} placeholder="Select" error={errors.state?.message} {...register("state")} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="ZIP Code" error={errors.zipCode?.message} {...register("zipCode")} required />
            <Input label="Phone" type="tel" error={errors.phone?.message} {...register("phone")} required />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} fullWidth>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting} fullWidth>
              {editingAddress ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}