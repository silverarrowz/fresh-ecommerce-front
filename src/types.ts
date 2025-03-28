export type Category = 'Протеиновые батончики и печенье' | 'Протеины' | 'Витамины и минералы' | 'Изотоники';

interface ProductImage {
    id: number;
    product_id: number;
    path: string;
    created_at: string;
    updated_at: string;
}


  export interface Product {
    id: number;
    title: string;
    price: string;
    price_old: string | null;
    description: string;
    stock: number;
    category: string;
    created_at: string;
    updated_at: string;
    images: ProductImage[];
  }

  export interface LocalProduct {
    id: number;
    title: string;
    price: number;
    price_old?: number;
    description: string;
    stock: number;
    image: string;
    category: Category;
    images: ProductImage[];
}
  
  export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    product: Product;
  }
  

  export interface LocalCartItem {
    product_id: number;
    quantity: number;
    price: string;
    title: string;
    image: string;
  }

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price?: string;
  title?: string;
  image?: string;
} 

