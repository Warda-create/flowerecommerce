import { useWishlistStore } from "@/store/wishlistStore";
import { Product } from "@/types";
import toast from "react-hot-toast";

export function useWishlist() {
  const store = useWishlistStore();

  const toggleWishlist = (product: Product) => {
    const isIn = store.isInWishlist(product.id);
    store.toggleItem(product);
    toast.success(isIn ? "Removed from wishlist" : "Added to wishlist!", {
      icon: isIn ? "💔" : "💖",
      style: { borderRadius: "12px" },
    });
    return !isIn;
  };

  const addToWishlist = (product: Product) => {
    if (!store.isInWishlist(product.id)) {
      store.addItem(product);
      toast.success("Added to wishlist!", {
        icon: "💖",
        style: { borderRadius: "12px" },
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    store.removeItem(productId);
    toast.success("Removed from wishlist");
  };

  return {
    items: store.items,
    itemCount: store.getItemCount(),
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist: store.clearWishlist,
    isInWishlist: store.isInWishlist,
  };
}