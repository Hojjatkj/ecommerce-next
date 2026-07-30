'use client';

import ProductList from '@/components/ui/product-list';
import usePageProducts from '@/hooks/useProducts';

export default function ProductsPage() {
    const { products } = usePageProducts();

    return (
        <div className="p-6 bg-gray-50" >
            <ProductList products={products} />
        </div>
    );
}