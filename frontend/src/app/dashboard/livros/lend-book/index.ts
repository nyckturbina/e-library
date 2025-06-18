import { Book } from "@/models/book";
import {
  LendBookFormType,
  lendBookSchema
} from "@/models/zod-schemas/lend-book-schema";
import { lendLoan } from "@/service/loan/lend-loan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface useLendBookDialogProps {
  book: Book;
}
export default function useLendBookDialog({ book }: useLendBookDialogProps) {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState<boolean>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LendBookFormType>({
    resolver: zodResolver(lendBookSchema),
    defaultValues: {
      bookIsbn: book.isbn
    }
  });

  const handleFormSubmit = async (data: LendBookFormType) => {
    try {
      await lendLoan(data.clientCpf, data.bookIsbn);
      queryClient.invalidateQueries({ queryKey: ["books"] }); // Refaz a busca dos livros
    } catch (error) {
      console.error("Erro ao solicitar empréstimo:", error);
    }
    reset();
    setOpen(false);
  };

  return {
    isOpen,
    setOpen,
    register,
    handleSubmit,
    errors,
    reset,
    handleFormSubmit
  };
}
