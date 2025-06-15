import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Book } from "@/models/book";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import EditBookForm from "./edit-book-form";

interface EditBookProps {
  book: Book;
}

export default function EditBook({ book }: EditBookProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Editar livro" className="text-slate-400 cursor-pointer">
          <EditIcon />
        </button>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar livro</DialogTitle>
          <DialogDescription>
            Insira os dados a serem editados nos campos abaixo.
          </DialogDescription>
        </DialogHeader>

        <EditBookForm book={book} onSuccess={() => setOpen(false)} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"} type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="create-livro-form">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
