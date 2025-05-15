package com.unp.biblioteca.virtual.Validation.Impl;

import com.unp.biblioteca.virtual.Modelo.Livro;
import com.unp.biblioteca.virtual.validation.LivroValidator;
import org.springframework.stereotype.Component;

@Component
public class LivroValidatorImpl implements LivroValidator {
    @Override
    public void validarCadastro(Livro livro) {
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

    @Override
    public void validarAtualizacao(Livro livro) {
        if (livro.getId() == null) {
            throw new IllegalArgumentException("O ID é obrigatório para atualização.");
        }
        validarCadastro(livro); // Reaproveita as validações
    }

    @Override
    public void validarExclusao(Livro livro) {
        if (livro.getId() == null) {
            throw new IllegalArgumentException("O ID é obrigatório para exclusão.");
        }
    }

    @Override
    public void validarBusca(Long idLivro) {
        if (idLivro == null || idLivro <= 0) {
            throw new IllegalArgumentException("ID inválido para busca.");
        }
    }
}
