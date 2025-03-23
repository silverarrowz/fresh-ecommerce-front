import { products } from "../data/products";
import ProductCard from "@/components/ui/ProductCard";

const Products = () => {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-16">Каталог</h1>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Products;
