package com.unp.bibliotecavirtual.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import static jakarta.persistence.GenerationType.*;

@Getter
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
}
