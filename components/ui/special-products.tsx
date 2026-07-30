'use client';

import ProductList from '@/components/ui/product-list';
import useFilteredProducts from '@/hooks/useFilteredProducts';


export default function SpecialProducts() {
const { products, loading } = useFilteredProducts({ onlyDiscounts: true, limit: 10 });

  if (loading) return <p className="p-4">در حال دریافت اطلاعات...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">پیشنهادهای ویژه 🔥</h2>
      <ProductList products={products} />
    </div>
  );
}