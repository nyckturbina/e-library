package com.unp.bibliotecavirtual.exceptions.auth;

public class SenhaIncorreta extends Exception {
    public SenhaIncorreta() {
        super("Credenciais não coincidem");
    }

    public SenhaIncorreta(String message) {
        super(message);
    }
}
