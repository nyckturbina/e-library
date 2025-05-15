package com.unp.bibliotecavirtual.service.strategy;

import com.unp.bibliotecavirtual.model.Livro;
import org.springframework.stereotype.Component;

@Component
public class AutorValidationImp implements ValidationStrategy {
    @Override
    public void validar(Livro livro) {
        if (livro.getAutor() == null || livro.getAutor().isBlank()) {
            throw new IllegalArgumentException("O autor é obrigatório.");
        }
    }
}
