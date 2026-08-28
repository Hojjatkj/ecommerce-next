"use client";
import { Product } from "@/types/type";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import ProductCard from "./product-card";

export interface ProductGridProps {
  products: Product[];
}

function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-card-bg)] p-4">
      <div className="mb-4 aspect-square w-full animate-pulse rounded-xl bg-[var(--color-muted-bg)]" />
      <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-[var(--color-muted-bg)]" />
      <div className="h-5 w-1/2 animate-pulse rounded bg-[var(--color-muted-bg)]" />
      <div className="mt-4 h-8 w-full animate-pulse rounded bg-[var(--color-muted-bg)]" />
    </div>
  );
}

export default function ProductGrid({ products }: ProductGridProps) {
  const showEmptyMessage = useDelayedFlag(products.length === 0, 3000);

  if (products.length === 0) {
    if (!showEmptyMessage) {
      return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 dir-rtl">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      );
    }
    return (
      <p className="py-10 text-center text-[var(--color-muted-text)] font-medium dir-rtl">
        محصولی برای نمایش وجود ندارد...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 dir-rtl">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}