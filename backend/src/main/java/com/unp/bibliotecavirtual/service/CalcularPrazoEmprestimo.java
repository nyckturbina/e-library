package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.model.Livro;

public class CalcularPrazoEmprestimo {
    private CalcularPrazoEmprestimo() {
    }

    public static int calcularPrazo(Livro livro) {
        int numeroPaginas = livro.getNumeroPaginas();
        return (numeroPaginas / 100) + 7;
    }
}
