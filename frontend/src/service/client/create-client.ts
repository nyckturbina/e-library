import { Cliente, ClientFormCreateType } from "@/models/cliente";
import api from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const createClient = async (
  clientData: ClientFormCreateType
): Promise<AxiosResponse<Cliente>> => {
  const response = await api.post("", clientData);
  return response;
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<Cliente>, Error, ClientFormCreateType>({
    mutationKey: ["create-client"],
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    }
  });
};
