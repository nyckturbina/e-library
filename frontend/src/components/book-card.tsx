import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface BookCardProps {
  capa: string;
  titulo: string;
  autor: string;
  avaliacao?: number;
}

export default function BookCard({
  capa,
  titulo,
  autor,
  avaliacao = 0,
}: BookCardProps) {
  return (
    <div>
      <Card className="w-45">
        <CardHeader>
          <img
            src={"https://placehold.jp/200x250.png"}
            alt={`Capa do livro: ${titulo}`}
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{titulo}</CardTitle>
          <p>Autor: {autor}</p>
          <p>Avaliação: {avaliacao.toFixed(1)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
