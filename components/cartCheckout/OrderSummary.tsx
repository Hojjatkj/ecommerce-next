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
        lg:relative m-auto  lg:bottom-auto lg:w-64
      "
    >
      <div
        className="
          rounded-t-2xl lg:rounded-2xl
          border border-gray-200 bg-white/95 backdrop-blur
          p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:shadow-lg
        "
      >
        <h2 className="mb-2 flex items-center justify-between text-sm font-bold md:text-base">
          خلاصه سفارش
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
            {totalQuantity.toLocaleString()} کالا
          </span>
        </h2>

        <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-2">
          <span className="text-xs text-gray-600">جمع سبد:</span>
          <span className="text-sm font-bold md:text-base">
            {subtotal.toLocaleString()}
            <span className="mr-1 text-[10px] font-normal text-gray-500">تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
}