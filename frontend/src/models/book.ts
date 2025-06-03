export interface Book {
  id: number; 
  capa: string;
  titulo: string;
  autor: string;
  avaliacao?: number; // opcional pois ainda não foi definido no backend
}