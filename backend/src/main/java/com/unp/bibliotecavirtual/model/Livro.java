package com.unp.bibliotecavirtual.model;

import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@NoArgsConstructor
@Entity
@ToString
@EqualsAndHashCode
public class Livro {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Setter
    @Column(unique = true)
    private String titulo;

    @Setter
    private String autor;

    @Setter
    private String genero;

    @Setter
    @Column(unique = true)
    private String isbn;

    @Setter
    private String sinopse;

    @Setter
    private Integer exemplaresDisponiveisEmEstoque;

    @Setter
    private Integer numeroPaginas;

    @Setter
    private Integer avaliacao;

    public Livro(String titulo, String autor, String genero, String isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.isbn = isbn;
    }

    public Livro(String titulo, String autor, String genero, String isbn, String sinopse, Integer exemplaresDisponiveisEmEstoque) {
        this(titulo, autor, genero, isbn);
        this.sinopse = sinopse;
        this.exemplaresDisponiveisEmEstoque = exemplaresDisponiveisEmEstoque;
    }

    public Livro(String titulo, String autor, String genero, String isbn, String sinopse, Integer exemplaresDisponiveisEmEstoque, Integer avaliacao) {
        this(titulo, autor, genero, isbn);
        this.sinopse = sinopse;
        this.exemplaresDisponiveisEmEstoque = exemplaresDisponiveisEmEstoque;
        this.avaliacao = avaliacao;
    }

    public Livro(String titulo, String autor, String genero, String isbn, String sinopse, Integer exemplaresDisponiveisEmEstoque, Integer numeroPaginas, Integer avaliacao) {
        this(titulo, autor, genero, isbn, sinopse, exemplaresDisponiveisEmEstoque);
        this.exemplaresDisponiveisEmEstoque = exemplaresDisponiveisEmEstoque;
        this.numeroPaginas = numeroPaginas;
        this.avaliacao = avaliacao;
    }

//    public static void setId(long id) {
//        Livro.id = id;
//    }
//
//    public static void setExemplarForadeEstoque(int exemplarForadeEstoque) {
//        Livro.exemplarForadeEstoque = exemplarForadeEstoque;
//    }
//
//        return exemplarForadeEstoque;
//    }
}

