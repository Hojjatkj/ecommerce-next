'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/type';

interface UseFilteredProductsOptions {
  onlyDiscounts?: boolean;
  limit?: number;
  categoryId?: number;
}

export default function useFilteredProducts(options?: UseFilteredProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);

      let query = supabase
        .from('products')
        .select(`
          id, title, price, discount_percent, image, description, category_id,
          categories ( id, name )
        `);

      if (options?.onlyDiscounts) {
        query = query.gt('discount_percent', 0).order('discount_percent', { ascending: false });
      } else {
        query = query.order('id', { ascending: false });
      }

      if (options?.categoryId) {
        query = query.eq('category_id', options.categoryId);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError('خطا در دریافت اطلاعات');
      } else if (data) {
        setProducts(data as unknown as Product[]);
      }
      setLoading(false);
    }

    fetchFiltered();
  }, [options?.onlyDiscounts, options?.limit, options?.categoryId]);

  return { products, loading, error };
}