package com.unp.bibliotecavirtual.exceptions;

public class LivroNotFoundException extends Exception {
    public LivroNotFoundException() {
        super("Ocorreu uma exceção: Livro não encontrado.");
    }

    public LivroNotFoundException(String message) {
        super(message);
    }
}
