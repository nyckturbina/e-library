"use client";

import CreateLivroModal from "@/components/dashboard-livros/create-livro-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardTable from "./dashboard-table";

export default function Dashboard() {
  const router = useRouter();
  // Estado para pesquisa
  const [searchType, setSearchType] = useState("titulo");
  const [searchTerm, setSearchTerm] = useState("");

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
      <h1 className="text-2xl">Gerenciamento de livros</h1>

      <DashboardTable
        searchType={searchType}
        setSearchType={setSearchType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CreateLivroModal />

      <div>
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={() => router.push("/dashboard/clientes")}
        >
          Gerenciar clientes
        </Button>{" "}
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={() => router.push("/dashboard/emprestimos")}
        >
          Gerenciar empréstimos
        </Button>
      </div>

      <Link href={"/"}>Voltar para página inicial</Link>
    </div>
  );
}
