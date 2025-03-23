import { Link } from "react-router";
import { FiMail, FiSend } from "react-icons/fi";
import Logo from "./Logo";

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
    <footer className="bg-gray-900 text-white">
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

          <div>
            <h3 className="text-lg font-semibold mb-4">Подпишитесь на нас</h3>
            <p className="text-gray-300 font-light text-sm mb-4">
              Узнавайте первыми о новых поступлениях и специальных предложениях
            </p>
            <form className="flex gap-2">
              <div className="relative flex-1">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-400 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] transition-all duration-300 cursor-pointer">
                <FiSend className="w-5 h-5" />
              </button>
            </form>
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
