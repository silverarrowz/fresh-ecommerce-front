import { Link, useParams } from "react-router";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FiMinus, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { Star, Truck, Heart, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useCartStore from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading } = useProduct(id!);
  const { products } = useProducts();
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
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            <div className="aspect-square bg-gray-200 rounded-xl"></div>
            <div className="mt-10 lg:mt-0 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="container mx-auto px-4 pt-20 pb-12">
        <h1 className="text-2xl font-bold text-gray-900">Продукт не найден.</h1>
        <Link
          to="/products"
          className="text-cyan-600 hover:text-cyan-500 transition-colors duration-300 mt-6 flex items-center gap-2"
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
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/50">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/storage/${
                  product!.images[selectedImageIndex].path
                }`}
                alt={product!.title}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>

            {product!.images.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 flex items-center justify-center shadow-md hover:bg-background transition-colors cursor-pointer"
                  aria-label="Предыдущее изображение"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 flex items-center justify-center shadow-md hover:bg-background transition-colors cursor-pointer"
                  aria-label="Следующее изображение"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-primary text-primary-foreground">New</Badge>
              <Badge className="bg-destructive text-destructive-foreground">
                Sale
              </Badge>
            </div> */}
          </div>

          {product!.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 ">
              {product!.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden  cursor-pointer mt-2 ml-1 ${
                    selectedImageIndex === index
                      ? "ring-2 ring-primary"
                      : "ring-1 ring-muted"
                  }`}
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/storage/${
                      image.path
                    }`}
                    alt={`${product!.title} thumbnail ${index + 1}`}
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.8 (12 отзывов)
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {product!.title}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-semibold text-cyan-600">
                {product!.price} ₽
              </span>
              {product!.price_old && (
                <span className="line-through text-gray-500">
                  {product!.price_old} ₽
                </span>
              )}
            </div>

            <p className="text-muted-foreground">{product!.description}</p>
          </div>

          {/* Выбор количества и добавление в корзину */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center h-12 w-full sm:w-42">
              <button
                className="h-full px-4 border border-r-0 rounded-md hover:bg-muted/50 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <FiMinus className="h-4 w-4" />
              </button>
              <div className="h-full flex-1 flex items-center justify-center border-y">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="w-full text-center p-2 rounded-md bg-transparent border border-gray-300 focus:outline-none focus:border-gray-500 mx-2 min-w-12"
                />
              </div>
              <button
                className="h-full px-4 border border-l-0 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FiPlus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 flex gap-3">
              <button
                className="flex-1 h-12 p-0 text-white rounded-md bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(0,211,243,0.63)] transition-all duration-300 cursor-pointer flex items-center justify-center disabled:pointer-events-none disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={quantity < 1}
              >
                {isAdded ? <Check className="h-7 w-7" /> : "В корзину"}
              </button>
              <Button variant="outline" className="h-12 w-12 cursor-pointer">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-8">
            <Truck className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Бесплатная доставка</p>
              <p className="text-xs text-muted-foreground">
                Доставка по всей России в течение 3-5 рабочих дней
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Категория</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {product!.category}
            </p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Попробуйте также
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
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
