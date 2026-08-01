"use client"
import "@/public/css/animations.css"
import { Product } from "@/types/type";
import ProductCard from "./product-card";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";

export interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const showEmptyMessage = useDelayedFlag(products.length === 0, 3000);

  if (products.length === 0) {
    if (!showEmptyMessage) {
      return <div className="loader"></div>;
    }
    return <p>there is no any product ...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}