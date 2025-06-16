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
import useRateForm from "./use-rate-form";

export default function RateBookDialog({ bookId }: { bookId: number }) {
  const { handleRatingConfirm } = useRateBook({ bookId });
  const { isRatingDialogOpen, closeRatingDialog, currentBookTitle } =
    useRating();
  const { register, handleSubmit, errors } = useRateForm();

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
            <form
              id="rate-book-form"
              onSubmit={handleSubmit(handleRatingConfirm)}
            >
              <input
                type="number"
                min="1"
                max="10"
                className="border p-2 w-full"
                {...register("rate", {
                  valueAsNumber: true
                })}
              />
              {errors.rate && (
                <div className="text-red-500">{errors.rate.message}</div>
              )}
            </form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button form="rate-book-form" type="submit">
              Confirmar avaliação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
