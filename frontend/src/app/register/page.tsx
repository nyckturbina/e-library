'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { fromTheme } from "tailwind-merge";

import { useState } from "react";

export default function Cadastro() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [titulo, setTitulo] = useState("");

  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setTitulo("ERRO NO CADASTRO!");
      setMensagem("As senhas não coincidem");
      setDialogOpen(true);
      return;
    }

    setTitulo("CADASTRADO COM SUCESSO!");
    setMensagem(`Nome: ${nome}\nEmail: ${email}`);
    setDialogOpen(true);

    setDialogOpen(true);

    console.log({nome, email, senha, confirmarSenha});
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center">

      <div className="absolute top-4 left-4">
        <Button className="cursor-pointer" variant="outline" onClick={() => router.push("/login")}>
          ← Voltar
        </Button>
      </div>

      <Card className="w-100">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Preencha todos os campos</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
            <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
            <Input type="password" placeholder="Confirme sua senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}/>

            <Button type="submit" className="w-full cursor-pointer" variant={"default"}>Registrar</Button>
          </form>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogDescription className="whitespace-pre-line">
              {mensagem}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}