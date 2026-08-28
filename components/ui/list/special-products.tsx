'use client';

import ProductGrid from '@/components/ui/list/product-grid';
import useFilteredProducts from '@/hooks/useFilteredProducts';

export default function SpecialProducts() {
  const { products, loading } = useFilteredProducts({ onlyDiscounts: true, limit: 10 });

  if (loading) return <p className="p-4 text-center text-[var(--color-muted-text)]">در حال دریافت اطلاعات...</p>;

  return (
    <div className="dir-rtl my-8">
      <div className="flex flex-row p-4 gap-3 items-center">
        <h2 className="text-2xl font-extrabold text-[var(--color-text-main)]">پیشنهادهای شگفت‌انگیز</h2>
        <video
          src="/icons/Fire.webm"
          width={28}
          height={28}
          autoPlay
          loop
          muted
          playsInline
          className="animate-bounce"
        />
      </div>

      <ProductGrid products={products} />
    </div>
  );
}