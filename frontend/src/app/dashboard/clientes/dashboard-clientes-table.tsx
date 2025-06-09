import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Cliente } from "@/models/cliente";
import { Trash2Icon } from "lucide-react";
import { clientes as clientesProviders } from "../../../models/providers/clientes-provider";
import EditClientDialog from "./edit-form/edit-client-dialog";
import { formatCPF } from "@/utils/cpf-formatter";
import DeleteClientDialog from "./delete-client/delete-client-dialog";
import { useClients } from "@/service/client/get-client";

interface DashboardTableProps {
  clientes: Cliente[];
}

export default function DashboardTable({ clientes }: DashboardTableProps) {
  const { data: clientsFromDb, isLoading, error } = useClients();

  if (clientsFromDb) {
    clientes = clientsFromDb;
  }

  if (isLoading) {
    return <div className="text-center my-40">Carregando clientes...</div>;
  }

  if (error) {
    clientes = clientesProviders;
  }

  return (
    <div>
      <Table>
        <TableCaption>Lista de clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map(cliente => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{formatCPF(cliente.cpf)}</TableCell>
              <TableCell className="text-right">
                <div className="flex">
                  <EditClientDialog client={cliente} />
                  <DeleteClientDialog client={cliente} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
