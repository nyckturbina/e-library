import { Loan, StatusEmprestimo } from "../loan";

export const loansProvider: Loan[] = [
  {
    id: 1,
    client: {
      id: 101,
      name: "João Silva",
      cpf: "123.456.789-00"
    },
    book: {
      id: 1001,
      title: "O Senhor dos Anéis",
      isbn: "978-8533615540"
    },
    dataEmprestimo: new Date("2023-05-10"),
    dataDevolucao: new Date("2023-05-24"), // Devolvido dentro do prazo
    status: StatusEmprestimo.DEVOLVIDO
  },
  {
    id: 2,
    client: {
      id: 102,
      name: "Maria Oliveira",
      cpf: "987.654.321-00"
    },
    book: {
      id: 1002,
      title: "Dom Casmurro",
      isbn: "978-8572326972"
    },
    dataEmprestimo: new Date("2023-06-15"),
    // Sem dataDevolucao pois ainda está ativo
    status: StatusEmprestimo.ATIVO
  },
  {
    id: 3,
    client: {
      id: 103,
      name: "Carlos Souza",
      cpf: "456.123.789-00"
    },
    book: {
      id: 1003,
      title: "1984",
      isbn: "978-8522106169"
    },
    dataEmprestimo: new Date("2023-05-01"),
    dataDevolucao: new Date("2023-05-30"), // Devolvido com atraso
    multa: 15.5,
    status: StatusEmprestimo.DEVOLVIDO
  },
  {
    id: 4,
    client: {
      id: 104,
      name: "Ana Costa",
      cpf: "789.456.123-00"
    },
    book: {
      id: 1004,
      title: "A Revolução dos Bichos",
      isbn: "978-8525422064"
    },
    dataEmprestimo: new Date("2023-06-01"),
    // Sem dataDevolucao e com multa pois está atrasado
    multa: 20.0,
    status: StatusEmprestimo.ATRASADO
  },
  {
    id: 5,
    client: {
      id: 105,
      name: "Pedro Rocha",
      cpf: "321.654.987-00"
    },
    book: {
      id: 1005,
      title: "O Pequeno Príncipe",
      isbn: "978-8595081512"
    },
    dataEmprestimo: new Date("2023-06-10"),
    // Empréstimo ativo, sem multa e sem data de devolução
    status: StatusEmprestimo.ATIVO
  }
];
