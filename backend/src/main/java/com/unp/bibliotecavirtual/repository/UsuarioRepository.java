package com.unp.bibliotecavirtual.repository;

import com.unp.bibliotecavirtual.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
