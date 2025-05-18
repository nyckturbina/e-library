import { Button } from "../../ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import Gender from "./genero";

export default function CreateLivroModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Cadastrar livro</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar livro</DialogTitle>
            <DialogDescription>
              Insira os dados nos campos abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="titulo">Título</Label>
              <Input id="titulo" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="autor">Autor</Label>
              <Input id="autor"></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="sinopse">Sinopse</Label>
              <Textarea id="sinopse"></Textarea>
            </div>

            <div>
              <Gender />
            </div>

            <div className="grid grid-cols-5 gap-3 items-center">
              <Label htmlFor="isbn" className="text-right">
                ISBN
              </Label>
              <Input id="isbn" className="col-span-3" />
            </div>

            <div className="grid grid-cols-5 gap-3 items-center">
              <Label htmlFor="quantidade" className="text-right">
                Quantidade
              </Label>
              <Input id="quantidade" type="number" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button variant={"ghost"} type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
