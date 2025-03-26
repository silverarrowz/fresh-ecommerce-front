import { Product } from "@/types";
import { Link } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const ProductCard = ({
  product,
  label,
}: {
  product: Product;
  label?: string;
}) => {
  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted/50">
          {product.images.length > 0 ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/storage/${
                product.images[0].path
              }`}
              alt={product.title}
              className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Нет изображения</span>
            </div>
          )}

          {/* Status badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {label && (
              <Badge
                className={
                  label === "Хит"
                    ? "bg-amber-500 text-white"
                    : "bg-cyan-500 text-white"
                }
              >
                {label}
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                // Add to favorites logic
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-base hover:text-cyan-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center">
              <div className="text-sm text-amber-500">★</div>
              <div className="ml-1 text-xs text-muted-foreground">4.8</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`font-semibold ${
                product.price_old
                  ? "text-cyan-600 font-bold "
                  : "font-semibold text-gray-900"
              }`}
            >
              {product.price} ₽
            </span>
            {product.price_old && (
              <span className="line-through text-gray-500">
                {product.price_old} ₽
              </span>
            )}
          </div>

          <div className="mt-3">
            <span className="inline-block text-xs px-2 py-1 bg-muted rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
