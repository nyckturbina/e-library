package com.unp.bibliotecavirtual.repository;

import com.unp.bibliotecavirtual.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}
