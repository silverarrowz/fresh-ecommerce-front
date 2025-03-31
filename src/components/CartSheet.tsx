import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, X, ShoppingBag, Loader2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import useCartStore from "@/store/cartStore";
import { CartItem, LocalCartItem } from "@/types";
import { Link, useNavigate } from "react-router";
import { createOrder } from "@/api/api";
import { useState } from "react";

const CartSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const { cartItems, addOne, removeOne, removeFromCart, getTotalPrice } =
    useCartStore();
  const navigate = useNavigate();

  const items = Array.isArray(cartItems) ? cartItems : [];
  const [isLoading, setIsLoading] = useState(false);

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
        image: item.product.images[0]?.url || "",
      };
    }
    return {
      title: item.title,
      price: item.price,
      image: item.image?.url || "",
    };
  };

  const getOrderItem = (item: CartItem | LocalCartItem) => {
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
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} aria-labelledby="cart-sheet">
      <SheetContent
        className="w-full sm:max-w-lg z-250 flex flex-col border-none"
        aria-describedby="cart-sheet-description"
      >
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl font-medium text-center">
            <Link
              to="/cart"
              onClick={() => onOpenChange(false)}
              className="inline-block relative hover:text-cyan-500 transition-colors duration-300 mt-4"
            >
              Корзина
              <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/10 rounded-full" />
            </Link>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Ваша корзина пуста</h3>
            <p className="text-muted-foreground mb-6">
              Добавьте товары, чтобы оформить заказ
            </p>
            <Link to="/products" onClick={() => onOpenChange(false)}>
              <Button size="lg" className="w-full sm:w-auto">
                Перейти к товарам
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 py-4">
              <div className="space-y-4 px-1">
                {items.map((item) => {
                  const displayData = getItemDisplayData(item);
                  return (
                    <div
                      key={item.product_id}
                      className="flex items-start gap-4 p-4 bg-muted/5 rounded-lg relative group"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 text-black hover:text-black/80 hover:bg-black/5 transition-all duration-300"
                        onClick={() => removeFromCart(item.product_id, user)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Link
                        to={`/products/${item.product_id}`}
                        onClick={() => onOpenChange(false)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={displayData.image}
                          alt={displayData.title}
                          className="w-20 h-20 object-cover rounded-md hover:opacity-90 transition-opacity"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.product_id}`}
                          onClick={() => onOpenChange(false)}
                          className="block"
                        >
                          <h3 className="font-medium hover:text-primary transition-colors truncate">
                            {displayData.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {displayData.price} ₽
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            className="h-8 w-8  border-none shadow-none transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
                            disabled={item.quantity === 1}
                            onClick={() => removeOne(item.product_id, user)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="h-8 w-8  border-none shadow-none transition-all duration-300 flex items-center justify-center"
                            onClick={() => addOne(item.product_id, user)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="pt-6 pb-6 px-4 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Доставка:</span>
                <span>{deliveryCost} ₽</span>
              </div>
              <div className="flex justify-between items-center text-lg font-medium">
                <span>Итого:</span>
                <span>{total} ₽</span>
              </div>
              <Button onClick={handleCheckout} className="w-full" size="lg">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Оформить заказ"
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
