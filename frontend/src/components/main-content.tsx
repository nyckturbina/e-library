import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookCard from "@/components/book-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Book } from "@/models/book";

export default function MainContent() {
  const books: Book[] = [
    {
      id: 1,
      capa: "url-da-capa.jpg",
      titulo: "O Hobbit",
      autor: "J.R.R. Tolkien",
      avaliacao: 4.5,
    },
    {
      id: 2,
      capa: "url-da-capa-2.jpg",
      titulo: "Dom Quixote",
      autor: "Miguel de Cervantes",
    },
    {
      id: 3,
      capa: "https://exemplo.com/capa-1984.jpg",
      titulo: "1984",
      autor: "George Orwell",
    },
    {
      id: 4,
      capa: "https://exemplo.com/capa-harry-potter.jpg",
      titulo: "Harry Potter e a Pedra Filosofal",
      autor: "J.K. Rowling",
      avaliacao: 4.9,
    },
    {
      id: 5,
      capa: "https://exemplo.com/capa-lolita.jpg",
      titulo: "Lolita",
      autor: "Vladimir Nabokov",
      avaliacao: 2.3,
    },
    {
      id: 6,
      capa: "https://exemplo.com/capa-dom-casmurro.jpg",
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      avaliacao: 5,
    },
    {
      id: 7,
      capa: "url-invalida.jpg",
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      avaliacao: 4.7,
    },
    {
      id: 8,
      capa: "https://exemplo.com/capa-arte-guerra.jpg",
      titulo: "A Arte da Guerra: Os Treze Capítulos Originais",
      autor: "Sun Tzu (Tradução: João da Silva)",
      avaliacao: 3.8,
    },
  ];

  return (
    <div className="bg-white-smoke">
      <aside></aside>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Todos os livros</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center flex-wrap gap-3">
            {books.map((book) => (
              <BookCard
                key={book.id}
                capa={book.autor}
                titulo={book.titulo}
                autor={book.autor}
                avaliacao={book.avaliacao}
              />
            ))}
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
