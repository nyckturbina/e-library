package com.unp.bibliotecavirtual.service.emprestimo.utils;

import com.unp.bibliotecavirtual.model.Livro;

import java.util.List;

public class LivroListProvider {
    private LivroListProvider() {
    }

    public static List<Livro> getLivros() {
        Livro livro1 = new Livro(
                "Dom Casmurro",
                "Machado de Assis",
                "Romance",
                "978-8535902771",
                "Clássico da literatura brasileira que explora ciúme e ambiguidade através da narrativa de Bentinho",
                15,
                256,
                5
        );

        Livro livro2 = new Livro(
                "1984",
                "George Orwell",
                "Ficção Distópica",
                "978-0451524935",
                "Uma visão sombria de um futuro totalitário onde o governo controla todos os aspectos da vida",
                8,
                328,
                5
        );

        Livro livro3 = new Livro(
                "O Senhor dos Anéis: A Sociedade do Anel",
                "J.R.R. Tolkien",
                "Fantasia",
                "978-8533613379",
                "Primeiro volume da trilogia que segue a jornada de Frodo para destruir o Um Anel",
                12,
                464,
                7
        );

        Livro livro4 = new Livro(
                "Orgulho e Preconceito",
                "Jane Austen",
                "Romance",
                "978-8573264233",
                "História de Elizabeth Bennet e Mr. Darcy em uma crítica à sociedade inglesa do século XIX",
                10,
                424,
                6
        );

        Livro livro5 = new Livro(
                "Cem Anos de Solidão",
                "Gabriel García Márquez",
                "Realismo Mágico",
                "978-8501010674",
                "A saga da família Buendía no vilarejo fictício de Macondo",
                9,
                432,
                4
        );

        Livro livro6 = new Livro(
                "O Pequeno Príncipe",
                "Antoine de Saint-Exupéry",
                "Fábula",
                "978-8595081512",
                "A história filosófica de um príncipe que viaja por diferentes planetas",
                20,
                96,
                10
        );

        Livro livro7 = new Livro(
                "Harry Potter e a Pedra Filosofal",
                "J.K. Rowling",
                "Fantasia",
                "978-8532530783",
                "Primeiro livro da série que apresenta o mundo mágico de Harry Potter",
                18,
                264,
                8
        );

        Livro livro8 = new Livro(
                "A Revolução dos Bichos",
                "George Orwell",
                "Sátira Política",
                "978-8535909558",
                "Alegoria sobre o poder através da revolta dos animais em uma fazenda",
                14,
                152,
                6
        );

        Livro livro9 = new Livro(
                "Crime e Castigo",
                "Fiódor Dostoiévski",
                "Romance Psicológico",
                "978-8525432137",
                "A história de Raskólnikov e seu crime que o leva a um tormento psicológico",
                7,
                608,
                3
        );

        Livro livro10 = new Livro(
                "O Alquimista",
                "Paulo Coelho",
                "Ficção Inspiracional",
                "978-8576653722",
                "A jornada de Santiago em busca de seu tesouro pessoal e lições de vida",
                16,
                208,
                9
        );

        return List.of(
                livro1,
                livro2,
                livro3,
                livro4,
                livro5,
                livro6,
                livro7,
                livro8,
                livro9,
                livro10
        );
    }
}