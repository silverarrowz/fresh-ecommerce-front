import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export default function OutroSection() {
  return (
    <section className="w-full overflow-hidden mx-auto">
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />

        <div className="container relative px-4 mx-auto pt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                Создаем будущее спорта
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white">
                Fresh - ваш путь к <br />
                <span className="text-green-200">здоровому образу жизни</span>
              </h3>
              <p className="text-white/80 text-lg max-w-xl">
                Самый широкий на российском рынке ассортимент спортивного
                питания, как для профессиональных спортсменов, так и для
                сторонников здорового образа жизни.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 pb-4">
                <ButtonLink
                  to="#"
                  size="lg"
                  className="bg-white text-green-600 hover:bg-white/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Выбрать цель
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  to="/products"
                  size="lg"
                  variant="outline"
                  className="border-2 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300"
                >
                  Перейти в каталог
                </ButtonLink>
              </div>
            </div>
            <div className="relative h-[600px]">
              <div className="absolute -top-8 -right-8 w-[110%] h-[110%]">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 bg-gradient-to-l from-green-600/50 to-transparent md:rounded-2xl" />
                  <img
                    src="/images/hero3.jpg"
                    alt="Athletes using Fresh products"
                    className="w-full h-full object-cover md:rounded-2xl shadow-2xl"
                  />

                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/20 md:rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 md:rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
