package com.unp.bibliotecavirtual.service.strategy;

import com.unp.bibliotecavirtual.model.Livro;

public class QuantidadeValidationStrategy implements ValidationStrategy {
    @Override
    public void validar(Livro livro) {
        if (livro.getQuantidadeTotal() == null || livro.getQuantidadeTotal() < 0) {
            throw new IllegalArgumentException("A quantidade não pode ser negativa.");
        }
    }
}
