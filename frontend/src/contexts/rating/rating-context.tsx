import React from "react";
import useRatingProvider from ".";
import RatingContextType from "./type";

export const RatingContext = React.createContext<RatingContextType | undefined>(
  undefined
);

export default function RatingProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    openRatingDialog,
    closeRatingDialog,
    isRatingDialogOpen,
    currentLoanId,
    currentBookTitle
  } = useRatingProvider();

  return (
    <RatingContext
      value={{
        openRatingDialog,
        closeRatingDialog,
        isRatingDialogOpen,
        currentLoanId,
        currentBookTitle
      }}
    >
      {children}
    </RatingContext>
  );
}
