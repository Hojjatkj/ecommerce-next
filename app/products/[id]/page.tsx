"use client";

import ProductDetail from "@/components/producPage/productDetails";
import Breadcrumb from "@/components/ui/list/Breadcrumb";
import { useProduct } from "@/hooks/useFilteredProducts";
import { getCategoryName } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  console.log("PRODUCT PAGE ID:", id);

  const { products, loading, error } = useProduct(id);

  console.log("PRODUCT PAGE:", {
    id,
    loading,
    error,
    products,
  });

  if (loading) {
    return <div className="p-10">در حال بارگذاری...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-red-500">
        خطا: {error}
      </div>
    );
  }

  const product = products[0];

  if (!product) {
    return <div className="m-8">محصول پیدا نشد</div>;
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "محصولات", href: "/products" },
          {
            label: getCategoryName(product),
            href: `/products?category=${getCategoryName(product)}`,
          },
          { label: product.title },
        ]}
      />

      <ProductDetail product={product} />
    </div>
  );
}