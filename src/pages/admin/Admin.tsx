import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Home, Package, Settings, Users, BarChart } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";
import { createProduct, deleteProduct, updateProduct } from "@/api/api";
import { ProductEditor, ProductFormValues } from "./components/ProductEditor";
import ProductsTable from "./components/ProductsTable";
import { Link, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const Admin = () => {
  const { data: fetchedProducts, isLoading } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("products");

  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAdmin(user)) {
      navigate("/");
    }
  }, [isAdmin, user, navigate]);

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  // TODO: сделать категории таблицей в БД
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

  const handleSubmit = async (
    data: ProductFormValues & { imagesToDelete?: number[] }
  ) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("price_old", data.price_old || "");
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

    try {
      if (editingProduct) {
        const response = await updateProduct(
          editingProduct.id.toString(),
          formData
        );
        const updatedProduct = response["0"];
        setProducts((prevProducts) => {
          return prevProducts.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
        });
        setEditingProduct(updatedProduct);
      } else {
        const response = await createProduct(formData);
        const newProduct = response["0"];
        setProducts((prevProducts) => [newProduct, ...prevProducts]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error(
        `Ошибка при ${editingProduct ? "обновлении" : "создании"} продукта:`,
        error
      );
    }
    formData.delete("imagesToDelete");
    formData.delete("images");
    formData.delete("title");
    formData.delete("price");
    formData.delete("price_old");
    formData.delete("stock");
    formData.delete("description");
    formData.delete("category");
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-900 hover:text-cyan-600 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-semibold">На главную</span>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Панель управления
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
              activeTab === "products"
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Package className="h-5 w-5" />
            <span>Товары</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
              activeTab === "users"
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Users className="h-5 w-5" />
            <span>Пользователи</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
              activeTab === "analytics"
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <BarChart className="h-5 w-5" />
            <span>Аналитика</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
              activeTab === "settings"
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Настройки</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Управление товарами
            </h2>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(0,211,243,0.63)] transition-all duration-300 cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить товар
            </Button>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <ProductsTable
              products={products}
              handleDelete={handleDelete}
              handleOpenDialog={handleOpenDialog}
            />
          </div>
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
    </div>
  );
};

export default Admin;
