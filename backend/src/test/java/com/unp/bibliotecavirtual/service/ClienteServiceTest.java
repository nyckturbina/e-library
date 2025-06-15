package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveRetornarClienteQuandoCPFExistir() throws ClienteNaoEncontrado {
        String cpf = "123.456.789-00";
        Cliente cliente = new Cliente();
        cliente.setCpf(cpf);

        when(clienteRepository.findByCpf(cpf)).thenReturn(Optional.of(cliente));

        Cliente resultado = clienteService.buscarPorCPF(cpf);

        assertNotNull(resultado);
        assertEquals(cpf, resultado.getCpf());
        verify(clienteRepository).findByCpf(cpf);
    }

    @Test
    void deveLancarExcecaoQuandoCPFNaoExistir() {
        String cpf = "000.000.000-00";
        when(clienteRepository.findByCpf(cpf)).thenReturn(Optional.empty());

        assertThrows(ClienteNaoEncontrado.class, () -> clienteService.buscarPorCPF(cpf));
        verify(clienteRepository).findByCpf(cpf);
    }
}
