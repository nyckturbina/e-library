import { Book } from "@/models/book";
import {
  LendBookFormType,
  lendBookSchema
} from "@/models/zod-schemas/lend-book-schema";
import { getBookByIsbn } from "@/service/book/get-book-by-isbn";
import { lendLoan } from "@/service/loan/lend-loan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface useLendBookDialogProps {
  book: Book;
}
export default function useLendBookDialog({ book }: useLendBookDialogProps) {
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

  const handleFormSubmit = (data: LendBookFormType) => {
    try {
      lendLoan(data.clientCpf, data.bookIsbn);
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
