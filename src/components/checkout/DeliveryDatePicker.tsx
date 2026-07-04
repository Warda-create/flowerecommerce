"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const deliverySlots = [
  { id: "morning", label: "Morning", timeRange: "8:00 AM – 12:00 PM", price: 0 },
  { id: "afternoon", label: "Afternoon", timeRange: "12:00 PM – 4:00 PM", price: 0 },
  { id: "evening", label: "Evening", timeRange: "4:00 PM – 8:00 PM", price: 4.99 },
  { id: "express", label: "Express", timeRange: "Within 3 hours", price: 14.99, special: true },
];

export default function DeliveryDatePicker() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [selectedSlot, setSelectedSlot] = useState("morning");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const toDateString = (d: Date) => d.toISOString().split("T")[0];

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    setValue("deliverySlot", slotId);
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft p-6 border border-cream-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center">
          <span className="font-display font-bold text-sm text-blush-700">3</span>
        </div>
        <h2 className="font-display text-lg font-semibold text-sage-900">
          Delivery Schedule
        </h2>
      </div>

      <div className="space-y-5">
        {/* Date picker */}
        <div>
          <label className="font-body text-sm font-semibold text-sage-800 block mb-2">
            Delivery Date <span className="text-blush-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400 pointer-events-none" />
            <input
              type="date"
              min={toDateString(minDate)}
              max={toDateString(maxDate)}
              className={cn(
                "w-full pl-10 pr-4 py-2.5 border rounded-xl font-body text-sm text-sage-800 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300 bg-white",
                errors?.deliveryDate
                  ? "border-red-400"
                  : "border-cream-200 hover:border-cream-300"
              )}
              {...register("deliveryDate")}
            />
          </div>
          {errors?.deliveryDate && (
            <p className="mt-1.5 text-xs font-body text-red-500">
              {errors.deliveryDate.message as string}
            </p>
          )}
        </div>

        {/* Time slot */}
        <div>
          <label className="font-body text-sm font-semibold text-sage-800 block mb-3">
            Delivery Time Slot
          </label>
          <div className="grid grid-cols-2 gap-2">
            {deliverySlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => handleSlotSelect(slot.id)}
                className={cn(
                  "flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left",
                  selectedSlot === slot.id
                    ? "border-blush-500 bg-blush-50"
                    : "border-cream-200 hover:border-blush-200 bg-white"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {slot.special ? (
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-sage-400" />
                  )}
                  <span
                    className={cn(
                      "font-body font-semibold text-sm",
                      selectedSlot === slot.id ? "text-blush-700" : "text-sage-800"
                    )}
                  >
                    {slot.label}
                  </span>
                </div>
                <span className="font-body text-xs text-sage-500">
                  {slot.timeRange}
                </span>
                <span
                  className={cn(
                    "font-body text-xs font-semibold mt-1",
                    slot.price === 0 ? "text-green-600" : "text-blush-600"
                  )}
                >
                  {slot.price === 0 ? "Free" : `+$${slot.price.toFixed(2)}`}
                </span>
              </button>
            ))}
          </div>
          <input type="hidden" value={selectedSlot} {...register("deliverySlot")} />
        </div>

        {/* Gift message */}
        <div>
          <label className="font-body text-sm font-semibold text-sage-800 block mb-2">
            Gift Message
            <span className="font-normal text-sage-500 ml-1">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Add a personal note to the recipient…"
            className="w-full px-4 py-3 border border-cream-200 rounded-xl font-body text-sm text-sage-800 placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300 resize-none"
            {...register("giftMessage")}
          />
          <p className="mt-1 font-body text-xs text-sage-500">
            Your message will be beautifully printed on an included gift card.
          </p>
        </div>
      </div>
    </div>
  );
}