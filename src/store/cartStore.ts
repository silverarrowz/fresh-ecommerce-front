import { create } from "zustand";
import { addProductToCart, getCart } from "@/api/api";
import { CartItem, Product } from "@/types";
import { User } from "@/api/auth";

const useCartStore = create((set, get) => ({
    cartItems: [],
    setCartItems: (items: CartItem[]) => set({cartItems: items}),
    fetchCart: async (user: User) => {
        if (user) {
            try {
                const cart = await getCart();
                set({cartItems: cart});
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        } else {
            const localCart = localStorage.getItem('cart');
            if (localCart) {
                set({cartItems: JSON.parse(localCart)});
            }
        }
    },
    addToCart: async (product: Product, quantity = 1, user: User) => {
        let updatedCart;
        const existingItem = state.cartItems.find((item: CartItem) => item.product_id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
            updatedCart = state.cartItems.map((item: CartItem) => item.product_id === product.id ? {...item, quantity: existingItem.quantity} : item);
        } else {
            updatedCart = [...state.cartItems, { ...product, quantity }];
        }

        set({cartItems: updatedCart});

        if (user) {
            addProductToCart(product.id, quantity)
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
     
       
    },
    addOne: (productId: number) => set((state) => {
        const item = state.cartItems.find((item: CartItem) => item.product_id === productId);
        item.quantity +=1;
    }),
    removeOne: (productId: number) => set((state) => {
        const item = state.cartItems.find((item) => item.product_id === productId);
        item.quantity -=1;
    }),
    removeFromCart: (productId: number) => set((state) => {
        state.cartItems = state.cartItems.filter((item: CartItem) => item.product_id !== productId);
    }),
    clearCart: () => set({cartItems: []}),
    getTotalPrice: () => {
        return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    
}))

export default useCartStore;