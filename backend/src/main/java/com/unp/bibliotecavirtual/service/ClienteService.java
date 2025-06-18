package com.unp.bibliotecavirtual.service;

import java.util.List;
import java.util.Optional;

import com.unp.bibliotecavirtual.exceptions.ClienteExistenteException;
import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
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
        Optional<Cliente> clienteExistente = clienteRepository.findByCpfAndIsDeleted(cliente.getCpf(), true);
        if (clienteExistente.isPresent()) {
            Cliente reativado = clienteExistente.get();
            reativado.setNome(cliente.getNome());
            reativado.setEmail(cliente.getEmail());
            reativado.setSenha(cliente.getSenha());
            reativado.setIsDeleted(false);
            return clienteRepository.save(reativado);
        }
        if (clienteRepository.existsByCpf(cliente.getCpf())) throw new ClienteExistenteException();
        return clienteRepository.save(cliente);
    }

    public List<Cliente> buscarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorCPF(String cpf) throws ClienteNaoEncontrado {
        return clienteRepository.findByCpf(cpf)
                .orElseThrow(ClienteNaoEncontrado::new);
    }

    public Cliente buscarPorId(Long id) throws ClienteNaoEncontrado {
        return clienteRepository.findById(id)
                .orElseThrow(ClienteNaoEncontrado::new);
    }

    public Cliente editar(Long id, Cliente clienteAtualizado) throws ClienteNaoEncontrado {
        Cliente cliente = buscarPorId(id);

        cliente.setNome(clienteAtualizado.getNome());
        cliente.setCpf(clienteAtualizado.getCpf());
        cliente.setEmail(clienteAtualizado.getEmail());
        cliente.setSenha(clienteAtualizado.getSenha());

        return clienteRepository.save(cliente);
    }

    public void deletar(Long id) throws ClienteNaoEncontrado {
        Cliente cliente = buscarPorId(id);
        clienteRepository.delete(cliente);
    }
}

