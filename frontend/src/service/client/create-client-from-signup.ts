import { RegisterFormType } from "@/models/zod-schemas/register";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface ClienteRequestDTO {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
}

const cadastrarCliente = async (data: ClienteRequestDTO) => {
  const response = await axios.post("http://localhost:8080/clientes", data);
  return response.data;
};

export const useCadastroCliente = () => {
  return useMutation({
    mutationKey: ["create-client-from-signup"],
    mutationFn: (data: RegisterFormType) => {
      const clienteData = {
        nome: data.nome,
        cpf: data.cpf.replace(/\D/g, ""), // Remove formatação do CPF
        email: data.email,
        senha: data.senha
      };
      return cadastrarCliente(clienteData);
    }
  });
};
