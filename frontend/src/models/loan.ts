interface ClientDetails {
  id: number;
  name: string;
  cpf: string;
}

interface BookDetails {
  id: number;
  title: string;
  isbn: string;
}

export enum StatusEmprestimo {
  ATIVO = "Ativo",
  DEVOLVIDO = "Devolvido",
  ATRASADO = "Atrasado"
}

export interface Loan {
  id: number;
  client: ClientDetails;
  book: BookDetails;
  dataEmprestimo: Date;
  dataDevolucao?: Date;
  multa?: number;
  status: StatusEmprestimo;
}
