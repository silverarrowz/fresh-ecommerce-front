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
        console.log('fetching cart for user', user.name);
        const serverCart = await getCart();
        
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          const localItems = JSON.parse(localCart);
          
          // При входе пользователя в систему, объединяем локальную корзину (если она есть) с корзиной, привязанной к пользователю
          const mergedItems = [...serverCart];
          
          localItems.forEach((localItem: LocalCartItem) => {
            const existingItem = mergedItems.find(
              (item) => item.product_id === localItem.product_id
            );
            
            if (existingItem) {
              // Если товар уже есть в корзине пользователя, обновляем количество
              existingItem.quantity += localItem.quantity;
            } else {
              // Если товара нет в корзине пользователя, добавляем его
              mergedItems.push(localItem);
            }
          });
          
          
          for (const item of mergedItems) {
            if (!serverCart.find((serverItem: CartItem) => serverItem.product_id === item.product_id)) {
              await addProductToCart(item.product_id, item.quantity);
            }
          }
       
          localStorage.removeItem('cart');
 
          set({ cartItems: mergedItems });
        } else {
        
          set({ cartItems: serverCart });
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        set({ cartItems: [] });
      }
    } else {
      console.log('fetching cart for guest');
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        set({ cartItems: JSON.parse(localCart) });
      } else {
     
        set({ cartItems: [] });
      }
    }
  },

  addToCart: async (product: Product, quantity: number, user: User | null) => {
    const state = get();
    let updatedCart: (CartItem | LocalCartItem)[];
    
    const existingItem = state.cartItems.find(
      (item) => item.product_id === product.id
    );

    if (existingItem) {
      updatedCart = state.cartItems.map((item) =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...state.cartItems, productToLocalCartItem(product, quantity)];
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
    const item = state.cartItems.find(item => item.product_id === productId);
    if (!item) return;

    const newQuantity = item.quantity + 1;
    const updatedCart = state.cartItems.map((item) =>
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
    const item = state.cartItems.find(item => item.product_id === productId);
    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;
    const updatedCart = state.cartItems.map((item) =>
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
    const updatedCart = state.cartItems.filter(
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
    return state.cartItems.reduce(
      (total, item) => {
        const price = 'product' in item ? item.product.price : item.price;
        return total + parseFloat(price) * item.quantity;
      },
      0
    );
  },
}));

export default useCartStore;