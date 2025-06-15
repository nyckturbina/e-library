import { Loan } from "@/models/loan";
import { useQuery } from "@tanstack/react-query";
import api from "./api";

export async function fetchAllLoans(): Promise<Loan[]> {
  try {
    const response = await api.get("");
    
    return response.data.map((loan: any) => ({
      ...loan,
      dataEmprestimo: new Date(loan.dataEmprestimo),
      dataDevolucao: loan.dataDevolucao ? new Date(loan.dataDevolucao) : undefined
    }));
  } catch (error) {
    console.error(`Ocorreu um erro na requisição: ${error}`);
    throw error;
  }
}

export function useGetAllLoans() {
  const query = useQuery<Loan[], Error>({
    queryKey: ["get-all-loans"],
    queryFn: fetchAllLoans,
    retry: 0
  });
  return query;
}
