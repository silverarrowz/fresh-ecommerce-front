import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3), transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.3), transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3), transparent 50%)`,
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-green-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-8"
        >
          <Logo dark />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          Упс! Страница не найдена
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/" onClick={() => navigate(-1)}>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </Link>
          <Link to="/">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Home className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
      </div>
    </div>
  );
};

export default NotFound;
