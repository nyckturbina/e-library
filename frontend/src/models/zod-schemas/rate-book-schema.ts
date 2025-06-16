import z from "zod";

export const RatingBookFormSchema = z.object({
  rate: z.number({message: "Digite um valor entre 1 e 10"}).min(1, "O valor mínimo é 1").max(10, "O valor máximo é 10")
});

export type RatingBookType = z.infer<typeof RatingBookFormSchema>;
