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
import { Product } from "@/types";
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
import { useEffect, useState } from "react";

// Валидация формы
const productFormSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  price: z
    .string()
    .nonempty("Укажите цену")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Цена должна быть положительной"
    ),
  price_old: z
    .string()
    .optional()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Цена должна быть положительной"
    ),
  stock: z
    .string()
    .nonempty("Укажите количество")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Количество должно быть положительным"
    ),
  description: z.string().min(1, "Пожалуйста, добавьте описание"),
  category: z.string().min(1, "Пожалуйста, выберите категорию"),
  images: z.any().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: ProductFormValues & { imagesToDelete?: number[] }
  ) => Promise<void>;
  editingProduct?: Product | null;
  categories: string[];
  onProductUpdate?: (product: Product) => void;
}

export const ProductEditor = ({
  open,
  onOpenChange,
  onSubmit,
  editingProduct,
  categories,
  onProductUpdate,
}: ProductEditorProps) => {
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [originalProduct, setOriginalProduct] = useState<Product | null>(null);

  // Инициалиируем форму с React Hook Form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      price: "",
      price_old: "",
      stock: "",
      description: "",
      category: "",
      images: [],
    },
  });

  // Сохраняем изначальное состояние продукта
  useEffect(() => {
    if (editingProduct) {
      setOriginalProduct(editingProduct);
      form.reset({
        title: editingProduct.title,
        price: editingProduct.price.toString(),
        price_old: editingProduct.price_old?.toString() || "",
        stock: editingProduct.stock.toString(),
        description: editingProduct.description,
        category: editingProduct.category,
        images: [],
      });
    } else {
      setOriginalProduct(null);
      form.reset({
        title: "",
        price: "",
        price_old: "",
        stock: "",
        description: "",
        category: "",
        images: [],
      });
    }
  }, [editingProduct, form]);

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
    setImagesToDelete([]);
    // Возвращаем продукт в изначальное состояние, если форма закрыта без сохранения
    if (originalProduct) {
      onProductUpdate?.(originalProduct);
    }
  };

  const getDisplayImages = () => {
    if (!originalProduct?.images) return [];
    return originalProduct.images.filter(
      (image) => !imagesToDelete.includes(image.id)
    );
  };

  // Проверяем, есть ли хотя бы одно изображение (существующее или новое)
  const hasAtLeastOneImage = () => {
    const existingImages = getDisplayImages();
    const newImages = form.watch("images") || [];
    console.log(existingImages, newImages);
    return existingImages.length > 0 || newImages.length > 0;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="mb-4">
            {editingProduct ? "Редактировать" : "Добавить товар"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  if (!hasAtLeastOneImage()) {
                    form.setError("images", {
                      type: "manual",
                      message: "Добавьте хотя бы одно изображение",
                    });
                    return;
                  }
                  onSubmit({ ...data, imagesToDelete });
                })}
                className="space-y-4 max-h-[36rem] overflow-y-scroll"
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price_old"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цена без скидки</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Цена без скидки"
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
                {/* Загрузка изображений */}
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
                            const newFiles = e.target.files
                              ? Array.from(e.target.files)
                              : [];
                            const currentFiles = field.value || [];
                            field.onChange([...currentFiles, ...newFiles]);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
          </div>
          {/* Превью изображений */}
          <div className="flex-11/12 lg:flex-2/5 flex flex-wrap items-start h-fit">
            {/* Изображения из базы данных */}
            {getDisplayImages().map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/storage/${image.path}`}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md mr-2 mt-2"
                />
                {/* Помечаем изображение для удаления */}
                <button
                  type="button"
                  onClick={() => {
                    setImagesToDelete((prev) => [...prev, image.id]);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            {/* Новые изображения */}
            {Array.isArray(form.watch("images")) &&
              form.watch("images").length > 0 &&
              form.watch("images").map((file: File, index: number) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md mr-2 mt-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // Удаляем загруженное изображение
                      const currentFiles = form.getValues("images") || [];
                      form.setValue(
                        "images",
                        currentFiles.filter((_: File, i: number) => i !== index)
                      );
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
