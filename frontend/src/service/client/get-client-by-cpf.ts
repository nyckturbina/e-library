import axios, { AxiosResponse } from "axios";
import api from "./api";
import ClientSafeResponse from "@/models/client/client-safe-response";

export async function getClientByCPF(cpf: string): Promise<ClientSafeResponse> {
  try {
    const response: AxiosResponse<ClientSafeResponse> = await api.get(`/cpf/${cpf}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.log("Cliente não encontrado");
      } else {
        console.error("Erro na requisição:", error.message);
      }
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error("Erro ao buscar Cliente");
  }
}
