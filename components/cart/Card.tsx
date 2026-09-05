"use client"
import { useCartStore } from "@/store/cart-store";
import CartItem from "./CartItem";


const Cart = () => {
    const items =useCartStore((state) => state.items);

    return (
        <div>
            {items.length === 0 ? 
            <div>
                <p>سبد خرید شما خالی است.</p>
            </div>
            : null  }
            {items.map((item) => (
                <CartItem key={item.id} items={item} />
            ))}
        </div>
    );
};

export default Cart;