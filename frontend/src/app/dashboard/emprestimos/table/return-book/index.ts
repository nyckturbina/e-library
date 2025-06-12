import useRating from "@/hooks/use-rating";
import { Loan, StatusEmprestimo } from "@/models/loan";

interface useReturnBookProps {
  setIsOpenDialog: (open: boolean) => void;
  loan: Loan;
  setLoans: (updater: any) => void;
}

export default function useReturnBook({
  setIsOpenDialog,
  loan,
  setLoans
}: useReturnBookProps) {
  const { openRatingDialog } = useRating();

  const handleConfirm = () => {
    setLoans((prevLoans: Loan[]) =>
      prevLoans.map(l =>
        l.id === loan.id ? { ...l, status: StatusEmprestimo.DEVOLVIDO } : l
      )
    );
    setIsOpenDialog(false);
    openRatingDialog(loan.id.toString(), loan.book.title);
  };

  const hideReturnButton = () => {
    if (loan.status === StatusEmprestimo.DEVOLVIDO) {
      return true;
    }
  };

  return { handleConfirm, hideReturnButton };
}
