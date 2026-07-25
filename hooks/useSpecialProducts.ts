// hooks/useProducts.ts
import { Product } from "@/types/type";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          title,
          image,
          price,
          discount_percent,
          category_id,
          categories (
            name
          )
        `)
        .gt("discount_percent", 0) // گرفتن فقط تخفیف‌دارها
        .order("discount_percent", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProducts(data as unknown as Product[]);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  return { products, loading };
}