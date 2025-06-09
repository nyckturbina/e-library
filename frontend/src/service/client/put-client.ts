import { Cliente } from "@/models/cliente";
import api from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const updateClient = async (
  clientId: number,
  clientData: Cliente
): Promise<AxiosResponse<Cliente>> => {
  const response = await api.put(`/${clientId}`, {
    nome: clientData.nome,
    cpf: clientData.cpf,
    email: clientData.email,
    senha: clientData.senha
  });
  return response;
};

export const useEditClient = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<Cliente>,
    Error,
    { clientId: number; clientData: Cliente }
  >({
    mutationKey: ["edit-client"],
    mutationFn: ({ clientId, clientData }) => updateClient(clientId, clientData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    }
  });
};
