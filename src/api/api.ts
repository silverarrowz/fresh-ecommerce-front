import { api } from "./axios"

// Товары

export const getProducts = async () => {
    const res = await api.get('/products/all');
    return res.data;
}

export const getProductsWithPagination = async (page: number = 1, perPage: number = 8) => {
    const res = await api.get('/products', {
        params: {
            page,
            per_page: perPage,
        }
    });
    return res.data;
}

export const getProductById = async (id: string) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export const createProduct = async (productData: FormData) => {
    const res = await api.post('/products', productData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const updateProduct = async (id: string, productData: FormData) => {
    productData.append('_method', 'PUT');
    const res = await api.post(`/products/${id}`, productData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const deleteProduct = async (id: string) => {
    const res = await api.delete(`/products/${id}`);
    return res.data
}


// Корзина

export const getCart = async () => {
    try {
        const res = await api.get('/cart');
        return res.data;
    } catch (error) {
        console.error('Error fetching cart:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

export const addProductToCart = async (productId: number, quantity: number) => {
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

export const updateCartItem = async (productId: number, quantity: number) => {
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

export const removeFromCart = async (productId: number) => {
    try {
        const res = await api.delete(`/cart/${productId}`);
        return res.data;
    } catch (error) {
        console.error('Error removing item from cart:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}