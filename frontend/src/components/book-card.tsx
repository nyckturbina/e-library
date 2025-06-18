import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StarRating } from "./star-rating";

interface BookCardProps {
  capa: string;
  titulo: string;
  autor: string;
  avaliacao?: number;
  genero?: string;
}

export default function BookCard({
  capa,
  titulo,
  autor,
  avaliacao = 0,
  genero
}: BookCardProps) {
  return (
    <div>
      <Card className="w-64">
        <CardHeader>
          <img
            src={"https://placehold.jp/200x250.png"}
            alt={`Capa do livro: ${titulo}`}
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{titulo}</CardTitle>
          <p>Autor: {autor}</p>
          <div className="flex items-center gap-2">
            <span>Avaliação:</span>
            <StarRating rating={avaliacao} />
            <span className="text-xs text-slate-500">({avaliacao.toFixed(1)})</span>
          </div>
          <p>Gênero: {genero}</p>
        </CardContent>
      </Card>
    </div>
  );
}
