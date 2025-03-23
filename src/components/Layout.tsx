import { Outlet } from "react-router";
import Header from "./ui/Header";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
