import z from "zod";

export const lendBookSchema = z.object({
  clientCpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(11, "CPF deve ter 11 dígitos")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  bookIsbn: z
    .string()
    .min(10, "ISBN deve ter entre 10 e 13 caracteres")
    .max(13, "ISBN deve ter entre 10 e 13 caracteres")
    .regex(/^[0-9-]+$/, "ISBN deve conter apenas números e hífens")
});

export type LendBookFormType = z.infer<typeof lendBookSchema>;
