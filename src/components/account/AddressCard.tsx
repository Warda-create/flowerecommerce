"use client";

import { MapPin, Edit2, Home, Briefcase } from "lucide-react";
import { Address } from "@/types";
import { Button } from "@/components/common/Button";
import Badge from "@/components/common/Badge";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
}

export default function AddressCard({
  address,
  onEdit,
}: AddressCardProps) {
  const getIcon = () => {
    switch (address.label.toLowerCase()) {
      case "home":
        return <Home className="h-5 w-5 text-blush-600" />;

      case "work":
        return <Briefcase className="h-5 w-5 text-blush-600" />;

      default:
        return <MapPin className="h-5 w-5 text-blush-600" />;
    }
  };

  return (
    <div className="rounded-3xl border border-cream-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blush-50">
            {getIcon()}
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-sage-900">
              {address.label}
            </h3>

            {address.isDefault && (
              <Badge variant="primary">
                Default
              </Badge>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(address)}
          leftIcon={<Edit2 className="h-4 w-4" />}
        >
          Edit
        </Button>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <p className="font-body font-semibold text-sage-800">
          {address.firstName} {address.lastName}
        </p>

        <p className="font-body text-sm leading-relaxed text-sage-600">
          {address.street}
        </p>

        <p className="font-body text-sm text-sage-600">
          {address.city}, {address.state} {address.zipCode}
        </p>

        <p className="font-body text-sm text-sage-600">
          {address.country}
        </p>

        <div className="pt-2">
          <p className="font-body text-sm text-sage-500">
            {address.phone}
          </p>
        </div>
      </div>
    </div>
  );
}