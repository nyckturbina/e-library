package com.unp.bibliotecavirtual.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@SQLDelete(sql = "UPDATE cliente SET is_deleted = true WHERE id = ?")
@SQLRestriction(value = "is_deleted = false")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Setter
    @Column(nullable = false)
    private String nome;

    @NonNull
    @Setter
    @Column(unique = true)
    private String cpf;

    @NonNull
    @Setter
    @Column(nullable = false, unique = true)
    private String email;

    @NonNull
    @Setter
    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private Boolean isDeleted = false;

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public void avaliarLivro(Livro livro, Integer like) {
        // lógica de avaliação
    }
}
