import { Link, useParams } from "react-router";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FiMinus, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

import ProductCard from "@/components/ProductCard";
import { Star, Truck, Heart, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useCartStore from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";
import { useProduct, useProducts } from "@/hooks/useProducts";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id!);
  const { data: products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { addToCart } = useCartStore();
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(false);

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product!.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product!.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = async () => {
    await addToCart(product!, quantity, user);
    setQuantity(1);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  const relatedProducts = products?.filter((p) => p.id !== Number(id)) || [];

  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Каталог", path: "/products" },
    { label: product?.title || "", path: `/products/${id}` },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse">
          <div className="h-4 bg-black/5 w-1/4 mb-8"></div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
            <div className="aspect-square bg-black/5"></div>
            <div className="mt-10 lg:mt-0 space-y-6">
              <div className="h-8 bg-black/5 w-3/4"></div>
              <div className="h-10 bg-black/5 w-1/4"></div>
              <div className="h-32 bg-black/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="container mx-auto px-4 pt-20 pb-12">
        <h1 className="text-2xl font-space font-medium text-black">
          Продукт не найден.
        </h1>
        <Link
          to="/products"
          className="text-black/60 hover:text-black transition-colors duration-300 mt-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden border border-black/5">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <img
                src={product!.images[selectedImageIndex].url}
                alt={product!.title}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>

            {product!.images.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 flex items-center justify-center border border-black/5 hover:bg-white transition-colors"
                  aria-label="Предыдущее изображение"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 flex items-center justify-center border border-black/5 hover:bg-white transition-colors"
                  aria-label="Следующее изображение"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {product!.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product!.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border cursor-pointer ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-black/5"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product!.title} thumbnail ${index + 1}`}
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-black text-black" />
                ))}
              </div>
              <span className="text-sm text-black/60">4.8 (12 отзывов)</span>
            </div>

            <h1 className="text-3xl font-space font-medium tracking-tight mb-4">
              {product!.title}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-space text-black">
                {product!.price} ₽
              </span>
              {product!.price_old && (
                <span className="line-through text-black/40">
                  {product!.price_old} ₽
                </span>
              )}
            </div>

            <p className="text-black/60">{product!.description}</p>
          </div>

          {/* Выбор количества и добавление в корзину */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center h-12 w-full sm:w-42">
              <button
                className="h-full px-4   transition-colors"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <FiMinus className="h-4 w-4" />
              </button>
              <div className="h-full flex-1 flex items-center justify-center ">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="w-full text-center p-2 bg-white  focus:outline-none  mx-2 min-w-12"
                />
              </div>
              <button
                className="h-full px-4   transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FiPlus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 flex gap-3">
              <button
                className="flex-1 h-12 p-0 text-white bg-black hover:bg-black/90 transition-all duration-300 flex items-center justify-center disabled:pointer-events-none disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={quantity < 1}
              >
                {isAdded ? <Check className="h-7 w-7" /> : "В корзину"}
              </button>
              <Button
                variant="outline"
                className="h-12 w-12 border-black/5 hover:bg-black/5 rounded-none"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-black/5 mb-8">
            <Truck className="h-5 w-5 text-black/60" />
            <div>
              <p className="text-sm font-medium text-black">
                Бесплатная доставка
              </p>
              <p className="text-xs text-black/60">
                Доставка по всей России в течение 3-5 рабочих дней
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-black">Категория</h3>
            <p className="mt-2 text-sm text-black/60">{product!.category}</p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-space font-medium text-black sm:text-4xl">
              Попробуйте также
            </h2>
            <p className="mt-4 text-lg text-black/60">
              Похожие товары, которые могут вас заинтересовать
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Product;
