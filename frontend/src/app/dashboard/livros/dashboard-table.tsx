import { useBooks } from "@/service/livro-consumer";
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
import { books as booksProvided } from "@/models/providers/books-provider";
import DeleteBook from "./delete-book";
import EditBook from "./edit-book-modal";
import { useState } from "react";
import { LendBookDialog } from "./lend-book/dialog";
import { StarRating } from "@/components/star-rating";

export default function DashboardTable() {
  let books: Book[] = [];
  const { data, isLoading, error } = useBooks();

  const [isLendDialogOpen, setIsLendDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (data) {
    books = data;
  }

  if (isLoading) {
    return <div className="text-center my-40">Carregando livros...</div>;
  }

  if (error) {
    books = booksProvided;
  }

  const handleDoubleClick = (book: Book) => {
    setSelectedBook(book);
    setIsLendDialogOpen(true);
  };
  const handleConfirmLend = (bookId: string) => {
    console.log(`Iniciando processo de empréstimo para o livro ID: ${bookId}`);
    setIsLendDialogOpen(false);
  };

  return (
    <div>
      <Table>
        <TableCaption>Lista de itens</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nome</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map(book => (
            <TableRow
              key={book.id}
              onDoubleClick={() => handleDoubleClick(book)}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell>{book.titulo}</TableCell>
              <TableCell>{book.autor}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>
                <StarRating rating={book.avaliacao ?? 0} />
              </TableCell>
              <TableCell>{book.quantidadeTotal}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center">
                  <LendBookDialog book={book} />
                  <EditBook book={book} />
                  <DeleteBook book={book} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
