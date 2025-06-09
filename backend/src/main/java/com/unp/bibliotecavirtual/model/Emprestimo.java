package com.unp.bibliotecavirtual.model;

import java.time.LocalDate;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;

    @NonNull
    private LocalDate dataEmprestimo;

    @NonNull
    private LocalDate dataDevolucao;

    @Embedded
    private Multa multa;

    @NonNull
    private boolean isAtivo = true;
}
