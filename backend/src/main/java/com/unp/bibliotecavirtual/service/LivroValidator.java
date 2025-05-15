package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.model.Livro;

public class LivroValidator {
    public static void validarCadastro(Livro livro) {
        if (livro == null) {
            throw new NullPointerException("Livro não pode ser nulo");
        }

        if (livro.getTitulo() == null || livro.getTitulo().isBlank()) {
            throw new IllegalArgumentException("O título é obrigatório.");
        }

        if (livro.getAutor() == null || livro.getAutor().isBlank()) {
            throw new IllegalArgumentException("O autor é obrigatório.");
        }

        if (livro.getQuantidadeTotal() == null || livro.getQuantidadeTotal() <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que 0.");
        }
    }

    public static void validarIdNulo(Livro livro) {
        if (livro.getId() == null) {
            throw new IllegalArgumentException("O ID é obrigatório.");
        }
    }

    public static void validarBuscaPorId(Long idLivro) {
        if (idLivro == null || idLivro <= 0) {
            throw new IllegalArgumentException("ID inválido para busca.");
        }
    }
}
