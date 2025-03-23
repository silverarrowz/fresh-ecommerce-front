import { Link } from "react-router";

const Logo = ({ dark }: { dark?: boolean }) => {
  return (
    <Link
      to="/"
      className={`text-2xl font-bold flex gap-2 items-center ${
        dark ? "text-white" : "text-cyan-500"
      }`}
    >
      <img src="/images/logo.png" alt="logo" className="w-10 h-10 font-serif" />
      Fresh
    </Link>
  );
};

export default Logo;
