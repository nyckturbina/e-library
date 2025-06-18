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
import { deleteBook } from "@/service/livro-consumer";
import { Dialog } from "@radix-ui/react-dialog";
import { Trash2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteBookProps {
  book: Book;
}

export default function DeleteBook({ book }: DeleteBookProps) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    await deleteBook(book.id);
    queryClient.invalidateQueries({ queryKey: ["books"] });
    console.log(`Livro "${book.titulo}" deletado`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button title="Excluir livro" className="text-red-300 cursor-pointer">
          <Trash2Icon />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Livro</DialogTitle>
          <DialogDescription>
            Tem certeza que gostaria de excluir o livro{" "}
            <span className="font-bold">{`"${book.titulo}"`}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant={"ghost"} type="button">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="cursor-pointer"
              type="button"
              variant={"destructive"}
              form="create-livro-form"
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
