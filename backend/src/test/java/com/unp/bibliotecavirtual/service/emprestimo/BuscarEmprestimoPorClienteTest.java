package com.unp.bibliotecavirtual.service.emprestimo;

import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.model.Emprestimo;
import com.unp.bibliotecavirtual.repository.ClienteRepository;
import com.unp.bibliotecavirtual.repository.EmprestimoRepository;
import com.unp.bibliotecavirtual.service.EmprestimoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static com.unp.bibliotecavirtual.service.emprestimo.utils.EmprestimoListProvider.getEmprestimosTeste;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BuscarEmprestimoPorClienteTest {
    @InjectMocks
    EmprestimoService emprestimoService;

    @Mock
    EmprestimoRepository emprestimoRepository;

    @Mock
    ClienteRepository clienteRepository;


    Cliente cliente;
    List<Emprestimo> emprestimos;

    @BeforeEach
    void setUp() throws ClienteNaoEncontrado {
        cliente = getEmprestimosTeste().getFirst().getCliente();
        emprestimos = List.of(
                getEmprestimosTeste().getFirst(),
                getEmprestimosTeste().get(1)
        );

        when(clienteRepository.findById(anyLong())).thenReturn(Optional.of(cliente));
        when(emprestimoService.buscarEmprestimosPorCliente(anyLong())).thenReturn(emprestimos);
    }

    @Test
    void buscaEmprestimosCasoClienteExista() throws ClienteNaoEncontrado {
        List<Emprestimo> emprestimosBuscados = emprestimoService.buscarEmprestimosPorCliente(1L);
        assertEquals(emprestimos, emprestimosBuscados);
    @Test
    void deveLancarExcecaoCasoClienteNaoExista() {
        when(clienteRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(ClienteNaoEncontrado.class, () -> {
            emprestimoService.buscarEmprestimosPorCliente(99L);
        });
    }

//    @Test
//    void deveLancarExcecaoCasoClienteNaoExista() {
//    }
//
//    @Test
//    void deveRetornarListaVaziaCasoClienteNaoPossuaEmprestimos() {
//    }
}
