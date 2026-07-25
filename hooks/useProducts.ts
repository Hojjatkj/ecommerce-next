// hooks/useProducts.ts
import { Product } from "@/types/type";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

interface UseProductsOptions {
  onlyDiscounts?: boolean; // اگر true باشد فقط تخفیف‌دارها را می‌آورد
  categoryId?: number;     // برای فیلتر بر اساس یک دسته‌بندی خاص
}

export default function usePageProducts(options?: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      // ساخت کوئری پایه برای دریافت تمام فیلدها + نام دسته‌بندی
      let query = supabase.from("products").select(`
        id,
        title,
        price,
        discount_percent,
        image,
        description,
        category_id,
        categories (
          id,
          name
        )
      `);

      // شرط ۱: اگر فقط محصولات تخفیف‌دار را خواستیم
      if (options?.onlyDiscounts) {
        query = query.gt("discount_percent", 0);
      }

      // شرط ۲: اگر بر اساس یک دسته‌بندی خاص فیلتر کردیم
      if (options?.categoryId) {
        query = query.eq("category_id", options.categoryId);
      }

      // مرتب‌سازی بر اساس جدیدترین‌ها (یا ID)
      query = query.order("id", { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error("خطا در دریافت محصولات:", fetchError);
        setError("دریافت اطلاعات با خطا مواجه شد.");
      } else if (data) {
        setProducts(data as unknown as Product[]);
      }

      setLoading(false);
    }

    fetchProducts();
  }, [options?.onlyDiscounts, options?.categoryId]);

  return { products, loading, error };
}