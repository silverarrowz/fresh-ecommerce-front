import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePrefetchFeaturedProduct, useProduct } from "@/hooks/useProducts";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";

export default function Hero() {
  const { data: featuredProduct, isLoading } = useProduct("4");
  const prefetchFeaturedProduct = usePrefetchFeaturedProduct();

  useEffect(() => {
    prefetchFeaturedProduct();
  }, [prefetchFeaturedProduct]);

  const fadeInUpDelay = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.8 },
  };

  return (
    <motion.section className="pt-32 sm:pt-16 lg:pt-32 relative overflow-hidden bg-white min-h-[90vh] flex flex-col justify-center">
      <div className="container relative z-10 px-4 mx-auto grid gap-12 md:grid-cols-2 items-center">
        <motion.div {...fadeInUpDelay} className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <h2 className="text-sm md:text-base uppercase tracking-widest text-gray-500 font-medium">
              Новая коллекция
            </h2>
            <h1
              className="font-bold tracking-tight leading-8 sm:leading-14 xl:leading-16
            text-[clamp(2rem,7vw,7rem)] 
            "
            >
              <span className="block mt-1">Энергия</span>
              <span className="block mt-1 text-cyan-500">
                для ваших достижений
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl font-light text-zinc-400 max-w-md">
            Спортивное питание для максимальной производительности
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink
              to="/products"
              size="lg"
              className="group hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)]"
            >
              Смотреть каталог
              <ArrowRight className="hidden md:block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink
              to="/products"
              size="lg"
              variant="link"
              className="bg-transparent hover:bg-cyan-100 hover:text-gray-900 transition-all duration-300"
            >
              Подробнее
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative max-w-[500px] mx-auto">
            <Link
              to={`/products/${featuredProduct?.id}`}
              className="flex items-center justify-center"
            >
              <motion.div className="relative w-[80%] h-0 pb-[100%] overflow-hidden">
                {isLoading ? (
                  <div className="w-full h-full animate-pulse" />
                ) : featuredProduct?.images[0] ? (
                  <img
                    src={featuredProduct.images[0].url}
                    alt={featuredProduct.title}
                    className="object-cover object-center w-full h-full absolute inset-0"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Нет изображения</span>
                  </div>
                )}
              </motion.div>
            </Link>

            <motion.a
              href={`/products/${featuredProduct?.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-12 md:-bottom-4 right-0 bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 max-w-[80%] transition-colors"
            >
              <div className="flex flex-col gap-1 justify-between items-start mb-2">
                <p className="font-bold text-2xl xl:text-3xl">
                  {featuredProduct?.price} ₽
                </p>
                <h3 className="font-medium text-sm sm:text-base md:text-lg">
                  {featuredProduct?.title}
                </h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                {featuredProduct?.description}
              </p>
              <div className="text-sm font-medium flex items-center hover:text-cyan-400 transition-colors duration-500">
                Подробнее <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
