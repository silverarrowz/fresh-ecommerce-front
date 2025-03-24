import { Link } from "react-router";
import { FiMapPin, FiPhone } from "react-icons/fi";

const TopBar = () => {
  return (
    <div
      className={`bg-gray-900 text-white transition-transform duration-300 relative z-55`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-8 text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FiPhone className="w-4 h-4" />
              <a href="tel:+79843252728">+7 (984) 325-27-28</a>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <FiMapPin className="w-4 h-4" />
              <span>Красноярск</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-cyan-400 transition-colors">
              Вход
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              to="/register"
              className="hover:text-cyan-400 transition-colors"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
