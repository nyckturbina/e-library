package com.unp.bibliotecavirtual.service.strategy;

import com.unp.bibliotecavirtual.model.Livro;
import org.springframework.stereotype.Component;

@Component
public class ValidationNuloImp implements ValidationStrategy {
    @Override
    public void validar(Livro livro) {
        if (livro == null) {
            throw new NullPointerException("Livro não pode ser nulo");
        }
    }
}
