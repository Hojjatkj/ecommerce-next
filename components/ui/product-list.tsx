"use client"
import "@/public/css/animations.css"
import { Product } from "@/types/type";
import ProductCard from "./product-card";
import { useMemo, useState } from "react";
import ProductSearch from "./ProductSearch";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";



export interface ProductsListProps {
    products: Product[]
}
export default function ProductList({ products }: ProductsListProps) {

    const [searchTerm, setSearchTerm] = useState("");
    const showEmptyMessage = useDelayedFlag(products.length === 0, 3000);


    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const q = searchTerm.toLowerCase();

            return (
                p.title.toLowerCase().includes(q) ||
                p.categories?.name.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        });
    }, [products, searchTerm]);

    if (products.length === 0) {
        if (!showEmptyMessage) {
            return <div className="loader"></div>; // یا یه اسکلتون/لودینگ نشون بده
        }
        return <p>there is no any product  ...</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold  mb-4">Products</h2>
            <ProductSearch onSearch={setSearchTerm} />


            {
                filteredProducts.length === 0 ? (
                    <div className=" flex flex-col justify-center items-center ">
                        <p className="col-span-3 text-center text-lg md:text-2xl text-gray-500 py-8">
                            No products were found with these characteristics.
                        </p>
                        <img src="./empty-box.png" alt="" className="animate-float w-1/8" />
                    </div>
                ) :
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
            }
        </div>

    );
};

