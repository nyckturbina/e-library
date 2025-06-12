import { RatingContext } from "@/contexts/rating/rating-context";
import { useContext } from "react";

export default function useRating() {
  const context = useContext(RatingContext);
  if (context === undefined) {
    throw new Error("useRating must be used within a RatingProvider");
  }
  return context;
}
