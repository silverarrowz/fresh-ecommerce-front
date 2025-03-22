import { useParams } from "react-router";
import { products } from "../data/products";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Продукт не найден.</h1>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div className="flex flex-col">
          <div className="w-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-center object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.title}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Информация о товаре</h2>
            <p className="text-3xl text-gray-900">{product.price} руб.</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Описание</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <button className="w-full bg-cyan-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 cursor-pointer transition-all duration-300 mt-8">
            В корзину
          </button>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Категория</h3>
            <p className="mt-2 text-sm text-gray-500">{product.category}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
