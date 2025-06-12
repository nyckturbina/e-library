import { Book } from "@/models/book";
import { deleteBook } from "@/service/livro-consumer";

interface DeleteBookProps {
  book: Book;
}

export default function DeleteBook({ book }: DeleteBookProps) {
  const handleDelete = async () => {
    await deleteBook(book.id);
    console.log(`Livro "${book.titulo}" deletado`);
  };

  return <div></div>;
}
