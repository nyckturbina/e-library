import useRating from "@/hooks/use-rating";
import { Loan, StatusEmprestimo } from "@/models/loan";
import { LoanProviderType } from "..";
import { useReturnLoanMutate } from "@/service/loan/return-loan";

interface useReturnBookProps {
  setIsOpenDialog: (open: boolean) => void;
  loan: Loan;
  setLoans: (updater: any) => void;
  loanProviderType: LoanProviderType;
}

export default function useReturnBook({
  setIsOpenDialog,
  loan,
  setLoans,
  loanProviderType
}: useReturnBookProps) {
  const { openRatingDialog } = useRating();
  const { mutate, isPending, error } = useReturnLoanMutate();

  const handleConfirm = () => {
    if (loanProviderType === LoanProviderType.MOCK) {
      setLoans((prevLoans: Loan[]) =>
        prevLoans.map(l =>
          l.id === loan.id
            ? { ...l, statusEmprestimo: StatusEmprestimo.DEVOLVIDO }
            : l
        )
      );
    }

    if (loanProviderType === LoanProviderType.BACKEND) {
      mutate(loan.id);
    }

    setIsOpenDialog(false);
    openRatingDialog(loan.id.toString(), loan.bookInfo.titulo);
  };

  // Deve ser case insensitive
  const hideReturnButton = () =>
    loan.statusEmprestimo.toUpperCase() ===
    StatusEmprestimo.DEVOLVIDO.toUpperCase();

  return { handleConfirm, hideReturnButton, isPending, error };
}
