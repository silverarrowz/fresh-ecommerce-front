import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Hero from "@/components/home/Hero";
import { useProducts } from "@/hooks/useProducts";

const Home = () => {
  const { products, isLoading } = useProducts();

  return (
    <>
      {!isLoading && <Hero product={products[1]} />}
      <section className="max-w-2xl mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <h1 className="sr-only">Главная страница</h1>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Хит продаж
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {isLoading || !products || products.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>
    </>
  );
};

export default Home;
