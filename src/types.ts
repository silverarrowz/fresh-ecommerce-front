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
    price: number;
    price_old?: number;
    description: string;
    stock: number;
    image: string;
    category: Category;
    images: ProductImage[];
}

export interface CartItem {
    product_id: number;
    quantity: number;
}