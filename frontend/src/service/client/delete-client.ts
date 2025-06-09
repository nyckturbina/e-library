import { AxiosResponse } from "axios";
import api from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteClient(clientId: number): Promise<AxiosResponse<void>> {
  const response = await api.delete(`/${clientId}`);
  return response;
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<void>, Error, number>({
    mutationKey: ["delete-client"],
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    }
  });
};
