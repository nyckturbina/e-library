package com.unp.bibliotecavirtual.service.strategy;

import com.unp.bibliotecavirtual.model.Livro;

public interface ValidationStrategy {
    void validar(Livro livro);
}
