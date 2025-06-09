import CreateLivroForm from "@/components/dashboard-livros/create-livro-form";
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
import { useState } from "react";
import CreateClientForm from "./create-client-form";
import { Cliente } from "@/models/cliente";

interface CreateClientDialogProps {
  onClientAdded: (client: Cliente) => void;
}

export default function CreateClientDialog({
  onClientAdded
}: CreateClientDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Cadastrar cliente</Button>
        </DialogTrigger>

        <DialogContent className="overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Cadastrar cliente</DialogTitle>
            <DialogDescription>
              Insira os dados nos campos abaixo.
            </DialogDescription>
          </DialogHeader>

          <CreateClientForm
            onSuccess={() => setIsOpen(false)}
            onClientAdded={onClientAdded}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"} type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" form="create-client-form">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
