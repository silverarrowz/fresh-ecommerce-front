import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export function Banner() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  const slides = [
    {
      image: "/images/hero1.png",
      title: "Энергия для ваших достижений",
      subtitle: "Спортивное питание для максимальной производительности",
      button: "Смотреть каталог",
      link: "/products",
    },
    {
      image: "/images/hero2.webp",
      title: "Протеин премиум-класса",
      subtitle: "Только высококачественный сывороточный и растительный протеин",
      button: "Подробнее",
      link: "/products",
    },
    {
      image: "/images/hero3.jpg",
      title: "Натуральный состав и научный подход",
      subtitle:
        "Все наши продукты проходят строгий контроль качества и эффективности",
      button: "Узнать больше",
      link: "/products",
    },
  ];

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full h-96 max-h-[500px] z-10"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full min-h-[600px]">
                <Link to={slide.link}>
                  <div className="absolute inset-0 ">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                  </div>

                  <div className="relative h-full min-h-[37.5rem] flex items-center justify-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-[360px] sm:max-w-[28.75rem] md:max-w-[34rem] mx-auto mlg:max-w-[40rem] lg:max-w-[46rem] xl:max-w-none xl:pl-24 text-center sm:text-left transition-all duration-300">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-300">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 transition-all duration-300">
                          {slide.subtitle}
                        </p>

                        <Button
                          size="lg"
                          className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] transition-all duration-300 text-lg px-8 py-6 cursor-pointer"
                        >
                          {slide.button}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button
        onClick={() => scrollToIndex(currentIndex - 1)}
        className="pointer-events-auto rounded-full w-24 h-24 sm:w-32 sm:h-32 p-0 bg-transparent shadow-none hover:bg-transparent absolute -left-6 sm:left-0 top-1/2 -translate-y-1/2 z-100 cursor-pointer"
      >
        <ChevronLeft className="size-14 sm:size-18" strokeWidth={0.5} />
      </Button>
      <Button
        onClick={() => scrollToIndex(currentIndex + 1)}
        className="pointer-events-auto rounded-full w-24 h-24 sm:w-32 sm:h-32 p-0 bg-transparent shadow-none hover:bg-transparent absolute -right-6 sm:right-0 top-1/2 -translate-y-1/2 z-100 cursor-pointer"
      >
        <ChevronRight className="size-14 sm:size-18" strokeWidth={0.5} />
      </Button>
    </div>
  );
}
