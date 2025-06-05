import { useBooks } from "@/api-consumer/livro-consumer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Book } from "@/models/book";
import { Cliente } from "@/models/cliente";
import { books as booksProvided } from "@/models/books-provider";
import { clientes as clientesProvided } from "@/models/clientes-provider";
import DeleteBook from "./deleteclientes";
import DeleteCliente from "./deleteclientes";
import EditBook from "./editclientes-modal";
import EditCliente from "./editclientes-modal";

export default function DashboardTable() {
  let clientes: Book[] = [];
  const { data, isLoading, error } = useBooks();

  if (data) {
    clientes = data;
  }

  if (isLoading) {
    return <div className="text-center my-40">Carregando livros...</div>;
  }

  if (error) {
    clientes = booksProvided;
  }

  return (
    <div>
      <Table>
        <TableCaption>Lista de clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map(clientes => (
            <TableRow key={clientes.nome}>
              <TableCell>{clientes.email}</TableCell>
              <TableCell>{clientes.senha}</TableCell>
              <TableCell>{clientes.cpf}</TableCell>
              <TableCell className="text-right">
                <div className="flex">
                  <EditBook book={clientes} />
                  <DeleteBook book={clientes} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
