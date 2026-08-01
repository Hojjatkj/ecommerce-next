"use client"
import "@/public/css/animations.css"
import { Product } from "@/types/type";
import ProductCard from "./product-card";
import { useMemo, useState } from "react";
import ProductSearch from "./ProductSearch";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { getCategoryName } from "@/lib/utils";
import ProductGrid from "./product-grid";



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
                getCategoryName(p).toLowerCase().includes(q) ||
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
        <div >
            <div className="flex flex-col md:flex-row p-4 m-2 gap-6 justify-center items-center">
                <h2 className="text-xl font-bold">explore for Products</h2>
                <ProductSearch onSearch={setSearchTerm} />
            </div>

            {
                filteredProducts.length === 0 ? (
                    <div className=" flex flex-col justify-center items-center ">
                        <p className="col-span-3 text-center text-lg md:text-2xl text-gray-500 py-8">
                            No products were found with these characteristics.
                        </p>
                        <img src="./empty-box.png" alt="" className="animate-float w-1/8" />
                    </div>
                ) :
                    <ProductGrid products={products} />
            }
        </div>

    );
};

