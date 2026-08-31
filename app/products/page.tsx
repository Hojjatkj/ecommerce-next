'use client';
import ProductList from '@/components/ui/list/product-list';
import useFilteredProducts from '@/hooks/useFilteredProducts';


export default function ProductsPage() {
    const { products } = useFilteredProducts ();

    return (
        <div className="p-6" >
             <h2 className="text-2xl font-bold ">محصولات</h2>

            <ProductList products={products} />
        </div>
    );
}