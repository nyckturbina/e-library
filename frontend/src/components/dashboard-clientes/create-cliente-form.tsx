"use client";

import { FormLivroSchema, RequestLivroType } from "@/models/livro-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { URL_API_LIVROS as URL_API } from "@/service/livro-consumer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Gender from "../home/create-livro/genero";

interface CreateClienteFormProps {
  onSuccess?: () => void;
}

export default function CreateClienteForm({ onSuccess }: CreateClienteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RequestLivroType>({
    resolver: zodResolver(FormLivroSchema)
  });

  const submit = async (data: RequestLivroType) => {
    try {
      await axios.post(URL_API, data);
      console.log("Dados do livro enviados:", data);
      if (onSuccess) onSuccess(); // Fecha modal
    } catch (error) {
      console.error(`Erro na requisção: ${error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} id="create-livro-form">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="titulo">Nome</Label>
            <Input id="titulo" {...register("titulo")} />
            {errors.titulo && (
              <p className="text-red-500 mb-2">{errors.titulo.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="autor">CPF</Label>
            <Input id="autor" {...register("autor")} />
            {errors.autor && (
              <p className="text-red-500 mb-2">{errors.autor.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="sinopse">E-mail</Label>
            <Textarea id="sinopse" {...register("sinopse")} />
            {errors.sinopse && (
              <p className="text-red-500 mb-2">{errors.sinopse.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Gender />
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <Label htmlFor="isbn" className="text-right">
              ISBN
            </Label>
            <Input id="isbn" className="col-span-3" {...register("isbn")} />
            {errors.isbn && (
              <p className="text-red-500 col-span-5 mb-2">
                {errors.isbn.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <Label htmlFor="quantidade" className="text-right">
              Quantidade
            </Label>
            <Input
              id="quantidade"
              type="number"
              {...register("quantidade", { valueAsNumber: true })}
            />
            {errors.quantidade && (
              <p className="text-red-500 col-span-5 mb-2">
                {errors.quantidade.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
