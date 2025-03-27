import { Link } from "react-router";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

const TopBar = () => {
  const { user, logout } = useAuth();
  return (
    <div
      className={`bg-gray-900 text-white transition-transform duration-300 relative z-85`}
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

          <div className="flex items-center space-x-4 z-90 relative">
            {user ? (
              <div className="flex gap-4">
                <Link
                  to="/auth"
                  className=" hover:text-cyan-400 transition-colors "
                >
                  Мой аккаунт
                </Link>
                <button
                  className="cursor-pointer text-gray-300 hover:text-cyan-400 transition-colors "
                  onClick={logout}
                >
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/auth"
                  className="hover:text-cyan-400 transition-colors "
                >
                  Вход
                </Link>

                <Link
                  to="/auth"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
