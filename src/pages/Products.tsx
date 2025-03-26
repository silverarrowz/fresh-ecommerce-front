import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProducts } from "@/hooks/useProducts";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const Products = () => {
  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Каталог", path: "/products" },
  ];

  const { products, isLoading } = useProducts();

  return (
    <main className="max-w-2xl mx-auto py-20 px-4 lg:max-w-7xl lg:px-8">
      <div className="mb-12">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-16">Каталог</h1>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </main>
  );
};

export default Products;
