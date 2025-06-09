import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Cliente } from "@/models/cliente";
import { clientes as clientesProviders } from "@/models/providers/clientes-provider";

export function useDashboardClientesLogic() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setClientes(clientesProviders);
    }
    // Aqui você pode adicionar a chamada à API quando estiver em produção
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      const isLoggedIn = localStorage.getItem("loggedIn");
      if (isLoggedIn !== "true") {
        router.push("/login");
      }
    }
  }, [router]);

  const handleAddClient = (newClient: Cliente) => {
    setClientes([...clientes, newClient]);
  };

  const handleGoToLivros = () => {
    router.push("/dashboard/livros");
  };

  return {
    clientes,
    handleAddClient,
    handleGoToLivros,
    router,
  };
}
