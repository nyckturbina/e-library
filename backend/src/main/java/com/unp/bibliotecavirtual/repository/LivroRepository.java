package com.unp.bibliotecavirtual.repository;

import com.unp.bibliotecavirtual.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    Optional<Livro> findByIsbn(String isbn);
    Optional<Livro> findByIsbnAndIsDeleted(String isbn, Boolean isDeleted);
}
