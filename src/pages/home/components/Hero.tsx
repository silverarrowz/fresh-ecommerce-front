import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrefetchFeaturedProduct, useProduct } from "@/hooks/useProducts";
import { useEffect } from "react";

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
    <section className="mt-20 md:mt-0 relative overflow-hidden bg-white min-h-[90vh] flex flex-col justify-center">
      <div className="container relative z-10 px-4 mx-auto grid gap-12 md:grid-cols-2 items-center">
        <motion.div {...fadeInUpDelay} className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <h2 className="text-sm md:text-base uppercase tracking-widest text-gray-500 font-medium">
              Новая коллекция
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.9] md:leading-[0.9]">
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
            <Button
              size="lg"
              className="group hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)]"
            >
              Смотреть каталог
              <ArrowRight className="hidden md:block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="link"
              className="bg-transparent hover:bg-cyan-100 hover:text-gray-900 transition-all duration-300"
            >
              Подробнее
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative aspect-square max-w-[500px] mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[80%] h-[80%]">
                {isLoading ? (
                  <div className="w-full h-full animate-pulse" />
                ) : featuredProduct?.images[0] ? (
                  <img
                    src={featuredProduct.images[0].url}
                    alt={featuredProduct.title}
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Нет изображения</span>
                  </div>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-12 md:-bottom-4 right-0 bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 max-w-[80%] transition-colors"
            >
              <Link to={`/products/${featuredProduct?.id}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">
                    {featuredProduct?.title}
                  </h3>
                  <span className="font-bold xl:text-3xl">
                    {featuredProduct?.price} ₽
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                  {featuredProduct?.description}
                </p>
                <div className="text-sm font-medium flex items-center transition-colors">
                  Подробнее <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
