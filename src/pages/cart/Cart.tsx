import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, X, ShoppingBag, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import useCartStore from "@/store/cartStore";
import { CartItem, LocalCartItem, OrderItem } from "@/types";
import { Link, useNavigate } from "react-router";
import { createOrder } from "@/api/api";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, addOne, removeOne, removeFromCart, getTotalPrice } =
    useCartStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const items = Array.isArray(cartItems) ? cartItems : [];
  let total = 0;
  if (items.length > 0) {
    total = getTotalPrice();
  }
  const deliveryCost = 0;

  const getItemDisplayData = (item: CartItem | LocalCartItem) => {
    if ("product" in item) {
      return {
        title: item.product.title,
        price: item.product.price,
        image: item.product.images[0]?.path || "",
      };
    }
    return {
      title: item.title,
      price: item.price,
      image: item.image,
    };
  };

  const getOrderItem = (item: CartItem | LocalCartItem): OrderItem => {
    return {
      product_id: item.product_id,
      quantity: item.quantity,
    };
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (items.length === 0) {
      return;
    }
    const orderItems = items.map(getOrderItem);
    setIsLoading(true);
    await createOrder(orderItems);
    setIsLoading(false);
  };

  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Корзина", path: "/cart" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 pb-20 pt-24 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Breadcrumbs items={breadcrumbItems} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">
              <span className="inline-block text-cyan-500 relative">
                Корзина
                <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
              </span>
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      Ваша корзина пуста
                    </h3>
                    <p className="text-gray-500 mb-8">
                      Добавьте товары, чтобы оформить заказ
                    </p>
                    <Link to="/products">
                      <Button size="lg" className="min-w-[200px]">
                        Перейти к товарам
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item, index) => {
                    const displayData = getItemDisplayData(item);
                    return (
                      <motion.div
                        key={item.product_id}
                        variants={itemVariants}
                        custom={index}
                        layout
                      >
                        <Link
                          to={`/products/${item.product_id}`}
                          className="block"
                        >
                          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-6 relative">
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeFromCart(item.product_id, user);
                                  }}
                                  className="absolute top-0 right-0 z-10"
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="flex-shrink-0">
                                  <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    <img
                                      src={`${
                                        import.meta.env.VITE_BASE_URL
                                      }/storage/${displayData.image}`}
                                      alt={displayData.title}
                                      className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0 pr-8">
                                  <h3 className="font-medium text-lg text-gray-900 group-hover:text-cyan-500 transition-colors">
                                    {displayData.title}
                                  </h3>
                                  <p className="text-gray-500 mt-1">
                                    {displayData.price} ₽
                                  </p>
                                  <div
                                    onClick={(e) => e.preventDefault()}
                                    className="flex items-center gap-3 mt-4"
                                  >
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300"
                                      disabled={item.quantity === 1}
                                      onClick={() =>
                                        removeOne(item.product_id, user)
                                      }
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center font-medium">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300"
                                      onClick={() =>
                                        addOne(item.product_id, user)
                                      }
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div>
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm sticky top-24">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold">
                        Сумма заказа
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            Товары ({items.length}):
                          </span>
                          <span>{total} ₽</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Доставка:</span>
                          <span>{deliveryCost} ₽</span>
                        </div>
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center text-lg font-medium">
                            <span>Итого:</span>
                            <span className="text-cyan-500">
                              {total + deliveryCost} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] transition-all duration-300 text-white mt-4"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Оформить заказ"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
