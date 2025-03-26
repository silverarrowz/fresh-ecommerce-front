import { Outlet } from "react-router";
import Footer from "@/components/Footer";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <main className="pt-16 container mx-auto py-8 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
