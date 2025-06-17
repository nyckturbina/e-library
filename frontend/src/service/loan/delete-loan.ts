import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

async function deleteLoan(loanId: number) {
  const response = await api.delete(`/${loanId}`);
  return response.data;
}

export function useDeleteLoanMutate() {
  const queryClient = useQueryClient();

  return useMutation<undefined, Error, number>({
    mutationKey: ["delete-loan"],
    mutationFn: deleteLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-loans"] });
    }
  });
}
