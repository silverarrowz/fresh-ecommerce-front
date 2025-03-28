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
import Account from "./pages/account/Account";
import Cart from "./pages/cart/Cart";
import SuccessPage from "./pages/success/SuccessPage";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="account" element={<Account />} />
          <Route path="cart" element={<Cart />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>
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
