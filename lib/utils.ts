import { CartItem } from "@/store/cart-store";
import { Product } from "@/types/type";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryName(product: Product): string {
  return product.categories?.name ?? "بدون نام";
}


export function getMainImage(product: Product): string | null {
  const sorted = [...product.product_images].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  return sorted[0]?.url ?? null;
}

export function productToCartItem(product: Product, quantity = 1): CartItem {
  const hasDiscount = Boolean(
    product.discount_percent && product.discount_percent > 0
  );
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount_percent!) / 100
    : product.price;

  return {
    id: String(product.id),
    name: product.title,
    price: finalPrice,
    imageUrl: getMainImage(product),
    quantity,
  };
}