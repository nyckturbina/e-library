"use client";

import {
  registerFormSchema,
  RegisterFormType
} from "@/models/zod-schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useCadastro() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [titulo, setTitulo] = useState("");

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
    setTitulo("CADASTRADO COM SUCESSO!");
    setMensagem(`Nome: ${data.nome}\nEmail: ${data.email}`);
    setDialogOpen(true);
    reset();
    console.log(data);
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
