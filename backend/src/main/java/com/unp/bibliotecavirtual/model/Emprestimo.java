package com.unp.bibliotecavirtual.model;

import com.unp.bibliotecavirtual.model.enums.StatusEmprestimo;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

import static com.unp.bibliotecavirtual.model.enums.StatusEmprestimo.ATIVO;

@Entity
@Table(name = "emprestimos")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@SQLDelete(sql = "UPDATE emprestimos SET is_deleted = true WHERE id = ?")
@SQLRestriction(value = "is_deleted = false")
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
    private LocalDate prazoDevolucao;

    @Embedded
    private Multa multa;

    private StatusEmprestimo status = ATIVO;

    @Column(nullable = false)
    private Boolean isDeleted = false;
}
