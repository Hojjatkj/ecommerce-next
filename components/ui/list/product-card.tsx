// components/ProductCard.tsx
import { CalculateDiscount } from "@/lib/calculateDiscount";
import { Product } from "@/types/type";
import Link from "next/link";
import { DiscountBadge } from "../producCardtShares/discount-badge";
import ProductImage from "../producCardtShares/productImage";
import SubProductCard from "../producCardtShares/subProductCard";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { hasDiscount, finalPrice } = CalculateDiscount({
    price: product.price,
    discountPercent: product.discount_percent,
  });

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-(--color-brand-primary)/10 dir-rtl">
        {hasDiscount && <DiscountBadge percent={product.discount_percent} />}

        <div>
          <ProductImage product={product} />

          <h3 className="mb-2 line-clamp-2 text-sm md:text-1xl md:font-bold text-text-main group-hover:text-brand-primary transition-colors">
            {product.title}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            {hasDiscount ? (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                {/* قیمت اصلی تخفیف‌خورده با سبززمردی که با بنفش خفن میشه */}
                <span className="text-lg font-black text-emerald-500 dark:text-emerald-400">
                  {finalPrice.toLocaleString("fa-IR")}
                  <span className="text-xs font-semibold mr-0.5">تومان</span>
                </span>
                <span className="text-xs text-muted-text line-through opacity-70">
                  {product.price.toLocaleString("fa-IR")}
                </span>
              </div>
            ) : (
              <span className="text-lg font-black text-text-main">
                {product.price.toLocaleString("fa-IR")}
                <span className="text-xs font-semibold mr-0.5">تومان</span>
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-border-main pt-3">
          <SubProductCard product={product} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;