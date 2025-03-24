import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useEffect } from "react";

const productFormSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  price: z
    .string()
    .min(0, "Цена обязательна")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Цена должна быть положительной"
    ),
  stock: z
    .string()
    .min(0, "Количество обязательно")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Количество должно быть положительным"
    ),
  description: z.string().min(1, "Пожалуйста, добавьте описание"),
  category: z.string().min(1, "Пожалуйста, выберите категорию"),
  images: z
    .any()
    .refine((files) => Array.isArray(files) || files === undefined, {
      message: "Добавьте хотя бы одно изображение",
    })
    .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  editingProduct?: Product | null;
  categories: Category[];
}

export const ProductEditor = ({
  open,
  onOpenChange,
  onSubmit,
  editingProduct,
  categories,
}: ProductEditorProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      price: "",
      stock: "",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        title: editingProduct.title,
        price: editingProduct.price.toString(),
        stock: editingProduct.stock.toString(),
        description: editingProduct.description,
        category: editingProduct.category,
      });
    } else {
      form.reset({
        title: "",
        price: "",
        stock: "",
        description: "",
        category: "",
      });
    }
  }, [editingProduct, form]);

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Редактировать" : "Добавить товар"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Изображения</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        field.onChange(files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {Array.isArray(form.watch("images")) &&
              form.watch("images").length > 0 &&
              form
                .watch("images")
                .map((file: File, index: number) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md mr-2 mt-2"
                  />
                ))}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
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
  );
};
