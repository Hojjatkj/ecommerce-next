'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Product, ProductContextType } from '@/types/type';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
  console.log("Context Mounted");

  return () => {
    console.log("Context Unmounted");
  };
}, []);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error:fetchError } = await supabase
        .from('products')
        .select(`
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
        `)
        .order('id', { ascending: false });

      if (fetchError) {
        console.error('Error fetching products:', fetchError);
        setError('خطا در دریافت اطلاعات');
      } else if (data) {
        setProducts(data as unknown as Product[]);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

// هوک داخلی برای دسترسی به Context
export function useProductsContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductsContext باید داخل ProductProvider استفاده شود');
  }
  return context;
}