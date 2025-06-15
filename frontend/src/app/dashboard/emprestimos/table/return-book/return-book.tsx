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
import { Loan, StatusEmprestimo } from "@/models/loan";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import useReturnBook from ".";
import { LoanProviderType } from "..";

interface ReturnBookDialogProps {
  loan: Loan;
  setLoans: (updater: any) => void;
  loanProviderType: LoanProviderType;
}

export default function ReturnBookDialog({
  loan,
  setLoans,
  loanProviderType
}: ReturnBookDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { handleConfirm, hideReturnButton } = useReturnBook({
    setIsOpenDialog: setIsOpen,
    loan: loan,
    setLoans: setLoans,
    loanProviderType
  });

  if (hideReturnButton()) return;

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className="p-1 text-green-400 hover:bg-green-50 rounded cursor-pointer"
            title="Marcar como devolvido"
          >
            <CheckCircle size={18} />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Devolução</DialogTitle>
            <DialogDescription>
              Deseja confirmar devolução do livro <b>{loan.bookInfo.titulo}</b>{" "}
              emprestado ao cliente <b>{loan.clienteInfo.nome}</b>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
