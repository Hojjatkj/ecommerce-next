'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product, ProductContextType } from '@/types/type';
import { supabase } from '@/lib/supabase';
import { PRODUCT_SELECT_QUERY } from '@/lib/queries';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchProducts() {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select(PRODUCT_SELECT_QUERY)
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

  const value = useMemo(
    () => ({ products, loading, error }),
    [products, loading, error]
  )
  return (
    <ProductContext.Provider value={value}>
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