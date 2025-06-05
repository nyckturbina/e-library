"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import CreateLivroForm from "./create-cliente-form";

export default function CreateLivroModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Cadastrar cliente</Button>
        </DialogTrigger>

        <DialogContent className="overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Cadastrar livro</DialogTitle>
            <DialogDescription>
              Insira os dados nos campos abaixo.
            </DialogDescription>
          </DialogHeader>

          <CreateLivroForm onSuccess={() => setIsOpen(false)} />

          <DialogFooter>
            <DialogClose>
              <Button variant={"ghost"} type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" form="create-livro-form">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
