package com.unp.biblioteca.virtual.Repository;

import com.unp.biblioteca.virtual.Modelo.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    // Pode adicionar buscas customizadas aqui se precisar, como:
    // List<Livro> findByTituloContainingIgnoreCase(String titulo);
}
