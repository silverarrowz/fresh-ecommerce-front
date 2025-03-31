import { getOrderBySessionId } from "@/api/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { CheckCircle2, Home, User2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Order } from "@/types";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (sessionId) {
        try {
          const orderData = await getOrderBySessionId(sessionId);
          setOrder(orderData);
          console.log(orderData);
        } catch (error) {
          console.error("Error fetching order:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrder();
  }, [sessionId]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block mb-6"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Заказ успешно оформлен!</h1>
          <p className="text-gray-600">
            Спасибо за покупку. Мы отправим вам уведомление о статусе заказа.
          </p>
        </div>

        {order && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden mb-8">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Номер заказа</p>
                  <CardTitle className="text-xl">#{order.id}</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Дата заказа</p>
                  <p className="font-medium">
                    {format(new Date(order.created_at), "dd MMMM yyyy", {
                      locale: ru,
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <Link
                        key={item.product_id}
                        to={`/products/${item.product_id}`}
                        className="flex items-center gap-4 p-4 bg-gray-50/50 hover:bg-gray-100 transition-all duration-300 rounded-lg"
                      >
                        <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-14 w-14 object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{item.title}</h4>

                          <p className="text-sm font-light text-gray-500">
                            x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {Number(item.price) * item.quantity} ₽
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-medium">
                    <span>Итого:</span>
                    <span className="text-cyan-500">{order.total} ₽</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 hover:bg-gray-100"
            >
              <Home className="h-4 w-4" />
              На главную
            </Button>
          </Link>
          <Link to="/account">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] transition-all duration-300"
            >
              <User2 className="h-4 w-4" />
              Мои заказы
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessPage;
