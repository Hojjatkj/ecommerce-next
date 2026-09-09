"use client";

import { useCartStore } from "@/store/cart-store";

export default function OrderSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>خلاصه سفارش</h2>

      <p>جمع سبد: {subtotal.toLocaleString()} تومان</p>
    </div>
  );
}