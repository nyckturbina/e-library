import { z } from "zod";

export const registerFormSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    cpf: z
      .string()
      .transform(val => val.replace(/\D/g, "")) // Remove não-dígitos
      .pipe(
        z
          .string()
          .min(11, "CPF deve conter 11 dígitos")
          .max(11, "CPF deve conter 11 dígitos")
          .regex(/^\d+$/, "CPF deve conter apenas números")
      ),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string()
  })
  .refine(data => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;
