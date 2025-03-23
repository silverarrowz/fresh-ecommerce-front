import { Link } from "react-router";
import DropdownNav from "./DropdownNav";

interface HeaderNavProps {
  navLinks: {
    id: number;
    label: string;
    path: string;
    links?: {
      id: number;
      label: string;
      path: string;
    }[];
  }[];
}

const HeaderNav = ({ navLinks }: HeaderNavProps) => {
  return (
    <nav className="hidden lg:flex h-full items-center mx-auto">
      {navLinks.map((link) => (
        <Link
          className="group h-full flex items-center"
          key={link.id}
          to={link.path}
        >
          <h4 className="text-gray-700 hover:text-cyan-500 transition-colors duration-300 text-lg  pr-8 ">
            {link.label}
          </h4>
          {link.links && <DropdownNav links={link.links} />}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNav;
