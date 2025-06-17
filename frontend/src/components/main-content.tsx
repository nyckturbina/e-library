"use client";

import BookCard from "@/components/book-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { books as mockBooks } from "@/models/providers/books-provider";
import { useBooks } from "@/service/livro-consumer";
import { Book } from "@/models/book";

interface MainContentProps {
  searchType: string;
  searchTerm: string;
}

export default function MainContent({ searchType, searchTerm }: MainContentProps) {
  let booksCards;

  const { data, isLoading, isFetching, error } = useBooks();

  // Função de filtro
  function filterBooks(books: Book[]) {
    if (!searchTerm.trim()) return books;
    const term = searchTerm.toLowerCase();
    switch (searchType) {
      case "titulo":
        return books.filter(book => book.titulo?.toLowerCase().includes(term));
      case "autor":
        return books.filter(book => book.autor?.toLowerCase().includes(term));
      // Não existe 'genero' no Book, então filtra por sinopse como fallback
      case "genero":
        return books.filter(book => book.sinopse?.toLowerCase().includes(term));
      case "isbn":
        return books.filter(book => book.isbn?.toLowerCase().includes(term));
      default:
        return books;
    }
  }

  if (data) {
    const filtered = filterBooks(data);
    booksCards = filtered.map(book => (
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

          {/* <Pagination>
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
          </Pagination> */}
        </Card>
      </main>
    </div>
  );
}
