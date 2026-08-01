'use client';

import ProductList from '@/components/ui/product-list';
import UseAllProductsOptions from '@/hooks/useAllProducts.ts';



export default function ProductsPage() {
    const { products } = UseAllProductsOptions ();

    return (
        <div className="p-6 bg-gray-50" >
             <h2 className="text-2xl font-bold ">Products</h2>
            <ProductList products={products} />
        </div>
    );
}