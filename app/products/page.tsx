'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import ProductList from '@/components/ui/product-list';
import useProducts from '@/hooks/useSpecialProducts';
import usePageProducts from '@/hooks/useProducts';

// تعریف تایپ بر اساس دیتابیس شما


export default function ProductsPage() {
const { products, loading } = usePageProducts();

    return (
        <div className="p-6" >
            <h2 className="text-xl font-bold mb-4">Products</h2>

            <ProductList products={products} />
        </div>
    );
}