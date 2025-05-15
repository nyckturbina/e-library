package com.unp.biblioteca.virtual.Validation;

import com.unp.bibliotecavirtual.model.Livro;

public interface LivroValidator {
    void validarCadastro(Livro livro);
    void validarAtualizacao(Livro livro);
    void validarExclusao(Livro livro);
    void validarBusca(Long idLivro);
}

