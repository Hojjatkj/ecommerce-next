import { getCategoryName, productToCartItem } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/type";

const SubProductCard = ({ product }: { product: Product }) => {

      const addItem = useCartStore((state) => state.addItem);
      const removeItem = useCartStore((state) => state.removeItem);
      const items = useCartStore((state) => state.items);
      const cartItem = items.find((i) => i.id === String(product.id));
      const quantityInCart = cartItem?.quantity ?? 0;

    return (
        <div className="mt-4 flex flex-col gap-3 border-t-2 border-gray-100 pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">category</span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-600">
              {getCategoryName(product)}
            </span>
          </div>

          <div onClick={(e) => e.preventDefault()}>
            {quantityInCart === 0 ? (
              <button
                onClick={() => addItem(productToCartItem(product))}
                className="w-full rounded-lg bg-(--color-brand-primary) py-2 text-sm font-semibold text-white"
              >
                افزودن به سبد
              </button>
            ) : (
              <div className="flex w-full items-center justify-between rounded-lg border border-gray-200">
                <button
                  onClick={() => removeItem(String(product.id))}
                  className="px-3 py-2 text-lg font-bold text-gray-600"
                >
                  −
                </button>
                <span className="font-semibold">{quantityInCart}</span>
                <button
                  onClick={() => addItem(productToCartItem(product))}
                  className="px-3 py-2 text-lg font-bold text-gray-600"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
    );
};

export default SubProductCard;