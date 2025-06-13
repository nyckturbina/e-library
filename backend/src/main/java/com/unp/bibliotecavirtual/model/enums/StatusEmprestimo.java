package com.unp.bibliotecavirtual.model.enums;

public enum StatusEmprestimo {
    ATIVO("Ativo"),
    DEVOLVIDO("Devolvido"),
    ATRASADO("Atrasado");

    private final String value;

    StatusEmprestimo(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
