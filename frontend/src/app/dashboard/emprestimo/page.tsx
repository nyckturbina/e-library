"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";

import CreateLivroModal from "@/components/dashboard-livros/create-livro-modal";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardTable from "./dashboard-table";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();

  // Redireciona caso não esteja logado
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      const isLoggedIn = localStorage.getItem("loggedIn");
      if (isLoggedIn !== "true") {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="p-10 justify-center min-h-screen flex items-center flex-col gap-3">
      <h1 className="text-2xl">Histórico de empréstimos</h1>
      
      <Alert variant={"default"} className="max-w-sm">
        <CheckCircle2Icon />
        <AlertTitle>Logado com sucesso</AlertTitle>
      </Alert>

      <DashboardTable />

      <CreateLivroModal />

      <div>
        <Button className="cursor-pointer" variant="outline" onClick={() => router.push("/dashboard-clientes")}>
          Gerenciar clientes
        </Button>
      </div>

      {/* <Link href={"/dashboard-clientes"}>Gerenciar clientes</Link> */}
      
      <Link href={"/"}>Voltar para página inicial</Link>

        {/* 
        Navegação entre dashboards (criação de livros e usuário)
        Botão de cadastrar cliente (add nome,cpf,email,senha)
        Tela de gerenciamento de clientes (variação do dashboard de livros)
        Botões de ações: editar e excluir
        Tabela de usuários
      */ }

    </div>
  );
}
