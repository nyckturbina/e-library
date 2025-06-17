import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .nonempty("Senha é obrigatória")
});

export type LoginFormData = z.infer<typeof loginSchema>;
