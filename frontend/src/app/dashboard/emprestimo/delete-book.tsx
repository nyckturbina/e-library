import { deleteBook } from "@/api-consumer/livro-consumer";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Book } from "@/models/book";
import { Dialog } from "@radix-ui/react-dialog";
import { Trash2Icon } from "lucide-react";

interface DeleteBookProps {
  book: Book;
}

export default function DeleteBook({ book }: DeleteBookProps) {
  const handleDelete = async () => {
    await deleteBook(book.id);
    console.log(`Livro "${book.titulo}" deletado`);
  };

  return (
    <div>

    </div>
  );
}
