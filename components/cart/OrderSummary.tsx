"use client";

import { useCartStore } from "@/store/cart-store";

export default function OrderSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      className="
        fixed z-40 
        /* موبایل: پایین صفحه، تمام عرض */
        bottom-0 inset-x-0 

        /* دسکتاپ: بالاتر بیاد، چسبیده به بالا-راست */
        lg:relative m-auto  lg:bottom-auto lg:w-75
      "
    >
      <div
        className="
          rounded-t-2xl lg:rounded-2xl
          border border-gray-200 bg-white/95 backdrop-blur
          p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:shadow-lg
        "
      >
        <h2 className="mb-4 flex items-center justify-between text-base font-bold md:text-lg">
          خلاصه سفارش
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {totalQuantity.toLocaleString()} کالا
          </span>
        </h2>

        <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
          <span className="text-sm text-gray-600">جمع سبد:</span>
          <span className="text-base font-bold md:text-lg">
            {subtotal.toLocaleString()}
            <span className="mr-1 text-xs font-normal text-gray-500">تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
}