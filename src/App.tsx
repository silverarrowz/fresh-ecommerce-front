import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import Layout from "./components/Layout";
import Admin from "./pages/admin/Admin";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/auth/AuthPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
