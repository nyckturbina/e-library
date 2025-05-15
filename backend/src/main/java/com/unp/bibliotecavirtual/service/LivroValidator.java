package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.model.Livro;

public class LivroValidator {
    public static void validarCadastro(Livro livro) {

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
