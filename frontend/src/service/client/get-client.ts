import { Cliente } from "@/models/cliente";
import api from "./api";
import { useQuery } from "@tanstack/react-query";

export const fetchClients = async (): Promise<Cliente[]> => {
  try {
    const clientList = await api.get("");
    return clientList.data;
  } catch (error) {
    console.error(`Erro na requisição ${error}`);
    throw error;
  }
};

export const useClients = () => {
  return useQuery<Cliente[], Error>({
    queryKey: ["clientes"],
    queryFn: fetchClients,
    retry: 0
  });
};
