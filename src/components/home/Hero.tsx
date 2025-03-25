import { Product } from "@/types";
import { Link } from "react-router";

const Hero = ({ product }: { product: Product }) => {
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <Link to={`/products/${product.id}`}>
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-100/50 to-transparent lg:hidden" />
              <img
                src={`${import.meta.env.VITE_BASE_URL}/storage/${
                  product.images[0].path
                }`}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{product.title}</span>
                <span className="block text-cyan-500 text-2xl sm:text-3xl md:text-4xl mt-4 font-black">
                  Новые вкусы сезона
                </span>
              </h1>

              <div className="mt-8">
                <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] transition-all duration-300 md:py-4 md:text-lg md:px-10 rounded-md shadow cursor-pointer">
                  Попробовать
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Hero;
