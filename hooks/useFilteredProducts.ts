'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/type';
import { PRODUCT_SELECT_QUERY } from '@/lib/queries';
interface UseFilteredProductsOptions {
  onlyDiscounts?: boolean;
  limit?: number;
  categoryId?: number;
  productId?: number
}

// کش نتیجه‌ی نهایی
const cache = new Map<string, Product[]>();
// کش درخواست‌های در حال اجرا (برای جلوگیری از فچ تکراری هم‌زمان)
const inFlight = new Map<string, Promise<Product[]>>();

function getCacheKey(options?: UseFilteredProductsOptions) {
  return JSON.stringify({
    onlyDiscounts: options?.onlyDiscounts ?? false,
    limit: options?.limit ?? null,
    categoryId: options?.categoryId ?? null,
    productId: options?.productId ?? null
  });
}

async function fetchProducts(key: string, options?: UseFilteredProductsOptions): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select(PRODUCT_SELECT_QUERY);

  if (options?.onlyDiscounts) {
    query = query.gt('discount_percent', 0).order('discount_percent', { ascending: false });
  } else {
    query = query.order('id', { ascending: false });
  }

  if (options?.categoryId) {
    query = query.eq('category_id', options.categoryId);
  }

if (options?.productId != null) {
  query = query.eq('id', options.productId);
}

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error: fetchError } = await query;

  if (fetchError) {
    throw new Error('خطا در دریافت اطلاعات');
  }

  const typed = (data ?? []) as unknown as Product[];
  cache.set(key, typed);
  return typed;
}

export default function useFilteredProducts(options?: UseFilteredProductsOptions) {
  const key = getCacheKey(options);
  const cached = cache.get(key);

  const [products, setProducts] = useState<Product[]>(cached ?? []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // اگه از قبل تو کش هست، اصلاً نیازی به فچ نیست
    if (cache.has(key)) {
      setProducts(cache.get(key)!);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    // اگه یه فچ با همین key در حال اجراست، همون Promise رو دوباره‌استفاده کن
    let request = inFlight.get(key);
    if (!request) {
      request = fetchProducts(key, options).finally(() => {
        inFlight.delete(key);
      });
      inFlight.set(key, request);
    }

    request
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError('خطا در دریافت اطلاعات');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };

  }, [key]);

  return { products, loading, error };
}

export function useProduct(id: number) {
  return useFilteredProducts({ productId: id })
}