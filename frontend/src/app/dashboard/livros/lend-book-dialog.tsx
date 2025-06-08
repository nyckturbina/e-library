import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Book } from "@/models/book";

interface LendBookDialogProps {
  book: Book | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmLend: (bookId: number) => void;
}

export function LendBookDialog({ book, isOpen, onOpenChange, onConfirmLend }: LendBookDialogProps) {
  if (!book) {
    return null;
  }

  const handleConfirm = () => {
    onConfirmLend(book.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{book.titulo}</DialogTitle>
          <DialogDescription className="pt-2 max-h-[50vh] overflow-y-auto">
            {book.sinopse || "Este livro não possui sinopse."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleConfirm}>
            Emprestar Livro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}