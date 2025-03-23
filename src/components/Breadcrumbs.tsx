import { Link } from "react-router";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && (
            <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
          {index === items.length - 1 ? (
            <span className="text-gray-900">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-cyan-500 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
