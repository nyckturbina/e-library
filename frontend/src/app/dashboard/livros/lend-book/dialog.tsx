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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "@/models/book";
import { BookPlus } from "lucide-react";
import useLendBookDialog from ".";

interface LendBookDialogProps {
  book: Book;
}

export function LendBookDialog({ book }: LendBookDialogProps) {
  const {
    isOpen,
    setOpen,
    register,
    handleSubmit,
    errors,
    reset,
    handleFormSubmit
  } = useLendBookDialog({ book });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Solicitar Empréstimo" className="cursor-pointer">
          <BookPlus className="text-slate-700" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Solicitar Empréstimo</DialogTitle>
          <DialogDescription className="pt-2 max-h-[50vh] overflow-y-auto">
            Insira os dados abaixo para registrar empréstimo
          </DialogDescription>
        </DialogHeader>

        <form
          id="lend-book-form"
          className="grid grid-cols-5 gap-y-5"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="col-span-4 col-start-1 space-y-2">
            <Label htmlFor="clientCpf">CPF do cliente:</Label>
            <Input
              id="clientCpf"
              placeholder="Apenas números (11 dígitos)"
              {...register("clientCpf")}
            />
            {errors.clientCpf && (
              <p className="text-sm text-red-500">{errors.clientCpf.message}</p>
            )}
          </div>

          <div className="col-span-4 col-start-1 space-y-2">
            <Label htmlFor="bookIsbn">ISBN do livro:</Label>
            <Input id="bookIsbn" disabled {...register("bookIsbn")} />
            {errors.bookIsbn && (
              <p className="text-sm text-red-500">{errors.bookIsbn.message}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => reset()}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="lend-book-form">
            Emprestar Livro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
