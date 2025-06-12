import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Book } from "@/models/book";
import { useState } from "react";

interface EditBookProps {
  book: Book;
}

export default function EditBook({ book }: EditBookProps) {
  const [open, setOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState<number | "">("");

  function handleConfirm() {
    setOpen(false);
    setRatingDialogOpen(true);
  }

  function handleRatingConfirm() {
    console.log("Nota informada:", rating);
    setRatingDialogOpen(false);
    // Adicione aqui a lógica para processar a avaliação, se necessário
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="mr-2 text-slate-800 cursor-pointer">
            <Button>Devolver livro</Button>
          </button>
        </DialogTrigger>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{book.titulo}</DialogTitle>
              <DialogDescription className="pt-2 max-h-[50vh] overflow-y-auto">
                {book.sinopse || "Este livro não possui sinopse."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleConfirm}>
                Confirmar devolução
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Dialog>

      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Avalie o livro</DialogTitle>
            <DialogDescription>
              Por favor, insira uma nota de 0 a 10:
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <input
              type="number"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setRatingDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleRatingConfirm}>
              Confirmar avaliação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
