import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Cliente } from "@/models/cliente";
import { useDeleteClient } from "@/service/client/delete-client";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";

interface DeleteClientDialogProps {
  client: Cliente;
}

export default function DeleteClientDialog({
  client
}: DeleteClientDialogProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { mutate: deleteClient, isError } = useDeleteClient();

  const handleDelete = () => {
    if (isError) {
      console.error("Erro ao excluir o cliente.");
      return;
    }

    deleteClient(client.id);
    console.log(`Cliente '${client.nome}' removido com sucesso!`);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="text-red-900 cursor-pointer">
            <Trash2Icon />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Cliente</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o cliente <b>{client.nome}</b>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancelar</Button>
            </DialogClose>
            <Button variant={"destructive"} onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
