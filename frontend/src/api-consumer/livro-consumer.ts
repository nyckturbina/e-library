import { Book } from "@/models/book";
import { LivroType } from "@/models/livro-schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const URL_API_LIVROS = "http://localhost:8080/livros";

export async function createLivro(livro: LivroType) {
  try {
    const response = await fetch(URL_API_LIVROS, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(livro)
    });

    if (!response.ok) {
      throw Error(`HTTP Erro! Status: ${response.status}`);
    }

    const result: LivroType = await response.json();
    console.log(`Sucess: ${result}`);
    return result;
  } catch (error) {
    console.error(`Erro ao buscar dados: ${error}`);
  }
}

export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await axios.get<Book[]>(URL_API_LIVROS, {
      timeout: 3 * 1000
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(`Erro na requisição: ${error}`);
    throw error;
  }
}

export function useBooks() {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
    refetchInterval: 5 * 1000,
    retry: 0
  });
}
