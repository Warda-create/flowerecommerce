"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";
import { Order, OrderItem } from "@/types";
import { DELIVERY_SLOTS } from "@/lib/constants";
import CustomerInfoForm from "@/components/checkout/CustomerInfoForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import DeliveryDatePicker from "@/components/checkout/DeliveryDatePicker";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Button } from "@/components/common/Button";
import Breadcrumb from "@/components/common/Breadcrumb";

const schema = z.object({
  customer: z.object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone required"),
  }),
  shipping: z.object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    street: z.string().min(5, "Full address required"),
    city: z.string().min(2, "Required"),
    state: z.string().min(2, "Required"),
    zipCode: z.string().min(5, "Valid ZIP required"),
    phone: z.string().min(10, "Required"),
  }),
  deliveryDate: z.string().min(1, "Please select a delivery date"),
  deliverySlot: z.string().min(1, "Please select a time slot"),
  giftMessage: z.string().optional(),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  cardDetails: z.object({
    cardNumber: z.string().optional(),
    cardHolder: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
  }).optional(),
  specialInstructions: z.string().optional(),
  couponCode: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const {
    items,
    clearCart,
    getSubtotal,
    getDiscount,
    getShipping,
    getTax,
    getTotal,
  } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const { user } = useAuthStore();
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      deliverySlot: "morning",
      paymentMethod: "card",
    },
  });

  useEffect(() => {
  if (items.length === 0 && !orderPlaced) {
    router.push("/cart");
  }
}, [items.length, orderPlaced, router]);

if (items.length === 0 && !orderPlaced) {
  return null;
}

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    const num = `FS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const now = new Date().toISOString();

    const shippingAddress = {
      id: `addr-${Date.now()}`,
      label: "Shipping",
      firstName: data.shipping.firstName,
      lastName: data.shipping.lastName,
      street: data.shipping.street,
      city: data.shipping.city,
      state: data.shipping.state,
      zipCode: data.shipping.zipCode,
      country: "United States",
      phone: data.shipping.phone,
      isDefault: false,
    };

    const orderItems: OrderItem[] = items.map((item, index) => ({
      id: `item-${Date.now()}-${index}`,
      productId: item.productId,
      product: item.product,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      unitPrice: item.selectedSize.price,
      total: item.selectedSize.price * item.quantity,
    }));

    const slot = DELIVERY_SLOTS.find((s) => s.id === data.deliverySlot);

    const order: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: num,
      userId: user?.id || "guest",
      items: orderItems,
      status: "confirmed",
      shippingAddress,
      billingAddress: shippingAddress,
      deliveryDate: data.deliveryDate,
      deliveryTimeSlot: slot?.timeRange || data.deliverySlot,
      giftMessage: data.giftMessage,
      subtotal: getSubtotal(),
      shippingCost: getShipping(),
      discount: getDiscount(),
      tax: getTax(),
      total: getTotal(),
      paymentMethod: data.paymentMethod,
      paymentStatus: "paid",
      createdAt: now,
      updatedAt: now,
    };

    addOrder(order);
    setOrderNumber(num);
    clearCart();
    setOrderPlaced(true);
    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-sage-900 mb-3">
            Order Confirmed! 🌸
          </h1>
          <p className="font-body text-sage-600 mb-2">
            Thank you for your order. We&apos;ll start preparing your beautiful arrangement right away.
          </p>
          <p className="font-body text-sm text-sage-500 mb-2">
            Order number:{" "}
            <span className="font-mono font-bold text-sage-800 break-all">{orderNumber}</span>
          </p>
          <p className="font-body text-sm text-sage-500 mb-8">
            A confirmation email has been sent to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="luxury"
              size="lg"
              onClick={() => router.push(`/order-tracking?order=${orderNumber}`)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Track My Order
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/shop")}
              className="w-full sm:w-auto"
            >
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
        className="mb-8"
      />

      <h1 className="font-display text-3xl font-bold text-sage-900 mb-8">
        Checkout
      </h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form sections */}
            <div className="lg:col-span-2 space-y-6 min-w-0">
              <CustomerInfoForm />
              <ShippingForm />
              <DeliveryDatePicker />
              <PaymentMethods />

              <Button
                type="submit"
                variant="luxury"
                fullWidth
                size="xl"
                isLoading={isSubmitting}
                loadingText="Placing your order…"
                className="text-base"
              >
                Place Order
              </Button>
            </div>

            {/* Order summary */}
            <div className="min-w-0">
              <OrderSummary />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
