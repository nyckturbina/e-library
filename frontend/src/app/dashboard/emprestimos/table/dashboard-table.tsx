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
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import useTable from ".";
import RateBookDialog from "./rate-book/dialog";
import ReturnBookDialog from "./return-book/return-book";

export default function DashboardTable() {
  const { getLoans, setLoans } = useTable();

  useEffect(() => {
    setLoans(loansProvider);
  }, []);

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
              <TableCell>{loan.client.name}</TableCell>
              <TableCell>{loan.client.cpf}</TableCell>
              <TableCell>{loan.book.title}</TableCell>
              <TableCell>
                {loan.dataEmprestimo.toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {loan.dataDevolucao?.toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {loan.multa?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </TableCell>
              <TableCell>
                <span
                  className={
                    loan.status === "Ativo"
                      ? "px-2 py-1 rounded text-white bg-green-300"
                      : loan.status === "Devolvido"
                      ? "px-2 py-1 rounded text-white bg-blue-300"
                      : loan.status === "Atrasado"
                      ? "px-2 py-1 rounded text-white bg-red-300"
                      : "px-2 py-1 rounded bg-gray-200"
                  }
                >
                  {loan.status}
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
                  <ReturnBookDialog loan={loan} setLoans={setLoans} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RateBookDialog />
    </div>
  );
}
