import { useEffect, useState } from 'react';
import { getProductById } from '@/api/api';
import { Product } from '@/types';

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { product, isLoading };
}
