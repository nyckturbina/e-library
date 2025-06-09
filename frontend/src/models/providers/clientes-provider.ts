import { Cliente } from "../cliente";

export const clientes: Cliente[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@example.com",
    senha: "senhaSegura123",
    cpf: "12345678901",
    deleted: false
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliv@empresa.com",
    senha: "m@riA2024",
    cpf: "98765432109",
    deleted: false
  },
  {
    id: 3,
    nome: "Carlos Pereira",
    email: "carlos.pereira@gmail.com",
    senha: "c@rl0sP3",
    cpf: "45612378903",
    deleted: true // cliente inativo
  },
  {
    id: 4,
    nome: "Ana Santos",
    email: "ana.santos@provedor.com.br",
    senha: "An@102030",
    cpf: "78901234567",
    deleted: false
  },
  {
    id: 5,
    nome: "Pedro Costa",
    email: "pedrocosta@empresa.com",
    senha: "P3dr0C0st@",
    cpf: "32165498700",
    deleted: false
  },
  {
    id: 6,
    nome: "Luísa Fernandes",
    email: "luisa.f@email.com",
    senha: "Luis@5678",
    cpf: "65498732111",
    deleted: false
  },
  {
    id: 7,
    nome: "Rafael Souza",
    email: "rafa.souza@gmail.com",
    senha: "R@fael2024",
    cpf: "14725836900",
    deleted: true // conta desativada
  },
  {
    id: 8,
    nome: "Juliana Lima",
    email: "juliana.l@outlook.com",
    senha: "JuL1m@2023",
    cpf: "36925814722",
    deleted: false
  }
];
