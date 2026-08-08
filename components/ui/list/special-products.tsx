'use client';

import ProductGrid from '@/components/ui/list/product-grid';
import useFilteredProducts from '@/hooks/useFilteredProducts';
import Image from 'next/image';


export default function SpecialProducts() {
  const { products, loading } = useFilteredProducts({ onlyDiscounts: true, limit: 10 });

  if (loading) return <p className="p-4">در حال دریافت اطلاعات...</p>;

  return (
    <div className="p-6 ">
      <div className="flex flex-row">
        <h2 className="text-xl font-bold mb-4">Special offers </h2>
        <Image
src="/icons/kyungheehee-flame-21186_128.gif"
        alt="Flame"
        width={24}
        height={24}
        
        className="w-6 h-6 object-contain transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-rotate-12"        />
      </div>

      <ProductGrid products={products} />
    </div>
  );
}