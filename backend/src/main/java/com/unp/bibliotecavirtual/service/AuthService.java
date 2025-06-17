package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.exceptions.auth.SenhaIncorreta;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente efetuarLogin(String email, String senha) throws SenhaIncorreta {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(ClienteNaoEncontrado::new);

        if (!cliente.getSenha().equals(senha)) {
            throw new SenhaIncorreta();
        }

        return cliente;
    }
}
