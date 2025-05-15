package com.unp.biblioteca.virtual.Validation;

import com.unp.biblioteca.virtual.Modelo.Livro;

public interface LivroValidator {
    void validarCadastro(Livro livro);
    void validarAtualizacao(Livro livro);
    void validarExclusao(Livro livro);
    void validarBusca(Long idLivro);
}

