import { useCreateClient } from "@/service/client/post-client";
import {
  Cliente,
  ClientFormCreateSchema,
  ClientFormCreateType
} from "@/models/cliente";
import { clientes } from "@/models/providers/clientes-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseCreateClientFormProps {
  onSuccess: () => void;
  onClientAdded: (client: Cliente) => void;
}

export function useCreateClientForm({
  onSuccess,
  onClientAdded
}: UseCreateClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientFormCreateType>({
    resolver: zodResolver(ClientFormCreateSchema)
  });

  const { mutate, isError } = useCreateClient();

  const submitForm = async (data: ClientFormCreateType) => {
    if (isError) {
      const maxId = clientes.reduce(
        (max, cliente) => (cliente.id > max ? cliente.id : max),
        0
      );
      const cliente: Cliente = {
        id: maxId + 1,
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        senha: data.senha,
        deleted: false
      };
      onClientAdded(cliente);
      onSuccess?.();
      return;
    }

    mutate(data);
    console.log(`Cliente cadastrado com sucesso!`);
    onSuccess?.();
  };

  return {
    register,
    handleSubmit,
    errors,
    submitForm
  };
}
