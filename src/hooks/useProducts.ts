import { getAllProducts, getLatestProducts, getProductById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

export function useProducts() {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: getAllProducts
    })
}

export function useLatestProducts() {
    return useQuery<Product[], Error>({
        queryKey: ['latestProducts'],
        queryFn: getLatestProducts
    })
}

export function useProduct(id: string) {
    return useQuery<Product, Error>({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        enabled: !!id
    })
}