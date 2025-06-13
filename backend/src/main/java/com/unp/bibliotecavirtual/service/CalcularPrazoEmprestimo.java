package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.model.Livro;

import java.util.Optional;

public class CalcularPrazoEmprestimo {
    private CalcularPrazoEmprestimo() {
    }

    public static int calcularPrazo(Livro livro) {
        int numeroPaginas = Optional.ofNullable(livro.getNumeroPaginas()).orElseThrow(() -> new RuntimeException("números de paginas é nulo"));
        return (numeroPaginas / 100) + 7;
    }
}
