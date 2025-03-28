import { create } from "zustand";
import { addProductToCart, getCart, updateCartItem, removeFromCart } from "@/api/api";
import { CartItem, Product, LocalCartItem } from "@/types";
import { User } from "@/api/auth";

interface CartState {
  cartItems: (CartItem | LocalCartItem)[];
  setCartItems: (items: (CartItem | LocalCartItem)[]) => void;
  fetchCart: (user: User | null) => Promise<void>;
  addToCart: (product: Product, quantity: number, user: User | null) => Promise<void>;
  addOne: (productId: number, user: User | null) => Promise<void>;
  removeOne: (productId: number, user: User | null) => Promise<void>;
  removeFromCart: (productId: number, user: User | null) => Promise<void>;
  clearCart: () => void;
  getTotalPrice: () => number;
 
}

const productToLocalCartItem = (product: Product, quantity: number): LocalCartItem => ({
  product_id: product.id,
  quantity,
  price: product.price,
  title: product.title,
  image: product.images[0]?.path || '',
});

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
 
  
  setCartItems: (items: (CartItem | LocalCartItem)[]) => set({ cartItems: items }),

  fetchCart: async (user: User | null) => {
    if (user) {
      try {
        const serverCart = await getCart();
        const serverItems = Array.isArray(serverCart) ? serverCart : [];
        
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          try {
            const localItems = JSON.parse(localCart);
      
            const validLocalItems = Array.isArray(localItems) ? localItems : [];
          
            for (const localItem of validLocalItems) {
              const existingItem = serverItems.find(
                (item) => item.product_id === localItem.product_id
              );
              
              if (existingItem) {
                await updateCartItem(localItem.product_id, existingItem.quantity + localItem.quantity);
              } else {
            
                await addProductToCart(localItem.product_id, localItem.quantity);
              }
            }
            
 
            const updatedCart = await getCart();
            set({ cartItems: Array.isArray(updatedCart) ? updatedCart : [] });
            
         
            localStorage.removeItem('cart');
          } catch (parseError) {
            console.error('Error parsing local cart:', parseError);
            set({ cartItems: serverItems });
            localStorage.removeItem('cart');
          }
        } else {
          set({ cartItems: serverItems });
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        set({ cartItems: [] });
      }
    } else {
      try {
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          const localItems = JSON.parse(localCart);
          set({ cartItems: Array.isArray(localItems) ? localItems : [] });
        } else {
          set({ cartItems: [] });
        }
      } catch (error) {
        console.error('Error loading local cart:', error);
        set({ cartItems: [] });
      }
    }
  },

  addToCart: async (product: Product, quantity: number, user: User | null) => {
    const state = get();
    const currentCart = state.cartItems || [];
    let updatedCart: (CartItem | LocalCartItem)[];
    
    const existingItem = currentCart.find(
      (item) => item.product_id === product.id
    );

    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...currentCart, productToLocalCartItem(product, quantity)];
    }

    set({ cartItems: updatedCart });

    if (user) {
      await addProductToCart(product.id, quantity);
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  },

  addOne: async (productId: number, user: User | null) => {
    const state = get();
    const currentCart = state.cartItems || [];
    const item = currentCart.find(item => item.product_id === productId);
    if (!item) return;

    const newQuantity = item.quantity + 1;
    const updatedCart = currentCart.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );

    set({ cartItems: updatedCart });

    if (user) {
      await updateCartItem(productId, newQuantity);
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  },

  removeOne: async (productId: number, user: User | null) => {
    const state = get();
    const currentCart = state.cartItems || [];
    const item = currentCart.find(item => item.product_id === productId);
    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;
    const updatedCart = currentCart.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );

    set({ cartItems: updatedCart });

    if (user) {
      await updateCartItem(productId, newQuantity);
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  },

  removeFromCart: async (productId: number, user: User | null) => {
    const state = get();
    const currentCart = state.cartItems || [];
    const updatedCart = currentCart.filter(
      (item) => item.product_id !== productId
    );

    set({ cartItems: updatedCart });

    if (user) {
      await removeFromCart(productId);
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cart');
  },

  getTotalPrice: () => {
    const state = get();
    const currentCart = state.cartItems || [];
    return currentCart.reduce(
      (total, item) => {
        const price = 'product' in item ? item.product.price : item.price;
        return total + parseFloat(price) * item.quantity;
      },
      0
    );
  },
}));

export default useCartStore;