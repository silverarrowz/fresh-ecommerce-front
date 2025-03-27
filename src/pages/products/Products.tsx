import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useState } from "react";
import { useEffect } from "react";
import { getProductsWithPagination } from "@/api/api";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Products = () => {
  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Каталог", path: "/products" },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await getProductsWithPagination(page, 8);
      setProducts(data.data);
      setTotalPages(data.last_page);
      setIsLoading(false);
    };
    fetchProducts();
  }, [page]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="max-w-2xl mx-auto py-20 px-4 lg:max-w-7xl lg:px-8">
      <div className="mb-12">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-16">Каталог</h1>

      <motion.div
        key={page}
        variants={container}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
        className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
      </motion.div>

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-10 w-10 rounded-full  disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`h-10 w-10 rounded-full text-sm font-medium transition-all duration-200 ${
                    page === i + 1
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-10 w-10 rounded-full  disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Страница {page} из {totalPages}
          </p>
        </motion.div>
      )}
    </main>
  );
};

export default Products;
