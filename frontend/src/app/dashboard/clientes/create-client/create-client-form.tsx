import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cliente } from "@/models/cliente";
import FormErrorMessage from "../../../../components/form/form-error-message";
import { useCreateClientForm } from "./use-create-client-form";

interface CreateClientFormProps {
  onSuccess: () => void;
  onClientAdded: (client: Cliente) => void;
}

export default function CreateClientForm({
  onSuccess,
  onClientAdded
}: CreateClientFormProps) {
  const { register, handleSubmit, errors, submitForm } = useCreateClientForm({
    onSuccess,
    onClientAdded
  });

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} id="create-client-form">
        <div className="grid grid-cols-5 gap-x-5 gap-y-5">
          <div className="col-span-3 space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" {...register("nome")} />
            <FormErrorMessage error={errors.nome} />
          </div>

          <div className="col-start-1 col-span-2 space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" {...register("cpf")} />
            <FormErrorMessage error={errors.cpf} />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            <FormErrorMessage error={errors.email} />
          </div>

          <div className="col-start-1 col-span-2 space-y-2">
            <Label htmlFor="senha" className="text-right">
              Senha
            </Label>
            <Input id="senha" type="password" {...register("senha")} />
            <FormErrorMessage error={errors.senha} />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="confirmar-senha" className="text-right">
              Confirmar Senha
            </Label>
            <Input
              id="confirmar-senha"
              type="password"
              {...register("confirmarSenha")}
            />
            <FormErrorMessage error={errors.confirmarSenha} />
          </div>
        </div>
      </form>
    </div>
  );
}
