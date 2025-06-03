import { useBooks } from "@/api-consumer/livro-consumer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Book } from "@/models/book";
import { books as booksProvided } from "@/models/books-provider";
import { EditIcon, Trash2Icon } from "lucide-react";

export default function DashboardTable() {
  let books: Book[] = [];
  const { data, isLoading, error } = useBooks();

  if (data) {
    books = data;
  }

  if (isLoading) {
    return <div className="text-center my-40">Carregando livros...</div>;
  }

  if (error) {
    books = booksProvided;
  }

  return (
    <div>
      <Table>
        <TableCaption>Lista de itens</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nome</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map(book => (
            <TableRow key={book.id}>
              <TableCell>{book.titulo}</TableCell>
              <TableCell>{book.autor}</TableCell>
              <TableCell>{book.avaliacao}</TableCell>
              <TableCell className="text-right">
                <button className="mr-2 text-blue-500">
                  <EditIcon />
                </button>
                <button className="text-red-500">
                  <Trash2Icon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
