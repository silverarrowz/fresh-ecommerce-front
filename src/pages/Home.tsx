import { Link } from "react-router";
import { products } from "../data/products";

const Home = () => {
  const heroProduct = products[2];
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <article className="max-w-7xl mx-auto relative overflow-hidden">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{heroProduct.title}</span>
                <span className="block text-cyan-500">Новый вкус</span>
              </h1>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <Link
                  to={`/products/${heroProduct.id}`}
                  className="w-fit flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] transition-all duration-300 md:py-4 md:text-lg md:px-10 rounded-md shadow"
                >
                  Попробовать
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="max-w-2xl mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Хит продаж
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price} руб.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
