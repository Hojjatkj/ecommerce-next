
import { create } from 'zustand';
import { persist } from "zustand/middleware";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeItemCompletely: (id: number) => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item) =>
                set((state) => {
                    const exisiting = state.items.find((i) => i.id === item.id)

                    if (exisiting) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ?
                                    { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, item] }
                }),
            removeItem: (id) =>
                set((state) => {
                    return {
                        items: state.items
                            .map((item) =>
                                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                            ).filter((item) => item.quantity > 0)

                    };
                }),
            clearCart: () =>
                set(() => {
                    return { items: [] }
                }),
            increaseQuantity: (id: number) =>
                set((state) => {
                    return {
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                        )
                    };
                }),
            decreaseQuantity: (id: number) =>
                set((state) => {
                    return {
                        items: state.items.map((item) =>
                            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                        ).filter((item) => item.quantity > 0)
                    };
                }),
                removeItemCompletely: (id: number) =>
                set((state) => {
                    return {
                        items: state.items.filter((item) => item.id !== id)
                    };
                }),
                    // getTotalItems: () => {
                    //     return get().items.reduce((total, item) => total + item.quantity, 0);
                    // }
        }),
        { name: "cart" }
    )
)