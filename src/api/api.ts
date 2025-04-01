import { CartItem, Category, Order, OrderItem, Product } from "@/types";
import { api } from "./axios"

// Товары

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await api.get('/products');
    return res.data;
}

export const getLatestProducts = async (): Promise<Product[]> => {
    const res = await api.get('/products/latest');
    return res.data;
}

export const getProductsWithPagination = async (page: number = 1, perPage: number = 8): Promise<{
        data: Product[],
        last_page: number,
        current_page: number,
        total: number,
}> => {
    const res = await api.get('/products/paginated', {
        params: {
            page,
            per_page: perPage,
        }
    });
    return res.data;
}

export const getProductById = async (id: string): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export const getProductsByTag = async (tag: string): Promise<Product[]> => {
    const res = await api.get(`/products/tags`, {
        params: {
            tag,
        }
    })
    return res.data;
}

export const createProduct = async (productData: FormData): Promise<{
    "product": Product;
    message: string;
}> => {
    const res = await api.post('/products', productData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const updateProduct = async (id: string, productData: FormData): Promise<{
    "product": Product;
    message: string;
}> => {
    productData.append('_method', 'PUT');
    const res = await api.post(`/products/${id}`, productData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const deleteProduct = async (id: string): Promise<void> => {
    const res = await api.delete(`/products/${id}`);
    return res.data
}

// Категории

export const getCategories = async (): Promise<Category[]> => {
    const res = await api.get('/categories');
    return res.data;
}

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
    const res = await api.get(`/categories/${slug}`);
    return res.data;
}

// Корзина

export const getCart = async (): Promise<CartItem[]> => {
    try {
        const res = await api.get('/cart');
        return res.data;
    } catch (error) {
        console.error('Error fetching cart:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

export const addProductToCart = async (productId: number, quantity: number): Promise<CartItem[]> => {
    try {
        const res = await api.post(`/cart`, {
            product_id: productId,
            quantity: quantity,
        });
        console.log('Cart updated:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error adding item to cart:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

export const updateCartItem = async (productId: number, quantity: number): Promise<CartItem[]> => {
    try {
        const res = await api.put(`/cart/${productId}`, {
            quantity: quantity,
        });
        return res.data;
    } catch (error) {
        console.error('Error updating cart item:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

export const removeFromCart = async (productId: number): Promise<CartItem[]> => {
    try {
        const res = await api.delete(`/cart/${productId}`);
        return res.data;
    } catch (error) {
        console.error('Error removing item from cart:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

// Заказы

export const createOrder = async (orderItems: OrderItem[]) => {
    try {
        const token = localStorage.getItem("token");
        const res = await api.post(
            '/checkout',
          {
            items: orderItems,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { url } = res.data;
        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        console.error("Checkout failed:", error);
      }
}

export const fetchUserOrders = async (): Promise<{
    orders: Order[],
}> => {
    try {
        const res = await api.get('/orders');
        return res.data;
    } catch (error) {
        console.error('Error fetching user orders:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

export const getOrderBySessionId = async (sessionId: string) => {
    try {
        const res = await api.get(`/orders/by-session/${sessionId}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching order by session ID:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

export const searchProducts = async (query: string, limit: number = 5): Promise<Product[]> => {
    const res = await api.get('/products/search', {
        params: {
            query,
            limit,
        }
    });

    return res.data;
}

export const getProductsByCategory = async (categorySlug: string, limit: number = 12): Promise<Product[]> => {
    const res = await api.get(`/products/category/${categorySlug}`, {
        params: {
            limit,
        }
    });
    
    return res.data;
}