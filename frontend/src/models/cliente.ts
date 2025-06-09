import { z } from "zod";

export const ClientFormCreateSchema = z
  .object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres."),
    cpf: z
      .string()
      .min(11, "O cpf deve conter 11 caracteres.")
      .max(11, "O cpf deve conter no máximo 11 caracteres."),
    email: z
      .string()
      .min(3, "Email deve conter no mínimo 3 caracteres.")
      .email("Email inválido"),
    senha: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
    confirmarSenha: z
      .string()
      .min(6, "A senha de confirmação deve conter no mínimo 6 caracteres.")
  })
  .refine(data => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
  });

export const ClientFormEditSchema = z
  .object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres."),
    email: z
      .string()
      .min(3, "Email deve conter no mínimo 3 caracteres.")
      .email("Email inválido"),
    senha: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
    confirmarSenha: z
      .string()
      .min(6, "A senha de confirmação deve conter no mínimo 6 caracteres.")
  })
  .refine(data => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
  });

export type ClientFormCreateType = z.infer<typeof ClientFormCreateSchema>;
export type ClientFormEditType = z.infer<typeof ClientFormEditSchema>;

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  deleted: boolean;
}
