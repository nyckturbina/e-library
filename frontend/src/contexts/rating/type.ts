export default interface RatingContextType {
  openRatingDialog: (loanId: string, bookTitle: string) => void;
  closeRatingDialog: () => void;
  isRatingDialogOpen: boolean;
  currentLoanId: string | null;
  currentBookTitle: string | null;
}
