export default interface BookResponse {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  isbn: string;
  sinopse: string;
  quantidadeTotal: number;
  numeroPaginas: number;
  avaliacao: number;
}
