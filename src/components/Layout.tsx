import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
