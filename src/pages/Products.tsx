import { Link } from "react-router";
import { products } from "../data/products";

const Products = () => {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-16">Каталог</h1>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <article className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`/products/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${product.price}
              </p>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
