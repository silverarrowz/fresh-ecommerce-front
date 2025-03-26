import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./Footer";

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
