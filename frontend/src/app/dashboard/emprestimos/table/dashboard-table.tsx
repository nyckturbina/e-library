"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { loansProvider } from "@/models/providers/loans-provider";
import { useGetAllLoans } from "@/service/loan/get-loans";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import useTable, { LoanProviderType } from ".";
import RateBookDialog from "./rate-book/dialog";
import ReturnBookDialog from "./return-book/return-book";

export default function DashboardTable() {
  const { getLoans, setLoans, loanProviderType, setLoanProviderType } =
    useTable();
  const { data, isLoading, error } = useGetAllLoans();

  useEffect(() => {
    if (data) {
      setLoans(data);
      setLoanProviderType(LoanProviderType.BACKEND);
    }
  }, [data]);

  if (isLoading) return <div>Carregando empréstimos...</div>;

  if (error) {
    console.error("Erro ao buscar os dados");
    setLoans(loansProvider);
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
            <TableHead>Data de Devolução</TableHead>
            <TableHead>Multa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getLoans().map(loan => (
            <TableRow key={loan.id}>
              <TableCell>{loan.clienteInfo.nome}</TableCell>
              <TableCell>{loan.clienteInfo.cpf}</TableCell>
              <TableCell>{loan.bookInfo.titulo}</TableCell>
              <TableCell>
                {loan.dataEmprestimo.toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {loan.dataDevolucao?.toLocaleDateString("pt-BR")}
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
              <TableCell>
                <div className="flex gap-2">
                  <button
                    className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                    title="Excluir empréstimo"
                  >
                    <Trash2 className="text-slate-400" size={18} />
                  </button>
                  <ReturnBookDialog
                    loan={loan}
                    setLoans={setLoans}
                    loanProviderType={loanProviderType}
                  />
                </div>
              </TableCell>
              <RateBookDialog bookId={loan.bookInfo.id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
