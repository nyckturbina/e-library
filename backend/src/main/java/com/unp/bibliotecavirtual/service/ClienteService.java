package com.unp.bibliotecavirtual.service;

import java.util.List;

import com.unp.bibliotecavirtual.exceptions.ClienteExistenteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    /**
     * TO-DO
     * [] Verificar se cliente já existe (por cpf e email)
     * [] Lançar exceção caso cliente exista
     */
    public Cliente cadastrar(Cliente cliente) throws ClienteExistenteException {
        if (clienteRepository.existsByCpf(cliente.getCpf())) throw new ClienteExistenteException();
        return clienteRepository.save(cliente);
    }

    public List<Cliente> buscarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    public Cliente editar(Long id, Cliente clienteAtualizado) {
        Cliente cliente = buscarPorId(id);

        cliente.setNome(clienteAtualizado.getNome());
        cliente.setCpf(clienteAtualizado.getCpf());
        cliente.setEmail(clienteAtualizado.getEmail());
        cliente.setSenha(clienteAtualizado.getSenha());

        return clienteRepository.save(cliente);
    }

    public void deletar(Long id) {
        Cliente cliente = buscarPorId(id);
        clienteRepository.delete(cliente);
    }
}

