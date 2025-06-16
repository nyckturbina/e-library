import BookResponse from "@/models/book/book-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

interface RateBookRequest {
  bookId: number;
  rate: number;
}

async function rateBook(data: RateBookRequest): Promise<BookResponse> {
  const respose = await api.put("/avaliar", data);
  return respose.data;
}

export function useRateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation<BookResponse, Error, RateBookRequest>({
    mutationKey: ["rate-book"],
    mutationFn: rateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"]
      });
    },
    onError: (error) => {
      console.error(error.message)
    }
  });
}
