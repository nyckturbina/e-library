import { Dispatch, SetStateAction, useState } from "react";
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
import { LendBookDialog } from "./lend-book/dialog";
import { StarRating } from "@/components/star-rating";

interface DashboardTableProps {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function DashboardTable({ searchType, setSearchType, searchTerm, setSearchTerm }: DashboardTableProps) {
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

  // Filtrando os livros com base no termo de pesquisa e tipo
  let filteredBooks = books;
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    switch (searchType) {
      case "titulo":
        filteredBooks = books.filter(book => book.titulo?.toLowerCase().includes(term));
        break;
      case "autor":
        filteredBooks = books.filter(book => book.autor?.toLowerCase().includes(term));
        break;
      case "genero":
        filteredBooks = books.filter(book => book.sinopse?.toLowerCase().includes(term));
        break;
      case "isbn":
        filteredBooks = books.filter(book => book.isbn?.toLowerCase().includes(term));
        break;
      default:
        break;
    }
  }

  // Barra de pesquisa e filtro
  return (
    <div>
      <div className="flex gap-2 mb-4 items-center">
        <select
          name="searchType"
          className="bg-white border border-slate-300 rounded-xl px-2 py-2 text-charcoal-blue focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
        >
          <option value="titulo">Título</option>
          <option value="autor">Autor</option>
          <option value="genero">Gênero</option>
          <option value="isbn">ISBN</option>
        </select>
        <input
          name="pesquisa"
          type="text"
          placeholder="Pesquisar livros, autores, categorias..."
          className="bg-white border border-slate-300 rounded px-2 py-2"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <Table>
        <TableCaption>Lista de itens</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nome</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Gênero</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.map(book => (
            <TableRow
              key={book.id}
              onDoubleClick={() => handleDoubleClick(book)}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell>{book.titulo}</TableCell>
              <TableCell>{book.autor}</TableCell>
              <TableCell>{book.genero}</TableCell>
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
