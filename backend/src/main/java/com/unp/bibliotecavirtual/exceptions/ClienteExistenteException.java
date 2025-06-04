package com.unp.bibliotecavirtual.exceptions;

public class ClienteExistenteException extends Exception {
    public ClienteExistenteException() {
        super("Não foi possível cadastrar usuário, pois cliente já existe no banco de dados");
    }

    public ClienteExistenteException(String message) {
        super(message);
    }
}
