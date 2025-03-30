import { getAllProducts, getLatestProducts, getProductById } from "@/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

export function usePrefetchFeaturedProduct() {
    const queryClient = useQueryClient();
    
    return () => {
        queryClient.prefetchQuery({
            queryKey: ['product', '4'],
            queryFn: () => getProductById('4'),
            staleTime: 1000 * 60 * 5, 
            gcTime: 1000 * 60 * 30,
        });
    };
}