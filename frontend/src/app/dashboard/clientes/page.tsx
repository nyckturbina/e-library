"use client";

import { Button } from "@/components/ui/button";
import { Cliente } from "@/models/cliente";
import { clientes as clientesProviders } from "@/models/providers/clientes-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateClientDialog from "./create-client/create-client-dialog";
import DashboardTable from "./dashboard-clientes-table";
import { useClients } from "@/service/client/get-client";
import { useDashboardClientesLogic } from "./use-dashboard-clientes-logic";

export default function Dashboard() {
  const {
    clientes,
    handleAddClient,
    handleGoToLivros,
  } = useDashboardClientesLogic();

  return (
    <div className="p-10 justify-center min-h-screen flex items-center flex-col gap-3">
      <h1 className="text-2xl">Gerenciamento de clientes</h1>

      <DashboardTable clientes={clientes} />

      <CreateClientDialog onClientAdded={handleAddClient} />

      <div>
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={handleGoToLivros}
        >
          Gerenciar livros
        </Button>
      </div>

      <Link href={"/"}>Voltar para página inicial</Link>
    </div>
  );
}
