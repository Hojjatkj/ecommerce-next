// components/ProductCard.tsx
import { getCategoryName } from "@/lib/utils";
import { Product } from "@/types/type";


interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = Boolean(
    product.discount_percent && product.discount_percent > 0
  );

  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount_percent!) / 100
    : product.price;

  return (
    <div className="border group p-4 rounded-lg flex flex-col justify-between h-full bg-white transition-all ease-in-out hover:shadow-xl hover:border-transparent relative">
      {hasDiscount && (
        <span className="absolute top-3 m-2 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-red-600/70 px-3 py-1 text-xs font-extrabold text-white shadow-lg shadow-red-900/20 backdrop-blur-md">
          <img
            src="/icons/kyungheehee-flame-21186_128.gif"
            alt="Flame"
            className="h-4 w-4 object-contain transition-transform duration-300 ease-out group-hover:scale-130 group-hover:-rotate-12"
          />
          <span className="drop-shadow-sm">{product.discount_percent}٪ تخفیف</span>
        </span>
      )}

      <div>
        <div className="w-full aspect-[4/3] relative mb-4 overflow-hidden rounded-md bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="absolute  transition-transform duration-300 ease-in-out group-hover:scale-105 inset-0 h-full w-full object-cover object-center"
          />
        </div>

        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        <div className="mt-2 space-y-1">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-600">
                {finalPrice.toLocaleString("eng")} $
              </span>
              <span className="text-sm text-gray-400 line-through">
                {product.price.toLocaleString("eng")}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-700">
              {product.price.toLocaleString("eng")} $
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>category :</span>
        <span className="font-semibold text-blue-600">
          {getCategoryName(product)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;