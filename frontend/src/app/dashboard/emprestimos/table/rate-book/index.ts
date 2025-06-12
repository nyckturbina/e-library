import useRating from "@/hooks/use-rating";
import { useState } from "react";

export default function useRateBook() {
  const { closeRatingDialog } = useRating();

  const handleRatingConfirm = () => {
    closeRatingDialog();
  };

  return { handleRatingConfirm };
}
