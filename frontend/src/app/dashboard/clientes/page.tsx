"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CreateClientDialog from "./create-client/create-client-dialog";
import DashboardTable from "./dashboard-clientes-table";
import { useDashboardClientesLogic } from "./use-dashboard-clientes-logic";

export default function Dashboard() {
  const { clientes, handleAddClient, handleGoToLivros } =
    useDashboardClientesLogic();

  const router = useRouter();

  return (
    <div className="p-10 justify-center min-h-screen flex items-center flex-col gap-3">
      <h1 className="text-2xl">Gerenciamento de clientes</h1>

      <DashboardTable clientes={clientes} />

      <CreateClientDialog onClientAdded={handleAddClient} />

      <div className="space-x-2">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={handleGoToLivros}
        >
          Gerenciar livros
        </Button>
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
