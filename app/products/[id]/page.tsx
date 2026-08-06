"use client"

import ProductDetail from "@/components/producPage/productDetails";
import { useProduct } from "@/hooks/useFilteredProducts";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { products, loading } = useProduct(id);
  const product = products[0];

  if (loading) return <div>در حال بارگذاری...</div>;
  if (!product) return <div>محصول پیدا نشد</div>;

  return (
    <div>
 <ProductDetail product={product}/>
    </div>
  );
}