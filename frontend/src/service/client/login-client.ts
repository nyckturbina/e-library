import ClientSafeResponse from "@/models/client/client-safe-response";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

async function loginClient(data: LoginRequest): Promise<ClientSafeResponse> {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
}

export function useLoginMutation() {
  return useMutation<ClientSafeResponse, Error, LoginRequest>({
    mutationKey: ["login-client"],
    mutationFn: loginClient,
    onError: error => {
      console.error("Login failed:", error);
    }
  });
}
