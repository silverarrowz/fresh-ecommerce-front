import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import TopBar from "./TopBar";
import Logo from "./Logo";
import HeaderNav from "@/components/HeaderNav";
import { getProducts } from "@/api/api";

const Header = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    {
      id: 0,
      label: "Весь каталог",
      path: "/products",

      links: [
        {
          id: 0,
          label: "Спортивное питание",
          path: "#",
        },
        {
          id: 1,
          label: "Витамины и БАДы",
          path: "#",
        },
        {
          id: 2,
          label: "Подарочные карты",
          path: "#",
        },
        {
          id: 3,
          label: "Акции",
          path: "#",
        },
      ],
    },
    {
      id: 1,
      label: "Категории",
      path: "/",

      links: [
        {
          id: 0,
          label: "Протеины",
          path: "#",
        },
        {
          id: 1,
          label: "Протеиновые батончики и печенье",
          path: "#",
        },
        {
          id: 2,
          label: "Готовые завтраки",
          path: "#",
        },
        {
          id: 3,
          label: "Изотоники",
          path: "#",
        },
        {
          id: 4,
          label: "Витамины и БАДы",
          path: "#",
        },
        {
          id: 5,
          label: "Креатин",
          path: "#",
        },
      ],
    },
    {
      id: 2,
      label: "Бренды",
      path: "/",

      links: [
        {
          id: 0,
          label: "Fresh",
          path: "#",
        },
        {
          id: 1,
          label: "Kultlab",
          path: "#",
        },
        {
          id: 2,
          label: "Chikabar",
          path: "#",
        },
        {
          id: 3,
          label: "BoomBar",
          path: "#",
        },
      ],
    },
    {
      id: 3,
      label: "Акции",
      path: "/",
    },
    {
      id: 4,
      label: "Цели",
      path: "/",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      console.log(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLastScrollY(0);
    setShowTopBar(true);
  }, [location]);

  useEffect(() => {
    const handleCloseMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleCloseMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseMenu);
    };
  }, [isMenuOpen]);

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
    <header className="bg-green-100 shadow-sm fixed w-full top-0 z-50">
      <div
        className={`transition-all duration-400 ${
          showTopBar ? " max-h-20" : " max-h-0 overflow-hidden"
        }`}
      >
        <TopBar />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 bg-green-100">
          <Logo />
          <HeaderNav navLinks={navLinks} />
          <article className="flex items-center space-x-4">
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
              ref={buttonRef}
              className="lg:hidden p-2 text-gray-700 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-7 h-7" />
              )}
            </button>
          </article>
        </div>

        {isMenuOpen && (
          <div ref={menuRef} className="lg:hidden">
            <div className="px-2 py-16 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className="block px-3 py-2 text-2xl text-gray-700 hover:text-cyan-500 hover:bg-green-200 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
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
