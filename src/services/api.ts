import { Product } from "@/types";
import { api } from "./axios"


export const getProducts = async () => {
    const res = await api.get('/products');
    return res.data;
}

export const getProductById = async (id: string) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export const createProduct = async (productData: Partial<Product>) => {
    const res = await api.post('/products', productData);
    return res.data;
}

export const updateProduct = async (id: string, productData: Partial<Product>) => {
    const res = await api.put(`/products/${id}`, productData);
    return res.data;
}

export const deleteProduct = async (id: string) => {
    const res = await api.delete(`/products/${id}`);
    return res.data
}