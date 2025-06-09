package com.unp.bibliotecavirtual.service.emprestimo.utils;

import com.unp.bibliotecavirtual.model.*;

import java.time.LocalDate;
import java.util.List;

public class EmprestimoListProvider {
    private EmprestimoListProvider() {
    }

    public static List<Emprestimo> getEmprestimosTeste() {
        // Criando clientes para os empréstimos
        Cliente cliente1 = new Cliente("João Silva", "12345678901", "joao@email.com", "senha123");
        Cliente cliente2 = new Cliente("Maria Souza", "98765432101", "maria@email.com", "senha456");

        // Criando livros para os empréstimos
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
                "O Hobbit",
                "J.R.R. Tolkien",
                "Fantasia",
                "978-8533613379",
                "A aventura de Bilbo Bolseiro em uma jornada para recuperar um tesouro guardado por um dragão",
                12,
                336,
                4
        );

        // Criando empréstimos
        Emprestimo emprestimo1 = new Emprestimo(
                cliente1,
                livro1,
                LocalDate.now().minusDays(5),
                LocalDate.now().plusDays(5)
        );
        emprestimo1.setId(1L);

        Emprestimo emprestimo2 = new Emprestimo(
                cliente1,
                livro2,
                LocalDate.now().minusDays(2),
                LocalDate.now().plusDays(8)
        );
        emprestimo2.setId(2L);

        Emprestimo emprestimo3 = new Emprestimo(
                cliente2,
                livro3,
                LocalDate.now().minusDays(10),
                LocalDate.now().minusDays(2) // Empréstimo atrasado
        );
        emprestimo3.setId(3L);
        emprestimo3.setMulta(new Multa(16.0)); // 8 dias de atraso * 2.0 por dia

        Emprestimo emprestimo4 = new Emprestimo(
                cliente2,
                livro1,
                LocalDate.now(),
                LocalDate.now().plusDays(10)
        );
        emprestimo4.setId(4L);

        return List.of(emprestimo1, emprestimo2, emprestimo3, emprestimo4);
    }
}