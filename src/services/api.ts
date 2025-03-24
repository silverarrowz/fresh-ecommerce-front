import { api } from "./axios"


export const getProducts = async () => {
    const res = await api.get('/products');
    return res.data;
}

export const getProductById = async (id: string) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
}