"use client"

import ProductDetail from "@/components/producPage/productDetails";
import Breadcrumb from "@/components/ui/list/Breadcrumb";
import { useProduct } from "@/hooks/useFilteredProducts";
import { getCategoryName } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { products, loading } = useProduct(id);
  const product = products[0];

  if (loading) return <div><Image src={"/icons/Search (1).svg"} alt="loading..." fill /></div>;
  if (!product) return <div className="m-8">محصول پیدا نشد</div>;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "محصولات", href: "/products" },
          { label: getCategoryName(product), href: `/products?category=${getCategoryName(product)}` },
          { label: product.title },
        ]}
      />
      <ProductDetail product={product} />
    </div>
  );
}