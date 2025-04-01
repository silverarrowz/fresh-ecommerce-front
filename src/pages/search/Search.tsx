import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { SearchResults } from "./SearchResults";
import { SearchSkeleton } from "./SearchSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "relevance";

  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl text-cyan-500 font-bold tracking-tight mb-2 relative inline-block">
          {query ? `Результаты поиска "${query}"` : "Поиск"}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
        </h1>
      </motion.div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Поиск товаров..."
          defaultValue={query}
          value={query}
          onChange={handleQueryChange}
          className="w-full pl-12 pr-4 py-6 border-0 border-b-2 border-transparent focus-visible:border-cyan-400 focus-visible:border-b-2 focus-visible:ring-0 transition-all duration-200 text-lg"
        />
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={query} category={category} sort={sort} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
