import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Product, Category } from "@/types";
import {
  searchProducts,
  getProductsByCategory,
  getCategories,
} from "@/api/api";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SearchResults = ({
  query,
  category,
  sort,
}: {
  query: string;
  category: string;
  sort: string;
}) => {
  const [, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          query
            ? searchProducts(query, 10)
            : category !== "all"
            ? getProductsByCategory(category, 10)
            : Promise.resolve([]),
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
        console.log(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, category]);

  const handleCategoryChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("category", value);
      return prev;
    });
  };

  const handleSortChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("sort", value);
      return prev;
    });
  };

  const filteredProducts = products.filter((product) =>
    category === "all" ? true : product.category.slug === category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      default:
        return 0;
    }
  });

  const totalResults = filteredProducts.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {totalResults}{" "}
            {totalResults.toString().endsWith("1")
              ? "результат"
              : totalResults.toString().endsWith("2") ||
                totalResults.toString().endsWith("3") ||
                totalResults.toString().endsWith("4")
              ? "результата"
              : "результатов"}
          </span>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">По релевантности</SelectItem>
              <SelectItem value="price-asc">По цене (возр.)</SelectItem>
              <SelectItem value="price-desc">По цене (убыв.)</SelectItem>
              <SelectItem value="newest">По новизне</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </motion.div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Товары не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить параметры поиска или использовать другие
              ключевые слова
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
