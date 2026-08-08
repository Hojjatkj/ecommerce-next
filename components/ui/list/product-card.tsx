// components/ProductCard.tsx
import { CalculateDiscount } from "@/lib/calculateDiscount";
import { getCategoryName, productToCartItem } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { DiscountBadge } from "../producCardtShares/discount-badge";
import ProductImage from "../producCardtShares/productImage";
import SubProductCard from "../producCardtShares/subProductCard";

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

  // const addItem = useCartStore((state) => state.addItem);
  // const removeItem = useCartStore((state) => state.removeItem);
  // const items = useCartStore((state) => state.items);
  // const cartItem = items.find((i) => i.id === String(product.id));
  // const quantityInCart = cartItem?.quantity ?? 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-emerald-100 hover:shadow-md">
        {hasDiscount && (<DiscountBadge percent={product.discount_percent} />)}
        <div>
          <ProductImage product={product} />
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
        <SubProductCard product={product} />
      </div>
    </Link >
  );
};

export default ProductCard;