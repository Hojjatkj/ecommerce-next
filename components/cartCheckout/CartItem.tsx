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
        <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 m-2 rounded-xl border border-border-main bg-card-bg shadow-sm min-w-0">

            {/* Product */}
            <div className="flex items-center text-foreground  gap-4 flex-1">
                <img
                    className="w-20 h-20 object-cover rounded-lg"
                    src={items.imageUrl ?? "/placeholder.png"}
                    alt={items.name}
                />

                <div>
                    <h3 className="font-semibold text-lg">
                        {items.name}
                    </h3>

                    <p className="text-sm ">
                        قیمت واحد: {items.price.toLocaleString()} تومان
                    </p>
                </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center text-muted-text gap-3">
                <span className="text-sm ">
                    تعداد
                </span>

                <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                        onClick={() => increaseQuantity(items.id)}
                        className="px-3 py-1.5 hover:bg-muted-bg"
                    >
                        +
                    </button>

                    <span className="px-4 py-1.5 border-x border-border-main">
                        {items.quantity}
                    </span>

                    <button
                        onClick={() => decreaseQuantity(items.id)}
                        className="px-3 py-1.5 hover:bg-muted-bg"
                        disabled={items.quantity<=1}
                    >
                        -
                    </button>
                </div>
            </div>

            {/* Total + Remove */}
            <div className="flex items-center text-muted-foreground justify-between md:flex-col md:items-end gap-2 min-w-30">
                <span className="font-semibold">
                    {((items.price * items.quantity).toLocaleString())} تومان
                </span>

                <button
                    onClick={() => removeItemCompletely(items.id)}
                    className="text-sm text-destructive hover:text-destructive/80"
                >
                    حذف
                </button>
            </div>
        </div>
    );
};

export default CartItem;