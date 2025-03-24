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

const Admin = () => {
  const { products: fetchedProducts, isLoading } = useProducts();
  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const [products, setProducts] = useState<Product[]>(fetchedProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    stock: 0,
    description: "",
    category: "" as Category,
  });

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const handleOpenDialog = (product?: Product) => {
    console.log(product);
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        stock: product.stock,
        description: product.description,
        category: product.category,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        price: 0,
        stock: 0,
        description: "",
        category: "" as Category,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({
      title: "",
      price: 0,
      stock: 0,
      description: "",
      category: "" as Category,
    });
  };

  const handleSubmit = () => {
    if (editingProduct) {
      // Редактирование продукта
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: formData.title,
                price: Number(formData.price),
                stock: Number(formData.stock),
                description: formData.description,
                category: formData.category,
              }
            : p
        )
      );
    } else {
      // Создание нового продукта
      const newProduct: Product = {
        id: products.length + 1,
        title: formData.title,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        category: formData.category,
        image: "/placeholder.jpg",
      };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
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

        {/* Редактор */}

        <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Редактировать" : "Добавить товар"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Название"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  type="number"
                  value={formData.price}
                  min={0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  placeholder="Цена"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  type="number"
                  value={formData.stock}
                  min={0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  placeholder="В наличии"
                />
              </div>
              <div className="grid gap-2">
                <Textarea
                  className="max-h-[25rem] min-h-[8rem]"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Описание"
                />
              </div>
              <div className="grid gap-2">
                <select
                  value={formData.category || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as Category,
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="" disabled>
                    Категория
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                className="cursor-pointer"
              >
                Отменить
              </Button>
              <Button onClick={handleSubmit} className="cursor-pointer">
                {editingProduct ? "Сохранить" : "Добавить"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Admin;
