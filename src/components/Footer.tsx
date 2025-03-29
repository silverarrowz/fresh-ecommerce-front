import { Link } from "react-router";
import Logo from "./Logo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "Все товары", path: "/products" },
      { name: "Новинки", path: "#" },
      { name: "Хит продаж", path: "#" },
      { name: "Акции", path: "#" },
    ],
    company: [
      { name: "О нас", path: "#" },
      { name: "Контакты", path: "#" },
      { name: "Вакансии", path: "#" },
    ],
    support: [
      { name: "FAQ", path: "#" },
      { name: "Доставка", path: "#" },
      { name: "Возвраты", path: "#" },
      { name: "Политика конфиденциальности", path: "#" },
    ],
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo dark />
            <p className="text-gray-300 text-sm">
              Всё, что нужно для спорта, и больше
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 font-light hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 font-light hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              Подпишитесь на нас
            </h3>
            <p className="text-slate-400 text-sm">
              Подпишитесь и получайте бонусы, специальные предложения и
              рекомендации по тренировкам.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Ваш E-mail"
                  className="rounded-r-none bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  className="rounded-l-none hover:bg-cyan-300 transition-colors duration-300 cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Подписываясь, вы соглашаетесь с нашей{" "}
                <Link to="#" className="underline hover:text-slate-400">
                  Политикой конфиденциальности
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Fresh. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-cyan-300 text-sm"
              >
                Политика конфиденциальности
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-cyan-300 text-sm"
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
