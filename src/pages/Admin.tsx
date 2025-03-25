import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";
import { createProduct, deleteProduct, updateProduct } from "@/api/api";
import {
  ProductEditor,
  ProductFormValues,
} from "@/components/admin/ProductEditor";
import ProductsTable from "@/components/admin/ProductsTable";

const Admin = () => {
  const { products: fetchedProducts, isLoading } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
    }
  }, [fetchedProducts]);

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

  // Отправляем данные на сервер для создания или обновления продукта

  const handleSubmit = async (
    data: ProductFormValues & { imagesToDelete?: number[] }
  ) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file) => {
        formData.append("images[]", file);
      });
    }

    if (data.imagesToDelete && Array.isArray(data.imagesToDelete)) {
      formData.append("imagesToDelete", JSON.stringify(data.imagesToDelete));
    }

    // Обновляем продукт

    try {
      if (editingProduct) {
        const response = await updateProduct(
          editingProduct.id.toString(),
          formData
        );

        // Обновляем данные о продукте в списке
        const updatedProduct = response["0"];
        setProducts((prevProducts) => {
          const newProducts = prevProducts.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );

          return newProducts;
        });

        setEditingProduct(updatedProduct);
      } else {
        // Создаем новый продукт

        const response = await createProduct(formData);
        const newProduct = response["0"];
        console.log(response);

        // Добавляем новый продукт в список продуктов
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts, newProduct];
          return newProducts;
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error(
        `Ошибка при ${editingProduct ? "обновлении" : "создании"} продукта:`,
        error
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id.toString());
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <h1 className="text-xl mb-8">Панель управления</h1>
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
          onProductUpdate={(updatedProduct) => {
            setProducts((prevProducts) =>
              prevProducts.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            );
            setEditingProduct(updatedProduct);
          }}
        />
      </div>
    </>
  );
};

export default Admin;
