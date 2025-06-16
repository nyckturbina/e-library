import { Loan } from "@/models/loan";
import api from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function returnLoan(loanId: number): Promise<Loan> {
  const response = await api.put(`/${loanId}`);
  return response.data;
}

export function useReturnLoanMutate() {
  const queryClient = useQueryClient();

  return useMutation<Loan, Error, number>({
    mutationKey: ["return-loan"],
    mutationFn: returnLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-loans"]
      });
    }
  });
}
