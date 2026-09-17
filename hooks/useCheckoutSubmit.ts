"use client"

import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import type { CheckoutFormData } from "@/components/cartCheckout/CheckoutForm";

interface useCheckoutSubmitResult {
  isSubmitting: boolean;
  submitError: string | null;
  submitOrder: (formData: CheckoutFormData) => Promise<void>;
}

export function useCheckoutSubmit(): useCheckoutSubmitResult {
  const items = useCartStore((store) => store.items);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitOrder = async (formData: CheckoutFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingInfo: formData,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Checkout failed");
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitError, submitOrder };
}
