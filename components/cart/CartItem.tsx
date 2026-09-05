"use client";

import { CartItem as CartItemType, useCartStore } from "@/store/cart-store";

interface Props {
    items: CartItemType;
}

const CartItem = ({ items }: Props) => {
    const increaseQuantity = useCartStore((store) => store.increaseQuantity);
    const decreaseQuantity = useCartStore((store) => store.decreaseQuantity);
    const removeItemCompletely = useCartStore(
        (store) => store.removeItemCompletely
    );

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 m-2 border rounded-xl shadow-sm">

            {/* Product */}
            <div className="flex items-center gap-4 flex-1">
                <img
                    className="w-20 h-20 object-cover rounded-lg"
                    src={items.imageUrl ?? "/placeholder.png"}
                    alt={items.name}
                />

                <div>
                    <h3 className="font-semibold text-lg">
                        {items.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        قیمت واحد: {items.price.toFixed(2)} تومان
                    </p>
                </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                    تعداد
                </span>

                <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                        onClick={() => increaseQuantity(items.id)}
                        className="px-3 py-1.5 hover:bg-gray-100"
                    >
                        +
                    </button>

                    <span className="px-4 py-1.5 border-x">
                        {items.quantity}
                    </span>

                    <button
                        onClick={() => decreaseQuantity(items.id)}
                        className="px-3 py-1.5 hover:bg-gray-100"
                    >
                        -
                    </button>
                </div>
            </div>

            {/* Total + Remove */}
            <div className="flex items-center justify-between md:flex-col md:items-end gap-2 min-w-[120px]">
                <span className="font-semibold">
                    {(items.price * items.quantity)} تومان
                </span>

                <button
                    onClick={() => removeItemCompletely(items.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                >
                    حذف
                </button>
            </div>
        </div>
    );
};

export default CartItem;