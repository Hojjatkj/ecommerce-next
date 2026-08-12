'use client';

import ProductGrid from '@/components/ui/list/product-grid';
import useFilteredProducts from '@/hooks/useFilteredProducts';
import Image from 'next/image';


export default function SpecialProducts() {
  const { products, loading } = useFilteredProducts({ onlyDiscounts: true, limit: 10 });

  if (loading) return <p className="p-4">در حال دریافت اطلاعات...</p>;

  return (
    <div >
      <div className="flex flex-row p-4 gap-2 justify-baseline items-center">
        <h2 className="text-xl font-bold ">Special offers </h2>
        <video
          src="/icons/Fire.webm"
          width={30}
          height={30}
          autoPlay
          loop
          muted
          playsInline
          className="mb-4 animate-bounce"
        />
      </div>

      <ProductGrid products={products} />
    </div>
  );
}