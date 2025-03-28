import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Order } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";
import { fetchUserOrders } from "@/api/api";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";

const Account = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchUserOrders();
        setOrders(data.orders);
        console.log(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Мой аккаунт", path: "/account" },
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
        stiffness: 100,
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
      <div className="container mx-auto px-4 sm:px-6 pb-20 pt-12 max-w-7xl">
        <div className="grid gap-8 lg:gap-12   lg:grid-cols-[350px_1fr]">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:sticky lg:top-24 lg:self-start pt-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <Breadcrumbs items={breadcrumbItems} />
            </motion.div>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">
                  <span className="inline-block text-cyan-500 relative">
                    Профиль
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    value={user?.email}
                    readOnly
                    className="bg-gray-50/50 border-gray-200 focus:ring-cyan-500/20 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Имя
                  </label>
                  <Input
                    value={user?.name}
                    readOnly
                    className="bg-gray-50/50 border-gray-200 focus:ring-cyan-500/20 transition-all duration-200"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="flex items-center justify-between mt-20">
              <h2 className="text-2xl font-bold">
                <span className="inline-block text-cyan-500 relative">
                  История заказов
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
                </span>
              </h2>
            </div>

            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-12"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                          <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-4">
                            <div className="flex justify-between items-center">
                              <div className="space-y-1.5">
                                <p className="text-sm font-medium text-gray-900">
                                  {format(
                                    new Date(order.created_at),
                                    "dd MMMM yyyy",
                                    {
                                      locale: ru,
                                    }
                                  )}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ID: {order.id}
                                </p>
                              </div>
                              <p className="text-lg font-semibold text-cyan-500">
                                {order.total} ₽
                              </p>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <Link
                                  to={`/products/${item.product_id}`}
                                  key={item.product_id}
                                  className="flex items-center justify-between py-2 hover:bg-gray-100 rounded-lg px-3 -mx-3 transition-colors duration-200"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                      {item.image ? (
                                        <img
                                          src={`${
                                            import.meta.env.VITE_BASE_URL
                                          }/storage/${item.image}`}
                                          alt={item.title}
                                          className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
                                        />
                                      ) : (
                                        <div className="h-14 w-14 bg-gray-200 rounded animate-pulse" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900 hover:text-cyan-500 transition-colors duration-200">
                                        {item.title}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Количество: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="font-medium text-gray-900">
                                    {Number(item.price) * item.quantity} ₽
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-gray-500 text-center py-12"
                    >
                      У вас пока нет заказов
                    </motion.p>
                  )}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
