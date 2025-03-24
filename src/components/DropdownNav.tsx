import { Link } from "react-router";

interface DropdownNavProps {
  links: {
    id: number;
    label: string;
    path: string;
  }[];
}

const DropdownNav = ({ links }: DropdownNavProps) => {
  return (
    <div
      className="absolute left-0 top-full w-screen bg-white shadow-md
pointer-events-none peer-hover:pointer-events-auto
opacity-0 peer-hover:opacity-100 ease-out hover:opacity-100 hover:pointer-events-auto
      "
    >
      <div className="max-w-7xl mx-auto py-16 grid grid-cols-6 gap-4">
        <nav className="col-span-2 col-start-2 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className="text-gray-700 hover:text-cyan-500 text-2xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DropdownNav;
