package com.unp.bibliotecavirtual.service.strategy;

import com.unp.bibliotecavirtual.model.Livro;
import org.springframework.stereotype.Component;

@Component
public class ValidationTituloImp implements ValidationStrategy {
    @Override
    public void validar(Livro livro) {
        if (livro.getTitulo() == null) {
            throw new NullPointerException("Título do livro não pode ser nulo!");
        }

        if (livro.getTitulo().isBlank()) {
            throw new IllegalArgumentException("O título é obrigatório.");
        }
    }
}
