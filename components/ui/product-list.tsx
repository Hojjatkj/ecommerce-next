"use client";
import { Product } from "@/types/type";
import { useMemo, useState } from "react";
import ProductSearch from "./ProductSearch";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { getCategoryName } from "@/lib/utils";
import ProductGrid from "./product-grid";
import Image from "next/image";

export interface ProductsListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const isLoading = products.length === 0;
  const showEmptyMessage = useDelayedFlag(isLoading, 3000);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchTerm.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        getCategoryName(p).toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    });
  }, [products, searchTerm]);

  return (
    <div>
      <div className="m-2 flex flex-col items-center justify-center gap-6 p-4 md:flex-row">
        <h2 className="text-xl font-bold text-gray-800">Explore our Products</h2>
          <ProductSearch onSearch={setSearchTerm} />
      </div>

      {isLoading ? (
        showEmptyMessage ? (
          <p className="py-10 text-center text-gray-500">
            there is no any product ...
          </p>
        ) : (
          <ProductGrid products={[]} />
        )
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <img
            src="./empty-box.png"
            alt=""
            className="w-24 animate-float opacity-80 md:w-32"
          />
          <p className="mt-4 text-center text-lg text-gray-500 md:text-xl">
            No products were found with these characteristics.
          </p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}