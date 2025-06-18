export interface Book {
  id: number;
  capa: string;
  titulo: string;
  autor: string;
  sinopse: string;
  isbn: string
  avaliacao?: number; // opcional pois ainda não foi definido no backend
  quantidadeTotal: number;
  genero?: string;
}
