"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import CadastroDialog from "./CadastroDialog";
import { Input } from "@/components/ui/input";
import { useCadastro } from "./use-cadastro";

export default function Cadastro() {
  const {
    dialogOpen,
    setDialogOpen,
    mensagem,
    titulo,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleBack
  } = useCadastro();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-4 left-4">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={handleBack}
        >
          ← Voltar
        </Button>
      </div>

      <Card className="w-100">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Preencha todos os campos</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input type="text" placeholder="Nome" {...register("nome")} />
              {errors.nome && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <Input 
                type="text" 
                placeholder="CPF" 
                {...register("cpf")}
                maxLength={14}
              />
              {errors.cpf && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.cpf.message}
                </p>
              )}
            </div>

            <div>
              <Input type="email" placeholder="E-mail" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Senha"
                {...register("senha")}
              />
              {errors.senha && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.senha.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirme sua senha"
                {...register("confirmarSenha")}
              />
              {errors.confirmarSenha && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              variant={"default"}
            >
              Registrar
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {/* Diálogo de feedback */}
      <CadastroDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        titulo={titulo} 
        mensagem={mensagem} 
      />
    </div>
  );
}