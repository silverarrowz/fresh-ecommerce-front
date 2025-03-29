import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Hero from "@/pages/home/components/Hero";
import OutroSection from "./components/OutroSection";
import { ArrowRight, Check } from "lucide-react";
import { useLatestProducts } from "@/hooks/useProducts";

const Home = () => {
  const { data: products, isLoading, error } = useLatestProducts();

  return (
    <div className="min-h-screen w-full">
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">
          <span className="inline-block relative">
            Хит продаж
            <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {error || isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products!
                .slice(0, 4)
                .map((product) => (
                  <ProductCard label="Хит" key={product.id} product={product} />
                ))}
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero3.jpg"
            alt="Lab testing of ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
              Наша цель
            </div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Здоровый образ жизни <br />
              <span className="text-green-400">доступный для всех</span>
            </h3>
            <p className="text-lg text-white/80 leading-relaxed mb-12">
              С 2009 года мы помогаем людям достигать их целей в спорте и
              здоровье. Сегодня Fresh - это федеральная сеть из 20 магазинов с
              широким ассортиментом качественных продуктов от ведущих
              производителей.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-500/20 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-white text-xl mb-2">
                Экспертная разработка
              </h4>
              <p className="text-white/70">
                В сотрудничестве с ведущими учеными, спортсменами и диетологами
                проводим независимую экспертизу
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-500/20 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-white text-xl mb-2">
                Лучшие производители
              </h4>
              <p className="text-white/70">
                Представляем вам широкий выбор топовых брендов России, Европы и
                США
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-500/20 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-white text-xl mb-2">
                Доступные цены
              </h4>
              <p className="text-white/70">
                Предлагаем лучшие цены на качественные продукты, постоянно
                проводим акции
              </p>
            </div>
          </div>

          <div className="mt-16 w-full flex items-center gap-4">
            <button className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-400 hover:shadow-[0_0_18px_rgba(34,197,94,0.8)] transition-all duration-300 text-white font-medium flex items-center gap-2">
              Смотреть каталог
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">
          <span className="inline-block relative">
            Успей купить по акции
            <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
