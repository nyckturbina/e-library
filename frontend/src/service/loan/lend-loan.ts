import ClientSafeResponse from "@/models/client/client-safe-response";
import axios from "axios";
import { getClientByCPF } from "../client/get-client-by-cpf";
import { getBookByIsbn } from "../book/get-book-by-isbn";
import BookResponse from "@/models/book/book-response";

interface EmprestimoRequestBody {
  clienteId: number;
  livroId: number;
}

const base_url = process.env.NEXT_PUBLIC_API_URL;

export async function lendLoan(clienteCPF: string, livroId: string) {
  let client: ClientSafeResponse;
  let book: BookResponse;

  client = await getClientByCPF(clienteCPF);
  book = await getBookByIsbn(livroId);

  try {
    const requestBody: EmprestimoRequestBody = {
      clienteId: client.id,
      livroId: book.id
    };

    const response = await axios.post(`${base_url}/emprestimos`, requestBody);

    console.log("Empréstimo realizado com sucesso!");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw error;
  }
}
