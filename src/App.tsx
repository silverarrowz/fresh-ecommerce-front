import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import AdminLayout from "./components/admin/AdminLayout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
