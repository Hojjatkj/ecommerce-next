// components/ProductCard.tsx
import { CalculateDiscount } from "@/lib/calculateDiscount";
import { getCategoryName } from "@/lib/utils";
import { Product } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { hasDiscount, finalPrice } = CalculateDiscount(
    {
      price: product.price,
      discountPercent: product.discount_percent
    }
  )

  const mainImage = [...product.product_images]
    .sort((a, b) => a.sort_order - b.sort_order)[0]?.url;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60">
        {hasDiscount && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-red-500/30">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5 animate-pulse"
            >
              <path d="M12 2c1 3-1 4-1 6 0 1.5 1 2.5 2 2.5.8 0 1.5-.6 1.5-1.5 0-.5-.2-1-.5-1.3C15.5 9 17 11 17 13.5 17 18 14 21 12 21s-5-3-5-7.5C7 9.5 9.5 7 10 4c.3-1 .8-1.5 2-2z" />
            </svg>
            {product.discount_percent}٪
          </span>
        )}

        <div>
          <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
            <Image
              unoptimized
              fill
              src={mainImage}
              alt={product.title}
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>

          <h3 className="mb-1.5 line-clamp-1 text-base font-semibold text-gray-800">
            {product.title}
          </h3>

          <div className="mt-1 flex items-baseline gap-2">
            {hasDiscount ? (
              <div className="flex items-center gap-5">
                <span className="text-lg font-extrabold text-emerald-600">
                  {finalPrice.toLocaleString("en-US")} $
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.price.toLocaleString("en-US")}
                </span>
              </div>
            ) : (
              <span className="text-xl font-extrabold text-gray-800">
                {product.price.toLocaleString("en-US")} $
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
          <span className="text-gray-400">category</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-600">
            {getCategoryName(product)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;