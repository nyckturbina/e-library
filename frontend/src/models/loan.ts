interface ClientInfo {
  id: number;
  nome: string;
  cpf: string;
}

interface BookInfo {
  id: number;
  titulo: string;
  isbn: string;
}

export enum StatusEmprestimo {
  ATIVO = "Ativo",
  DEVOLVIDO = "Devolvido",
  ATRASADO = "Atrasado"
}

export interface Loan {
  id: number;
  clienteInfo: ClientInfo;
  bookInfo: BookInfo;
  dataEmprestimo: Date;
  dataDevolucao?: Date;
  valorMulta?: number;
  statusEmprestimo: StatusEmprestimo;
}
