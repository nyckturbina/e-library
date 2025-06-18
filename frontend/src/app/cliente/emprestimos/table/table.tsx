import { useAuth } from "@/components/context/AuthContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useFetchLoansByClient } from "@/service/loan/fetch-loans-by-client-id";
import { useEffect } from "react";

export default function ClientLoansTable() {
  const { clientId } = useAuth();
  const { data, isLoading, isError } = useFetchLoansByClient(
    clientId ? clientId : 0
  );

  useEffect(() => {
    if (data && data.length > 0) {
      // Encontrar o empréstimo mais antigo
      const oldestLoan = data.reduce((oldest, current) => {
        const oldestDate = new Date(oldest.dataEmprestimo);
        const currentDate = new Date(current.dataEmprestimo);
        return currentDate < oldestDate ? current : oldest;
      }, data[0]);
      if (oldestLoan.dataDevolucao) {
        const devolucao = new Date(
          oldestLoan.dataEmprestimo
        ).toLocaleDateString("pt-BR");
        alert(
          `Lembrete: a data de devolução do seu empréstimo mais antigo é ${devolucao}, o prazo de entrega é ${oldestLoan.dataDevolucao}.`
        );
      }
    }
  }, [data]);

  if (!data) {
    return <div>Nenhum empréstimo encontrado</div>;
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao buscar empréstimos</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Emprestimos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Cliente</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Data Emprestimo</TableHead>
            <TableHead>Prazo de Devolução</TableHead>
            <TableHead>Multa</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(loan => (
            <TableRow key={loan.id}>
              <TableCell>{loan.clienteInfo.nome}</TableCell>
              <TableCell>{loan.clienteInfo.cpf}</TableCell>
              <TableCell>{loan.bookInfo.titulo}</TableCell>
              <TableCell>
                {new Date(loan.dataEmprestimo).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {loan.dataDevolucao
                  ? new Date(loan.dataDevolucao).toLocaleDateString("pt-BR")
                  : "-"}
              </TableCell>
              <TableCell>
                {loan.valorMulta?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </TableCell>
              <TableCell>
                <span
                  className={
                    loan.statusEmprestimo === "Ativo".toUpperCase()
                      ? "px-2 py-1 rounded text-white bg-green-300"
                      : loan.statusEmprestimo === "Devolvido".toUpperCase()
                      ? "px-2 py-1 rounded text-white bg-blue-300"
                      : loan.statusEmprestimo === "Atrasado".toUpperCase()
                      ? "px-2 py-1 rounded text-white bg-red-300"
                      : "px-2 py-1 rounded bg-gray-200"
                  }
                >
                  {loan.statusEmprestimo}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
