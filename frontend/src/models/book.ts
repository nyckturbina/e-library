export interface Book {
  id: number; // ou string se usar UUID
  capa: string;
  titulo: string;
  autor: string;
  avaliacao?: number; // opcional
}