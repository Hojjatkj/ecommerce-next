"use client";
import { Product } from "@/types/type";
import { useMemo, useState } from "react";
import ProductSearch from "../ProductSearch";
import ProductFilters, { SortOption } from "../ProductFilters";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { getCategoryName } from "@/lib/utils";
import ProductGrid from "./product-grid";
import Image from "next/image";

export interface ProductsListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const isLoading = products.length === 0;
  const showEmptyMessage = useDelayedFlag(isLoading, 3000);

  const categories = useMemo(() => {
    const names = new Set<string>();
    products.forEach((p) => {
      const name = getCategoryName(p);
      if (name && name !== "بدون نام") names.add(name);
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b, "fa"));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase();

    const filtered = products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        getCategoryName(p).toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" || getCategoryName(p) === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    const finalPrice = (p: Product) =>
      p.discount_percent && p.discount_percent > 0
        ? p.price - (p.price * p.discount_percent) / 100
        : p.price;

    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => finalPrice(a) - finalPrice(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => finalPrice(b) - finalPrice(a));
        break;
      case "discount":
        sorted.sort(
          (a, b) => (b.discount_percent ?? 0) - (a.discount_percent ?? 0)
        );
        break;
      case "newest":
      default:
        sorted.sort((a, b) => b.id - a.id);
        break;
    }

    return sorted;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div>
     <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-2">
        <div className=" flex flex-col bg- items-center justify-center  md:flex-row">
          <div className="relative w-fit items-center justify-center hidden  md:flex">
            {/* تصویر در لایه زیرین */}
            <Image
              src={"/icons/G7a3R1IzOO.svg"}
              alt="پس‌زمینه"
              width={200}
              height={200}
              className="w-48 h-48 object-contain"
            />

            {/* متن دقیقاً در مرکز تصویر قرار می‌گیرد */}
            <h2 className="absolute text-lg font-bold text-gray-800 z-10 pointer-events-none">
              جستجو در محصولات
            </h2>
          </div>
          <ProductSearch onSearch={setSearchTerm} />
        </div>


        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
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