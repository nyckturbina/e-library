import useRating from "@/hooks/use-rating";
import { Loan, StatusEmprestimo } from "@/models/loan";
import { LoanProviderType } from "..";

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
      
    }

    setIsOpenDialog(false);
    openRatingDialog(loan.id.toString(), loan.bookInfo.titulo);
  };

  const hideReturnButton = () => {
    if (loan.statusEmprestimo === StatusEmprestimo.DEVOLVIDO) {
      return true;
    }
  };

  return { handleConfirm, hideReturnButton };
}
