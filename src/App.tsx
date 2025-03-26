import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Layout from "./components/Layout";
import Admin from "./pages/admin/Admin";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
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
