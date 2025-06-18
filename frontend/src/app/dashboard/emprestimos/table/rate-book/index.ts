import useRating from "@/hooks/use-rating";
import { RatingBookType } from "@/models/zod-schemas/rate-book-schema";
import { useRateBookMutation } from "@/service/book/rate-book";

export default function useRateBook({ bookId }: { bookId: number }) {
  const { closeRatingDialog } = useRating();
  const { mutate, error } = useRateBookMutation();

  const handleRatingConfirm = (data: RatingBookType) => {
    mutate({ bookId, rate: data.rate });
    console.log(`Avaliação registrada com sucesso: ${data.rate}`);

    if (error) {
      alert(`Erro registrar avaliação:
        \nErro:${error.name}
        \nMensagem: ${error.message}`);
    }

    closeRatingDialog();
  };

  return { handleRatingConfirm };
}
