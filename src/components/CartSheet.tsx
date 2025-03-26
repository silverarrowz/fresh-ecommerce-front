import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Протеин Fresh Whey",
      price: 2999,
      quantity: 1,
      image: "/images/hero3.jpg",
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg z-250">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg font-normal text-center mx-auto pt-4">
            Корзина
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-muted-foreground">
            <p className="text-lg">Ваша корзина пуста</p>
            <p className="text-sm">Добавьте товары, чтобы оформить заказ</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-200px)] mt-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 ">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.price} ₽
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-cyan-200 hover:border-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
                          disabled={item.quantity === 1}
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-cyan-200 hover:border-none transition-all duration-300"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Итого:</span>
                <span className="text-xl font-bold">{total} ₽</span>
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
