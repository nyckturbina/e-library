package com.unp.bibliotecavirtual.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
// Não sei como aplicar softdelete, apliquem e testem ~Caio
//@Table(name = "clientes")
//@SQLDelete(sql = "UPDATE clientes SET deleted = true WHERE id = ?")
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
    private boolean deleted = false;

    public void avaliarLivro(Livro livro, Integer like) {
        // lógica de avaliação
    }
}
