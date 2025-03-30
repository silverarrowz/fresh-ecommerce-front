import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { FiHeart, FiShoppingCart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import TopBar from "./TopBar";
import Logo from "@/components/Logo";
import HeaderNav from "./HeaderNav";
import CartSheet from "@/components/CartSheet";
import useCartStore from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const location = useLocation();
  const { user } = useAuth();
  const { cartItems, fetchCart } = useCartStore();

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

  let cartItemsCount = 0;

  if (cartItems && cartItems.length > 0) {
    cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  useEffect(() => {
    fetchCart(user);
  }, [user, fetchCart]);

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
    <header className="bg-white fixed w-full top-0 z-150">
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <TopBar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20 bg-white ">
          <Logo />
          <HeaderNav navLinks={navLinks} />
          <article className="flex items-center space-x-6">
            <button className="p-2 text-black/60 hover:text-black transition-colors">
              <FiSearch className="w-5 h-5" />
            </button>
            <Link
              to="#"
              className="p-2 text-black/60 hover:text-black transition-colors relative"
            >
              <FiHeart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] leading-4 text-white text-center bg-black rounded-sm">
                0
              </span>
            </Link>
            <button
              className="p-2 text-black/60 hover:text-black transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] leading-4 text-white text-center bg-black rounded-sm">
                {cartItemsCount}
              </span>
            </button>

            <button
              ref={buttonRef}
              className="lg:hidden p-2 text-black/60 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </article>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-b border-black/5"
            >
              <div className="px-4 py-8 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    className="block px-4 py-3 text-lg text-black/60 hover:text-black hover:bg-cyan-400/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
};

export default Header;
