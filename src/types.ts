export type Category = 'Протеиновые батончики и печенье' | 'Протеины' | 'Витамины и минералы' | 'Изотоники';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    stock: number;
    image: string;
    category: Category;
    images?: File[];
  }