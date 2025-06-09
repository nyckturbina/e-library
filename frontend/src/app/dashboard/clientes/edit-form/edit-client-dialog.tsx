import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import EditClientForm from "./edit-client-form";
import { Cliente } from "@/models/cliente";

interface EditClientDialogProps {
  client: Cliente;
}

export default function EditClientDialog({ client }: EditClientDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFormSubmit = () => {
    // Fecha formulário após submit
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="mr-2 text-slate-800 cursor-pointer">
            <EditIcon />
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogDescription>
              Insira os dados a serem editados nos campos abaixo.
            </DialogDescription>
          </DialogHeader>

          <EditClientForm
            client={client}
            onSuccessfulSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
