import { useParams } from "react-router";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useProduct } from "@/hooks/useProduct";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading } = useProduct(id!);
  const [quantity, setQuantity] = useState(1);

  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Каталог", path: "/products" },
    { label: product?.title || "", path: `/products/${id}` },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Продукт не найден.</h1>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start bg-white rounded-xl px-8 py-12">
        <div className="flex flex-col">
          <div className="w-full">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/storage/${
                product!.images[0].path
              }`}
              alt={product!.title}
              className="w-full h-full object-center object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product!.title}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Информация о товаре</h2>
            <p className="text-3xl text-gray-900">{product!.price} руб.</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Описание</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product!.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <button
                className="w-10 h-10 bg-gray-100 hover:bg-cyan-400 transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                <FiMinus className="w-6 h-6" />
              </button>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="w-16 h-10 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
              />
              <button
                className="w-10 h-10 bg-gray-100 hover:bg-cyan-400 transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FiPlus className="w-6 h-6" />
              </button>
            </div>
          </div>

          <button className="w-full bg-cyan-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-cyan-400 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 cursor-pointer transition-all duration-300 mt-8">
            В корзину
          </button>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Категория</h3>
            <p className="mt-2 text-sm text-gray-500">{product!.category}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
