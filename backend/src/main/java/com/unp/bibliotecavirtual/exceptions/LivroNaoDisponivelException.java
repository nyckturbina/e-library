package com.unp.bibliotecavirtual.exceptions;

public class LivroNaoDisponivelException extends Exception {
    public LivroNaoDisponivelException() {
        super("Ocorreu uma exceção: Livro não disponível para empréstimo.");
    }

    public LivroNaoDisponivelException(String message) {
        super(message);
    }
}
