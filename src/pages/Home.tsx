import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Hero from "@/pages/home/components/Hero";
import { useProducts } from "@/hooks/useProducts";
import OutroSection from "./home/components/OutroSection";

const Home = () => {
  const { products, isLoading } = useProducts();

  return (
    <div className="min-h-screen w-full">
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Хит продаж</h2>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Успей купить по акции
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
