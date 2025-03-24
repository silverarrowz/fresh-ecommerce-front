import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Category, Product } from "@/types";
import { createProduct, deleteProduct, updateProduct } from "@/services/api";
import {
  ProductEditor,
  ProductFormValues,
} from "@/components/admin/ProductEditor";
import ProductsTable from "@/components/admin/ProductsTable";

const Admin = () => {
  const { products: fetchedProducts, isLoading } = useProducts();
  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const [products, setProducts] = useState<Product[]>(fetchedProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const handleOpenDialog = (product?: Product) => {
    setEditingProduct(product || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (editingProduct) {
      try {
        const updatedProduct = await updateProduct(
          editingProduct.id.toString(),
          {
            ...formData,
            category: formData.get("category") as Category,
          } as Partial<Product>
        );
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      } catch (error) {
        console.error("Ошибка при обновлении продукта:", error);
      }
    } else {
      try {
        await createProduct(formData as Partial<Product>);
        // setProducts([...products, newProduct]);
      } catch (error) {
        console.error("Ошибка при создании продукта:", error);
      }
    }
    handleCloseDialog();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id.toString());
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
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
          <ProductsTable
            products={products}
            handleDelete={handleDelete}
            handleOpenDialog={handleOpenDialog}
          />
        </div>

        <ProductEditor
          open={openDialog}
          onOpenChange={setOpenDialog}
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          categories={categories}
        />
      </div>
    </>
  );
};

export default Admin;
