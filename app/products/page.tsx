'use client';

import ProductList from '@/components/ui/product-list';
import useProducts from '@/hooks/useProducts';


export default function ProductsPage() {
    const { products } = useProducts();

    return (
        <div className="p-6 bg-gray-50" >
             <h2 className="text-xl font-bold  mb-4">Products</h2>
            <ProductList products={products} />
        </div>
    );
}