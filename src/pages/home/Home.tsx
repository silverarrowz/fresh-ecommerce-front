import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Hero from "@/pages/home/components/Hero";
import { useProducts } from "@/hooks/useProducts";
import OutroSection from "./components/OutroSection";

const Home = () => {
  const { products, isLoading } = useProducts();

  return (
    <div className="min-h-screen w-full">
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">
          <span className="inline-block relative">
            Хит продаж
            <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard label="Хит" key={product.id} product={product} />
              ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">
          <span className="inline-block relative">
            Успей купить по акции
            <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    label="Скидка 50%"
                    key={product.id}
                    product={product}
                  />
                ))}
        </div>
      </section>

      <OutroSection />
    </div>
  );
};

export default Home;
