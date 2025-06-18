import { updateBook } from "@/service/livro-consumer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "@/models/book";
import { FormLivroSchema, RequestLivroType } from "@/models/livro-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface EditBookProps {
  book: Book;
  onSuccess?: () => void;
}

export default function EditBookForm({ book, onSuccess }: EditBookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RequestLivroType>({
    resolver: zodResolver(FormLivroSchema),
    defaultValues: {
      titulo: book.titulo,
      autor: book.autor,
      sinopse: book.sinopse,
      genero: book.genero ?? "",
      isbn: book.isbn,
      quantidade: book.quantidadeTotal,
      numeroPaginas: (book as any).numeroPaginas ?? 1 // fallback para 1 se não existir
    }
  });

  const submit = (updatedBook: RequestLivroType) => {
    updateBook(book.id, updatedBook);
    if (onSuccess) onSuccess();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} id="create-livro-form">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="titulo">Título</Label>
            <Input id="titulo" {...register("titulo")} />
            {errors.titulo && (
              <p className="text-red-500 mb-2">{errors.titulo.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="autor">Autor</Label>
            <Input id="autor" {...register("autor")} />
            {errors.autor && (
              <p className="text-red-500 mb-2">{errors.autor.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="sinopse">Sinopse</Label>
            <Textarea id="sinopse" {...register("sinopse")} />
            {errors.sinopse && (
              <p className="text-red-500 mb-2">{errors.sinopse.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="genero">Gênero</Label>
            <Input id="genero" {...register("genero")} />
            {errors.genero && (
              <p className="text-red-500 mb-2">{errors.genero.message}</p>
            )}
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <Label htmlFor="isbn" className="text-right">
              ISBN
            </Label>
            <Input id="isbn" className="col-span-3" {...register("isbn")} />
            {errors.isbn && (
              <p className="text-red-500 col-span-5 mb-2">
                {errors.isbn.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <Label htmlFor="quantidade" className="text-right">
              Quantidade
            </Label>
            <Input
              id="quantidade"
              type="number"
              {...register("quantidade", {
                valueAsNumber: true
              })}
            />
            {errors.quantidade && (
              <p className="text-red-500 col-span-5 mb-2">
                {errors.quantidade.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <Label htmlFor="numeroPaginas" className="text-right">
              Número de páginas
            </Label>
            <Input
              id="numeroPaginas"
              type="number"
              className="col-span-3"
              {...register("numeroPaginas", { valueAsNumber: true })}
            />
            {errors.numeroPaginas && (
              <p className="text-red-500 col-span-5 mb-2">
                {errors.numeroPaginas.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
