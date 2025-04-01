import { Product } from "@/types";
import { Link } from "react-router";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import useCartStore from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const ProductCard = ({
  product,
  label,
}: {
  product: Product;
  label?: string;
}) => {
  const { addToCart } = useCartStore();
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1, user);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative bg-white ">
        <Link
          to={`/products/${product.id}`}
          className="flex flex-col h-[610px] sm:h-[550px] xl:h-[610px] justify-between box-border"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            {product.images.length > 0 ? (
              <img
                src={product!.images[0].url}
                alt={product.title}
                className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-black/5 flex items-center justify-center">
                <span className="text-black/40">Нет изображения</span>
              </div>
            )}

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {label && (
                <Badge
                  className={
                    label === "Хит"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }
                >
                  {label}
                </Badge>
              )}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-none bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 border border-black/5"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-none bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 border border-black/5"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              {isAdded ? (
                <Check className="h-4 w-4" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="p-6 h-[60%] sm:h-[50%] xl:h-[60%] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <h3 className="font-space text-lg font-medium hover:text-black/80 transition-colors">
                {product.title}
              </h3>
              <div className="flex items-center">
                <div className="text-sm text-black">★</div>
                <div className="ml-1 text-xs leading-7 text-black/60">4.8</div>
              </div>
            </div>
            <p className="text-sm text-black/60 line-clamp-2 mt-2">
              {product.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`font-space text-lg ${
                  product.price_old ? "text-black" : "text-black"
                }`}
              >
                {product.price} ₽
              </span>
              {product.price_old && (
                <span className="line-through text-black/40">
                  {product.price_old} ₽
                </span>
              )}
            </div>

            <div className="mt-4 ">
              <span className="inline-block text-xs px-3 py-1 bg-black/5 text-black/60">
                {product.category.name}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.article>
  );
};

export default ProductCard;
