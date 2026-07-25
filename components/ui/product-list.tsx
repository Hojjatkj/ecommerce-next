"use client"

import { Product } from "@/types/type";
import ProductCard from "./product-card";

export interface ProductsListProps {
    products: Product[]
}
export default function ProductList ({ products }: ProductsListProps) {
    if (products.length === 0) {
        return <p>  there`s no any products... </p>
    }
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

