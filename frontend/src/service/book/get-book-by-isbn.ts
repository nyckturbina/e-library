import BookResponse from "@/models/book/book-response";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export async function getBookByIsbn(isbn: string): Promise<BookResponse> {
  try {
    const response = await api.get(`/livros/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro Axios:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error("Erro ao buscar livro por ISBN");
  }
}
