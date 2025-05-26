package com.unp.bibliotecavirtual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import static jakarta.persistence.GenerationType.*;

@Getter
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Setter
    private String nome;

    @Setter
    @Column(unique = true)
    private String email;

    @Setter
    private String senha;

    public Usuario() {
    }

    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public void setId(Long id) {
        if (this.id == null) {
            this.id = id;
        } else {
            throw new UnsupportedOperationException("ID não pode ser alterado");
        }
    }
}
