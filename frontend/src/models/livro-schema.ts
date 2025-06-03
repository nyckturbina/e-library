import { z } from "zod";

export const FormLivroSchema = z.object({
  titulo: z
    .string()
    .min(1, { message: "Título é obrigatório" })
    .min(3, { message: "Título deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Título não pode exceder 100 caracteres" })
    .transform((titulo) => titulo.trim()),

  autor: z
    .string()
    .min(1, { message: "Autor é obrigatório" })
    .min(3, { message: "Nome do autor deve ter pelo menos 3 caracteres" })
    .max(50, { message: "Nome do autor não pode exceder 50 caracteres" })
    .refine((autor) => /^[a-zA-ZáéíóúÁÉÍÓÚãõâêôÂÊÔçÇ\s]+$/.test(autor), {
      message: "Autor deve conter apenas letras"
    }),

  sinopse: z
    .string()
    .min(1, { message: "Sinopse é obrigatória" })
    .min(20, { message: "Sinopse deve ter pelo menos 20 caracteres" })
    .max(500, { message: "Sinopse não pode exceder 500 caracteres" }),

  genero: z
    .string()
    .min(1, { message: "Gênero é obrigatório" })
    .refine(
      (genero) =>
        ["Ficção", "Fantasia", "Técnico", "Biografia", "Romance"].includes(
          genero
        ),
      { message: "Gênero inválido" }
    )
    .optional(),

  isbn: z
    .string()
    .min(1, { message: "ISBN é obrigatório" })
    .refine(
      (isbn) => {
        const cleanedIsbn = isbn.replace(/[-\s]/g, "");
        return /^\d{10}$|^\d{13}$/.test(cleanedIsbn);
      },
      { message: "ISBN deve ter 10 ou 13 dígitos numéricos" }
    )
    .transform((isbn) => isbn.replace(/[-\s]/g, "")),
  quantidade: z
    .number({
      required_error: "Quantidade é obrigatória",
      invalid_type_error: "Quantidade deve ser um número"
    })
    .min(1, { message: "Quantidade mínima é 1" })
    .max(1000, { message: "Quantidade máxima é 1000" })
    .int({ message: "Quantidade deve ser um número inteiro" })
});

export type RequestLivroType = z.infer<typeof FormLivroSchema>;
