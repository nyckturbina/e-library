package com.unp.bibliotecavirtual.exceptions;

public class EmprestimoNotFoundException extends Exception {
    public EmprestimoNotFoundException() {
        super("Ocorreu uma exceção: Empréstimo não encontrado");
    }

    public EmprestimoNotFoundException(String message) {
        super(message);
    }
}
