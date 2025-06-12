import { useState } from "react";

export default function useRatingProvider() {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [currentLoanId, setCurrentLoanId] = useState<string | null>(null);
  const [currentBookTitle, setCurrentBookTitle] = useState<string | null>(null);

  const openRatingDialog = (loanId: string, bookTitle: string) => {
    setCurrentLoanId(loanId);
    setCurrentBookTitle(bookTitle);
    setIsRatingDialogOpen(true);
  };

  const closeRatingDialog = () => {
    setIsRatingDialogOpen(false);
    setCurrentLoanId(null);
    setCurrentBookTitle(null);
  };

  return {
    openRatingDialog,
    closeRatingDialog,
    isRatingDialogOpen,
    currentLoanId,
    currentBookTitle
  };
}
