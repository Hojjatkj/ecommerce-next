
import { create } from 'zustand';
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeItemCompletely: (id: string) => void;
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
            increaseQuantity: (id: string) =>
                set((state) => {
                    return {
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                        )
                    };
                }),
            decreaseQuantity: (id: string) =>
                set((state) => {
                    return {
                        items: state.items.map((item) =>
                            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                        ).filter((item) => item.quantity > 0)
                    };
                }),
                removeItemCompletely: (id: string) =>
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