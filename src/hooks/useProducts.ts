import { Product } from "@/types";
import { getProducts } from "@/api/api";
import { useEffect, useState } from "react";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts()
        .then(setProducts)
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }, [])

    return { products, isLoading }
}