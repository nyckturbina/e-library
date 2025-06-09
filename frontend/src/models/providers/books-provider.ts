import { Book } from "../book";

export const books: Book[] = [
  {
    id: 1,
    capa: "url-da-capa.jpg",
    titulo: "O Hobbit",
    autor: "J.R.R. Tolkien",
    sinopse:
      "Um hobbit tranquilo é arrastado para uma aventura épica para recuperar um tesouro guardado por um dragão.",
    isbn: "9788578277108",
    avaliacao: 4.5,
    quantidadeTotal: 10
  },
  {
    id: 2,
    capa: "url-da-capa-2.jpg",
    titulo: "Dom Quixote",
    autor: "Miguel de Cervantes",
    sinopse:
      "As aventuras de um fidalgo que enlouquece após ler muitos romances de cavalaria e decide se tornar um cavaleiro andante.",
    isbn: "9788535909285",
    quantidadeTotal: 15
  },
  {
    id: 3,
    capa: "https://exemplo.com/capa-1984.jpg",
    titulo: "1984",
    autor: "George Orwell",
    sinopse:
      "Uma distopia sombria sobre um regime totalitário onde o governo controla todos os aspectos da vida, incluindo o pensamento.",
    isbn: "9788522106169",
    quantidadeTotal: 12
  },
  {
    id: 4,
    capa: "https://exemplo.com/capa-harry-potter.jpg",
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling",
    sinopse:
      "Um menino órfão descobre que é um bruxo e começa sua jornada na Escola de Magia e Bruxaria de Hogwarts.",
    isbn: "9788532511010",
    avaliacao: 4.9,
    quantidadeTotal: 20
  },
  {
    id: 5,
    capa: "https://exemplo.com/capa-lolita.jpg",
    titulo: "Lolita",
    autor: "Vladimir Nabokov",
    sinopse:
      "Controverso romance sobre um professor de meia-idade obcecado por uma menina de doze anos.",
    isbn: "9788503005487",
    avaliacao: 2.3,
    quantidadeTotal: 8
  },
  {
    id: 6,
    capa: "https://exemplo.com/capa-dom-casmurro.jpg",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    sinopse:
      "Clássico da literatura brasileira que explora ciúme e ambiguidade no relacionamento entre Bentinho e Capitu.",
    isbn: "9788525409533",
    avaliacao: 5,
    quantidadeTotal: 18
  },
  {
    id: 7,
    capa: "url-invalida.jpg",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    sinopse:
      "Uma fábula poética sobre um príncipe que viaja de planeta em planeta aprendendo lições de vida.",
    isbn: "9788572326292",
    avaliacao: 4.7,
    quantidadeTotal: 25
  },
  {
    id: 8,
    capa: "https://exemplo.com/capa-arte-guerra.jpg",
    titulo: "A Arte da Guerra: Os Treze Capítulos Originais",
    autor: "Sun Tzu (Tradução: João da Silva)",
    sinopse:
      "Tratado militar clássico chinês que continua influenciando estratégias militares, de negócios e esportivas.",
    isbn: "9788575422677",
    avaliacao: 3.8,
    quantidadeTotal: 14
  }
];
