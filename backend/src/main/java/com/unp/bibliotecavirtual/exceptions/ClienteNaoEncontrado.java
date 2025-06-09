package com.unp.bibliotecavirtual.exceptions;

public class ClienteNaoEncontrado extends Exception {
    public ClienteNaoEncontrado() {
        super("Ocorreu uma exceção: Usuário não encontrado"); 
    }

    public ClienteNaoEncontrado(String mensagem){
        super(mensagem);
    }
}