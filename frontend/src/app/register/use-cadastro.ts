"use client";

import {
  registerFormSchema,
  RegisterFormType
} from "@/models/zod-schemas/register";
import { useCadastroCliente } from "@/service/client/create-client-from-signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useCadastro() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [titulo, setTitulo] = useState("");
  const { mutate, error } = useCadastroCliente();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema)
  });

  function onSubmit(data: RegisterFormType) {
    mutate(data, {
      onSuccess: () => {
        setTitulo("CADASTRADO COM SUCESSO!");
        setMensagem(`Nome: ${data.nome}\nEmail: ${data.email}`);
        setDialogOpen(true);
        reset();
      },
      onError: error => {
        setTitulo("ERRO AO CADASTRAR");
        setMensagem(error.message);
        setDialogOpen(true);
      }
    });
  }

  function handleBack() {
    router.push("/");
  }

  return {
    dialogOpen,
    setDialogOpen,
    mensagem,
    titulo,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleBack
  };
}
