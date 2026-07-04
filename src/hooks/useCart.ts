import { useCartStore } from "@/store/cartStore";
import { Product, ProductSize, ProductCustomization } from "@/types";
import toast from "react-hot-toast";

export function useCart() {
  const store = useCartStore();

  const addToCart = (
    product: Product,
    size: ProductSize,
    quantity = 1,
    options?: {
      giftMessage?: string;
      deliveryDate?: string;
      customizations?: ProductCustomization;
    }
  ) => {
    store.addItem(
      product,
      size,
      quantity,
      options?.giftMessage,
      options?.deliveryDate,
      options?.customizations
    );
    toast.success(`${product.name} added to cart!`, {
      icon: "🌸",
      style: { borderRadius: "12px" },
    });
  };

  const removeFromCart = (itemId: string, productName?: string) => {
    store.removeItem(itemId);
    if (productName) {
      toast.success(`${productName} removed from cart`);
    }
  };

  return {
    items: store.items,
    isOpen: store.isOpen,
    itemCount: store.getItemCount(),
    subtotal: store.getSubtotal(),
    discount: store.getDiscount(),
    shipping: store.getShipping(),
    tax: store.getTax(),
    total: store.getTotal(),
    couponCode: store.couponCode,
    couponDiscount: store.couponDiscount,
    addToCart,
    removeFromCart,
    updateQuantity: store.updateQuantity,
    updateGiftMessage: store.updateGiftMessage,
    updateDeliveryDate: store.updateDeliveryDate,
    clearCart: store.clearCart,
    toggleCart: store.toggleCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
    applyCoupon: store.applyCoupon,
    removeCoupon: store.removeCoupon,
    isInCart: store.isInCart,
  };
}