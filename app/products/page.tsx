'use client';
import { Suspense } from 'react';
import ProductList from '@/components/ui/list/product-list';
import useFilteredProducts from '@/hooks/useFilteredProducts';

export default function ProductsPage() {
    const { products } = useFilteredProducts();

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">محصولات</h2>

            <Suspense fallback={null}>
                <ProductList products={products} />
            </Suspense>
        </div>
    );
}
