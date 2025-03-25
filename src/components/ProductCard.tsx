import { Product } from "@/types";
import { Link } from "react-router";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="group relative bg-white shadow-md px-4 py-6 rounded-xl">
      <div className="flex flex-col justify-between gap-y-6 h-full">
        <Link to={`/products/${product.id}`} className="flex flex-col gap-y-6">
          <div className="w-full min-h-80 aspect-w-1 aspect-h-1 overflow-hidden lg:h-80 lg:aspect-none">
            {product.images.length > 0 && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/storage/${
                  product.images[0].path
                }`}
                alt={product.title}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            )}
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-xl font-bold text-cyan-600">
                {product.price} руб.
              </p>
              <h3 className="font-bold text-gray-700">{product.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
        </Link>
        <button
          onClick={() => {}}
          className="w-full flex justify-center bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(0,211,243,0.63)] transition-all duration-300 text-white py-2.5 rounded-md cursor-pointer"
        >
          В корзину
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
