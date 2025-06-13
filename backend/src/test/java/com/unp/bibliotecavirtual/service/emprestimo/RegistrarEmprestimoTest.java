package com.unp.bibliotecavirtual.service.emprestimo;

import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.exceptions.LivroNaoDisponivelException;
import com.unp.bibliotecavirtual.exceptions.LivroNotFoundException;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.model.Emprestimo;
import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.repository.ClienteRepository;
import com.unp.bibliotecavirtual.repository.EmprestimoRepository;
import com.unp.bibliotecavirtual.repository.LivroRepository;
import com.unp.bibliotecavirtual.service.EmprestimoService;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.unp.bibliotecavirtual.service.CalcularPrazoEmprestimo.calcularPrazo;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RegistrarEmprestimoTest {
    @InjectMocks
    EmprestimoService emprestimoService;

    @Mock
    EmprestimoRepository emprestimoRepository;

    @Mock
    ClienteRepository clienteRepository;

    @Mock
    LivroRepository livroRepository;

    Cliente cliente;
    Livro livro;
    Emprestimo emprestimo;

    @BeforeEach
    void setUp() {
        cliente = new Cliente("João da Silva", "12345678909", "joao.silva@example.com", "senhaSegura123");
        livro = new Livro("O pequeno principe", "Alguém Aleatório", "Reflexão Intensa", "1234567890", "Esse livro é massa demais", 10, 89, 10L);

        final int PRAZO = calcularPrazo(livro);

        final LocalDate NOW = LocalDate.now();
        final LocalDate DATA_DEVOLUCAO = LocalDate.now().plusDays(PRAZO);

        emprestimo = new Emprestimo(cliente, livro, NOW, DATA_DEVOLUCAO);


    }

    @Test
    void registrarEmprestimo_DeveRegistrarNovoEmprestimoCasoDadosValidos() throws LivroNotFoundException, ClienteNaoEncontrado, LivroNaoDisponivelException {
        when(livroRepository.findById(anyLong())).thenReturn(Optional.of(livro));
        when(clienteRepository.findById(anyLong())).thenReturn(Optional.of(cliente));
        when(emprestimoRepository.save(any(Emprestimo.class))).thenReturn(emprestimo);
        when(livroRepository.save(any(Livro.class))).thenReturn(livro);

        Emprestimo emprestimoRegistrado = emprestimoService.registrarEmprestimo(1L, 1L);
        Assertions.assertEquals(emprestimo, emprestimoRegistrado);
        Assertions.assertEquals(livro.getExemplaresDisponiveisEmEstoque(), emprestimoRegistrado.getLivro().getExemplaresDisponiveisEmEstoque());
    }

    @Test
    void registrarEmprestimo_DeveLancarExcecaoCasoLivroNaoExista() {
        when(livroRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(LivroNotFoundException.class, () -> {
            emprestimoService.registrarEmprestimo(1L, 1L);
        });

    }

    @Test
    void registrarEmprestimo_DeveLancarExcecaoCasoClienteNaoExista() {
        Livro livro = new Livro();
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));
        when(clienteRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ClienteNaoEncontrado.class, () -> {
            emprestimoService.registrarEmprestimo(1L, 1L);
        });

        verify(livroRepository).findById(1L);
        verify(clienteRepository).findById(1L);

    }

    @Test
    void registrarEmprestimo_DeveLancarExcecaoCasoLivroEstejaIndisponivelNoEstoque() {

        livro.setExemplaresDisponiveisEmEstoque(0);
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        assertThrows(LivroNaoDisponivelException.class, () -> {
            emprestimoService.registrarEmprestimo(1L, 1L);

        });
        verify(livroRepository).findById(1L);
        verify(clienteRepository).findById(1L);

    }


    @SneakyThrows
    @Test
    void registrarEmprestimo_VerificaSeEmprestimoFoiRegistradoCorretamente() {

        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        Emprestimo emprestimo = emprestimoService.registrarEmprestimo(1L, 1L);

        assertNotNull(emprestimo);
        assertEquals(cliente, emprestimo.getCliente());
        assertEquals(livro, emprestimo.getLivro());
        assertEquals(LocalDate.now(), emprestimo.getDataEmprestimo());
        assertTrue(emprestimo.getPrazoDevolucao().isAfter(LocalDate.now()));
        verify(emprestimoRepository).save(any(Emprestimo.class));

    }


    @SneakyThrows
    @Test
    void registrarEmprestimo_VerificaSeQuantidadeDeExemplaresDisponiveisEmEstoqueFoiAlteradaAoRegistrarEmprestimo() {

        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        emprestimoService.registrarEmprestimo(1L, 1L);

        assertEquals(emprestimo.getLivro().getExemplaresDisponiveisEmEstoque(), livro.getExemplaresDisponiveisEmEstoque());
        verify(livroRepository).save(livro);

    }
}

