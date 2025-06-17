import { Loan } from "@/models/loan";
import api from "./api";
import { useQuery } from "@tanstack/react-query";

async function fetchLoansByClient(clientId: number): Promise<Loan[]> {
  const response = await api.get(`/cliente/${clientId}`);
  return response.data;
}

export function useFetchLoansByClient(clientId: number) {
  return useQuery<Loan[], Error>({
    queryKey: ["get-loans-by-client-id", clientId],
    queryFn: () => fetchLoansByClient(clientId)
  });
}
