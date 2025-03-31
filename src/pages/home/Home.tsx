import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Hero from "@/pages/home/components/Hero";
import OutroSection from "./components/OutroSection";
import { ArrowRight, Check } from "lucide-react";
import { useLatestProducts, useProduct } from "@/hooks/useProducts";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { data: products, isLoading, error } = useLatestProducts();
  const { data: featuredProduct, isLoading: isFeaturedLoading } =
    useProduct("4");

  return (
    <div className="min-h-screen w-full">
      <Hero />
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="inline-block md:hidden text-3xl font-space font-medium text-black relative  w-fit mt-4 mb-10">
            Хит продаж
            <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/20 rounded-full" />
          </h2>

          <Link
            to="/products"
            className="text-black/60 hover:text-black transition-colors flex items-center gap-2"
          >
            Смотреть все
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {error || isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                : products!
                    .slice(0, 8)
                    .map((product) => (
                      <ProductCard
                        label="Хит"
                        key={product.id}
                        product={product}
                      />
                    ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-8 ">
              <h2 className="hidden md:inline-block text-3xl font-space font-medium text-black relative  w-fit mt-4 mb-10">
                Хит продаж
                <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/20 rounded-full" />
              </h2>

              <Link
                to={`/products/${featuredProduct?.id}`}
                className=" bg-white p-8 pt-0"
              >
                <div className="aspect-square mb-6 relative overflow-hidden rounded-lg">
                  {isFeaturedLoading ? (
                    <div className="w-full h-full bg-black/5 animate-pulse" />
                  ) : featuredProduct?.images[0] ? (
                    <img
                      src={featuredProduct.images[0].url}
                      alt={featuredProduct.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/5 flex items-center justify-center">
                      <span className="text-black/40">Нет изображения</span>
                    </div>
                  )}
                </div>
                <h3 className="font-space text-2xl mb-3">
                  {featuredProduct?.title}
                </h3>
                <p className="text-black/60 text-base mb-6 line-clamp-3">
                  {featuredProduct?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl">
                    {featuredProduct?.price} ₽
                  </span>
                  <Button variant="outline" size="lg" className="group">
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero3.jpg"
            alt="Lab testing of ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8"
            >
              Наша цель
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-space font-medium tracking-tight text-white mb-8"
            >
              Здоровый образ жизни, <br />
              <span className="text-white/80">доступный для всех</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 leading-relaxed mb-16"
            >
              С 2009 года мы помогаем людям достигать их целей в спорте и
              здоровье. Сегодня Fresh - это федеральная сеть из 20 магазинов с
              широким ассортиментом качественных продуктов от ведущих
              производителей.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Экспертная разработка",
                description:
                  "В сотрудничестве с ведущими учеными, спортсменами и диетологами проводим независимую экспертизу",
              },
              {
                title: "Лучшие производители",
                description:
                  "Представляем вам широкий выбор топовых брендов России, Европы и США",
              },
              {
                title: "Доступные цены",
                description:
                  "Предлагаем лучшие цены на качественные продукты, постоянно проводим акции",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className="h-12 w-12 flex items-center justify-center bg-white/10 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-space font-medium text-white text-xl mb-4">
                  {item.title}
                </h4>
                <p className="text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 w-full flex items-center gap-4"
          >
            <Link
              to="/products"
              className="px-8 py-4 bg-white text-black  hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] font-medium flex items-center gap-2"
            >
              Смотреть каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-space font-medium text-black relative">
            Успей купить по акции
            <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/20 rounded-full" />
          </h2>
          <Link
            to="/products"
            className="text-black/60 hover:text-black transition-colors flex items-center gap-2"
          >
            Смотреть все
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products!
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    label="Скидка 50%"
                    key={product.id}
                    product={product}
                  />
                ))}
        </div>
      </section>
      <OutroSection />
    </div>
  );
};

export default Home;
