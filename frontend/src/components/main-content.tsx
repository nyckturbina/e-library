"use client";

import { useBooks } from "@/api-consumer/livro-consumer";
import BookCard from "@/components/book-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { books as mockBooks } from "@/models/books-provider";

export default function MainContent() {
  let booksCards;

  const { data, isLoading, isFetching, error } = useBooks();

  if (data) {
    booksCards = data.map(book => (
      <BookCard
        key={book.id}
        capa={book.capa}
        titulo={book.titulo}
        autor={book.autor}
      />
    ));
  }

  if (isLoading && isFetching) {
    return (booksCards = (
      <div className="text-center my-40">Carregando livros...</div>
    ));
  }

  if (error) {
    booksCards = mockBooks.map(book => (
      <BookCard
        key={book.id}
        capa={book.capa}
        titulo={book.titulo}
        autor={book.autor}
        avaliacao={book.avaliacao}
      />
    ));
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <aside></aside>
      <main>
        <Card>
          <CardHeader>
            <CardTitle className="text-charcoal-blue">
              Todos os livros
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center flex-wrap gap-3">
            {booksCards}
          </CardContent>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      </main>
    </div>
  );
}
