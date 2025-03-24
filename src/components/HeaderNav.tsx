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
        <div key={link.id} className="h-full flex items-center">
          <Link className="peer" to={link.path}>
            <h4 className="text-gray-700 hover:text-cyan-500 transition-colors duration-300 text-lg  pr-8 ">
              {link.label}
            </h4>
          </Link>
          {link.links && <DropdownNav links={link.links} />}
        </div>
      ))}
    </nav>
  );
};

export default HeaderNav;
