"use client"
import { useCartStore } from "@/store/cart-store";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCard";


const Cart = () => {
    const items =useCartStore((state) => state.items);

    return (
        <div className="flex flex-col gap-4 ">
            {items.length === 0 ? 
            <div>
                <EmptyCart/>
            </div>
            : null  }
            {items.map((item) => (
                <CartItem key={item.id} items={item} />
            ))}
        </div>
    );
};

export default Cart;