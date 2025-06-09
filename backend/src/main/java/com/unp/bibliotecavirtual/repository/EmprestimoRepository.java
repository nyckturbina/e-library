package com.unp.bibliotecavirtual.repository;

import com.unp.bibliotecavirtual.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.unp.bibliotecavirtual.model.Emprestimo;

import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByClienteIdAndDataDevolucaoIsNull(Long clienteId);

    List<Emprestimo> findByCliente(Cliente cliente);
}
