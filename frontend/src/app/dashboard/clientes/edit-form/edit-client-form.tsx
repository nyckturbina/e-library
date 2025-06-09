import { useEditClient } from "@/service/client/put-client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Cliente,
  ClientFormEditSchema,
  ClientFormEditType
} from "@/models/cliente";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../../../components/form/form-error-message";

interface EditClientFormProps {
  client: Cliente;
  onSuccessfulSubmit?: () => void;
}

export default function EditClientForm({
  client,
  onSuccessfulSubmit
}: EditClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientFormEditType>({
    resolver: zodResolver(ClientFormEditSchema),
    defaultValues: {
      nome: client.nome,
      email: client.email,
      senha: client.senha,
      confirmarSenha: client.senha
    }
  });

  const { mutate: editClient } = useEditClient();

  const submit = (clientData: ClientFormEditType): void => {
    editClient({
      clientId: client.id,
      clientData: {
        ...clientData,
        id: client.id,
        cpf: client.cpf, // CPF não pode ser editado
        deleted: client.deleted // Mantém o estado de exclusão
      }
    });
    console.log(`Cliente "${client.nome}" editado com sucesso!`);
    onSuccessfulSubmit?.(); // Chama caso exista
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-3 gap-y-5"
      >
        <div className="col-span-3 space-y-2">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" {...register("nome")} />
          <FormErrorMessage error={errors.nome} />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          <FormErrorMessage error={errors.email} />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" type="password" {...register("senha")}></Input>
          <FormErrorMessage error={errors.senha} />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="confirmar-senha">Confirmar senha</Label>
          <Input
            id="confirmar-senha"
            type="password"
            {...register("confirmarSenha")}
          ></Input>
          <FormErrorMessage error={errors.confirmarSenha} />
        </div>

        <DialogFooter className="col-[1/4]">
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancelar</Button>
          </DialogClose>
          <Button type="submit" className="cursor-pointer">
            Salvar edição
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}
