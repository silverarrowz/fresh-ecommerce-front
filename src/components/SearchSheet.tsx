import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/types";
import { searchProducts } from "@/api/api";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ButtonLink } from "./ui/button-link";

const SearchSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchProducts(searchQuery, 6);
        setSearchResults(results);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(performSearch, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const popularSearches = [
    "Витамины",
    "Протеиновые батончики",
    "Изотоники",
    "Kultlab",
  ];

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        setSearchQuery("");
      }}
    >
      <SheetContent className="w-full h-full sm:max-w-lg z-250 flex flex-col border-none px-8">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl font-medium text-center">
            <Link
              to="/search"
              onClick={() => {
                onOpenChange(false);
                setSearchQuery("");
              }}
              className="inline-block relative hover:text-cyan-500 transition-colors duration-300 mt-4"
            >
              Поиск
              <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Поиск товаров в каталоге. Введите название товара или категории.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 flex flex-col">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-6 border-0 border-b-2 border-transparent focus-visible:border-cyan-400 focus-visible:border-b-2 focus-visible:ring-0 transition-all duration-200 text-lg"
            />
          </div>

          <ScrollArea className="flex-1 h-full">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </motion.div>
            ) : searchQuery ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 h-full"
              >
                {searchResults.length > 0 ? (
                  <div className="flex flex-col justify-between h-full">
                    <ul className="max-h-[calc(100vh-18rem)] overflow-y-auto pb-12">
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            onClick={() => {
                              onOpenChange(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <img
                              src={product.images[0]?.url || ""}
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium hover:text-cyan-500 transition-colors">
                                {product.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {product.price} ₽
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <ButtonLink
                      to={`/search?query=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        onOpenChange(false);
                        setSearchQuery("");
                      }}
                      className=" text-center text-white font-medium h-12 absolute bottom-8 left-0 right-0 bg-green-400"
                    >
                      Все результаты →
                    </ButtonLink>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Товары не найдены
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
                    <TrendingUp className="h-4 w-4" />
                    Популярные запросы
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
