// hooks/useProducts.ts
'use client'
import { useProductsContext } from "@/context/ProductContext";

interface UseProductsOptions {
  onlyDiscounts?: boolean;
  limit?: number;
  categoryId?: number;
}

export default function UseAllProductsOptions (options?: UseProductsOptions) {
  const { products, loading, error } = useProductsContext();

  let result = products;

  // ۱. اگر فقط تخفیف‌دارها رو خواستیم
  if (options?.onlyDiscounts) {
    result = result
      .filter((p) => p.discount_percent && p.discount_percent > 0)
      .sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0));
  }

  // ۲. اگر دسته خاص خواستیم
  if (options?.categoryId) {
    result = result.filter((p) => p.category_id === options.categoryId);
  }

  // ۳. اگر لیمیت تعداد خواستیم (مثلا فقط ۱۰ تا)
  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  return { products: result, loading, error };
}