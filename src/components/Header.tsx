import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import TopBar from "./TopBar";
import DropdownNav from "./DropdownNav";

const Header = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Весь каталог",
      path: "/products",

      links: [
        {
          label: "Спортивное питание",
          path: "#",
        },
        {
          label: "Витамины и БАДы",
          path: "#",
        },
        {
          label: "Подарочные карты",
          path: "#",
        },
        {
          label: "Акции",
          path: "#",
        },
      ],
    },
    {
      name: "Категории",
      path: "/",

      links: [
        {
          label: "Протеины",
          path: "#",
        },
        {
          label: "Протеиновые батончики и печенье",
          path: "#",
        },
        {
          label: "Готовые завтраки",
          path: "#",
        },
        {
          label: "Изотоники",
          path: "#",
        },
        {
          label: "Витамины и БАДы",
          path: "#",
        },
        {
          label: "Креатин",
          path: "#",
        },
      ],
    },
    {
      name: "Бренды",
      path: "/",

      links: [
        {
          label: "Fresh",
          path: "#",
        },
        {
          label: "Kultlab",
          path: "#",
        },
        {
          label: "Chikabar",
          path: "#",
        },
        {
          label: "BoomBar",
          path: "#",
        },
      ],
    },
    { name: "Акции", path: "/" },
    { name: "Цели", path: "/" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div
        className={`transition-all duration-400 ${
          showTopBar ? " max-h-20" : " max-h-0 overflow-hidden"
        }`}
      >
        <TopBar />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 bg-white">
          <Link
            to="/"
            className="text-2xl font-bold text-cyan-500 flex gap-2 items-center"
          >
            <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
            Fresh
          </Link>

          <nav className="hidden lg:flex h-full items-center mx-auto">
            {navLinks.map((link) => (
              <Link
                className="group h-full flex items-center"
                key={link.name}
                to={link.path}
              >
                <h4 className="text-gray-700 hover:text-cyan-500 transition-colors duration-300 text-lg pr-8 ">
                  {link.name}
                </h4>
                {link.links && <DropdownNav links={link.links} />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 cursor-pointer">
              <FiSearch className="w-6 h-6" />
            </button>
            <Link to="#" className="p-2 text-gray-700 relative">
              <FiHeart className="w-6 h-6" />
              <span className="absolute right-0 -bottom-[1px] z-10 h-[15px] min-w-[15px] px-[3px] text-white text-[9px] leading-[15px] text-center bg-[#ce181f] rounded-[8px]">
                0
              </span>
            </Link>
            <Link to="#" className="p-2 text-gray-700 relative">
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute right-0 -bottom-[1px] z-10 h-[15px] min-w-[15px] px-[3px] text-white text-[9px] leading-[15px] text-center bg-[#ce181f] rounded-[8px]">
                0
              </span>
            </Link>

            <button
              className="md:hidden p-2 text-gray-700 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
