import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/types";

interface ProductsTableProps {
  products: Product[];
  handleDelete: (id: number) => void;
  handleOpenDialog: (product: Product) => void;
}

const ProductsTable = ({
  products,
  handleDelete,
  handleOpenDialog,
}: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader className="border-0">
        <TableRow>
          <TableHead className="text-center">ID</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead className="text-right">Цена (в руб.)</TableHead>
          <TableHead className="text-right">В наличии</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="border-0">
            <TableCell className="text-center">{product.id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell className="text-right">{product.price}</TableCell>
            <TableCell className="text-right">{product.stock}</TableCell>
            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenDialog(product)}
                className="cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(product.id)}
                className="text-destructive cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
