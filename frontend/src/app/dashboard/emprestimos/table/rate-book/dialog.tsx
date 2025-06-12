import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import useRating from "@/hooks/use-rating";
import useRateBook from ".";

export default function RateBookDialog() {
  const {
    isRatingDialogOpen,
    closeRatingDialog,
    currentBookTitle,
    currentLoanId
  } = useRating();
  const { handleRatingConfirm } = useRateBook();

  return (
    <div>
      <Dialog open={isRatingDialogOpen} onOpenChange={closeRatingDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Avalie o livro</DialogTitle>
            <DialogDescription>
              Por favor, insira uma nota de 1 a 10 ao livro <br />
              <b>{currentBookTitle}</b>
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <input
              type="number"
              min="0"
              max="10"
              className="border p-2 w-full"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleRatingConfirm}>
              Confirmar avaliação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
