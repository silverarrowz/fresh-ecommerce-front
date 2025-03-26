import { api } from "./axios"

export const getProducts = async () => {
    const res = await api.get('/products');
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
        return null;
    }
}