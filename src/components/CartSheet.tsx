import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useCartStore from "@/store/cartStore";
import { CartItem, LocalCartItem } from "@/types";
import { Link } from "react-router";

const CartSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const {
    fetchCart,
    cartItems,
    addOne,
    removeOne,
    removeFromCart,
    getTotalPrice,
  } = useCartStore();

  // Ensure items is always an array
  const items = Array.isArray(cartItems) ? cartItems : [];

  useEffect(() => {
    if (open) {
      fetchCart(user);
    }
  }, [user, open, fetchCart]);

  let total = 0;
  if (items.length > 0) {
    total = getTotalPrice();
  }
  const deliveryCost = 0;

  // Helper function to get item display data
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange} aria-labelledby="cart-sheet">
      <SheetContent
        className="w-full sm:max-w-lg z-250 flex flex-col"
        aria-describedby="cart-sheet-description"
      >
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-medium text-center">
            Корзина
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
                          src={`${import.meta.env.VITE_BASE_URL}/storage/${
                            displayData.image
                          }`}
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
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                            disabled={item.quantity === 1}
                            onClick={() => removeOne(item.product_id, user)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                            onClick={() => addOne(item.product_id, user)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="border-t pt-6 pb-6 px-4 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Доставка:</span>
                <span>{deliveryCost} ₽</span>
              </div>
              <div className="flex justify-between items-center text-lg font-medium">
                <span>Итого:</span>
                <span>{total} ₽</span>
              </div>
              <Button className="w-full" size="lg">
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
