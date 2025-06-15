import useRating from "@/hooks/use-rating";

export default function useRateBook() {
  const { closeRatingDialog } = useRating();

  const handleRatingConfirm = () => {
    closeRatingDialog();
  };

  return { handleRatingConfirm };
}
