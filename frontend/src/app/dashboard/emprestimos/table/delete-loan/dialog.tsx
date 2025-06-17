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
import { Loan } from "@/models/loan";
import { useDeleteLoanMutate } from "@/service/loan/delete-loan";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteLoanDialogProps {
  loan: Loan;
}

export default function DeleteLoanDialog({ loan }: DeleteLoanDialogProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { mutate, error } = useDeleteLoanMutate();

  const handleConfirmDelete = () => {
    mutate(loan.id);
    setOpen(false);
  };

  if (error) {
    alert("Erro ao excluir empréstimo");
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
            title="Excluir empréstimo"
          >
            <Trash2 className="text-slate-400" size={18} />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Empréstimo</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o empréstimo do
              <br /> livro <b>{loan.bookInfo.titulo}</b>
              <br /> feito pelo cliente <b>{loan.clienteInfo.nome}</b>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"} className="cursor-pointer">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmDelete} variant={"destructive"} className="cursor-pointer">
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
