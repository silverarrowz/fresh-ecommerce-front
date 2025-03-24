import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/hooks/useProducts";
import { Category, Product } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createProduct, updateProduct } from "@/services/api";

const productFormSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  price: z.number().min(0, "Цена должна быть положительной"),
  stock: z.number().min(0, "Количество должно быть положительным"),
  description: z.string().min(1, "Пожалуйста, добавьте описание"),
  category: z.string().min(1, "Пожалуйста, выберите категорию"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const Admin = () => {
  const { products: fetchedProducts, isLoading } = useProducts();
  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const [products, setProducts] = useState<Product[]>(fetchedProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      price: 0,
      stock: 0,
      description: "",
      category: "",
    },
  });

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.reset({
        title: product.title,
        price: product.price,
        stock: product.stock,
        description: product.description,
        category: product.category,
      });
    } else {
      setEditingProduct(null);
      form.reset({
        title: "",
        price: 0,
        stock: 0,
        description: "",
        category: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    form.reset();
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (editingProduct) {
      // Редактирование продукта
      try {
        const updatedProduct = await updateProduct(
          editingProduct.id.toString(),
          {
            ...data,
            category: data.category as Category,
          } as Partial<Product>
        );
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      } catch (error) {
        console.error("Ошибка при обновлении продукта:", error);
      }
    } else {
      // Создание нового продукта
      const newProduct: Product = {
        id: products.length + 1,
        title: data.title,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category as Category,
        image: "/placeholder.jpg",
      };
      try {
        await createProduct(newProduct);
        setProducts([...products, newProduct]);
      } catch (error) {
        console.error("Ошибка при создании продукта:", error);
      }
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <h1>Панель управления</h1>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Товары</h2>
          <Button
            onClick={() => handleOpenDialog()}
            className="cursor-pointer hover:bg-cyan-500 transition-colors duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Добавить товар
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="text-right">Цена (в руб.)</TableHead>
                <TableHead className="text-right">В наличии</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-center">{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(product)}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                      className="text-destructive cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Редактировать" : "Добавить товар"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input placeholder="Название товара" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цена</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Цена"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>В наличии</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Количество"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea
                          className="max-h-[25rem] min-h-[8rem]"
                          placeholder="Описание товара"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категория</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="" disabled>
                            Выберите категорию
                          </option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                    className="cursor-pointer"
                  >
                    Отменить
                  </Button>
                  <Button type="submit" className="cursor-pointer">
                    {editingProduct ? "Сохранить" : "Добавить"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Admin;
