package com.unp.bibliotecavirtual.repository;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import com.unp.bibliotecavirtual.model.Cliente;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email);

    boolean existsByCpf(String cpf);

    Optional<Cliente> findByCpf(String cpf);

    Optional<Cliente> findByCpfAndIsDeleted(String cpf, Boolean isDeleted);
}
