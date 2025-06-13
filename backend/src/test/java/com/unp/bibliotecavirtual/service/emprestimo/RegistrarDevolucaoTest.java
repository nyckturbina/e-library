package com.unp.bibliotecavirtual.service.emprestimo;

import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.exceptions.EmprestimoNotFoundException;
import com.unp.bibliotecavirtual.exceptions.LivroNaoDisponivelException;
import com.unp.bibliotecavirtual.exceptions.LivroNotFoundException;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.model.Emprestimo;
import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.model.enums.StatusEmprestimo;
import com.unp.bibliotecavirtual.repository.ClienteRepository;
import com.unp.bibliotecavirtual.repository.EmprestimoRepository;
import com.unp.bibliotecavirtual.repository.LivroRepository;
import com.unp.bibliotecavirtual.service.EmprestimoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.util.Optional;

import static com.unp.bibliotecavirtual.service.emprestimo.utils.ClienteListProvider.getClientes;
import static com.unp.bibliotecavirtual.service.emprestimo.utils.LivroListProvider.getLivros;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RegistrarDevolucaoTest {

    @InjectMocks
    EmprestimoService emprestimoService;

    @Mock
    EmprestimoRepository emprestimoRepository;

    @Mock
    LivroRepository livroRepository;

    @Mock
    ClienteRepository clienteRepository;


    Livro livro;

    Cliente cliente;

    Emprestimo emprestimo;

    Emprestimo emprestimoRegistrado;

    @BeforeEach
    void setUp() throws LivroNotFoundException, ClienteNaoEncontrado, LivroNaoDisponivelException {
        livro = getLivros().getFirst();
        cliente = getClientes().getFirst();
        emprestimo = new Emprestimo(cliente, livro, LocalDate.now(), LocalDate.now().plusDays(15));

        when(emprestimoRepository.findById(anyLong())).thenReturn(Optional.of(emprestimo));
        when(livroRepository.findById(anyLong())).thenReturn(Optional.of(livro));
        when(clienteRepository.findById(anyLong())).thenReturn(Optional.of(cliente));

        ReflectionTestUtils.setField(livro, "id", 1L);
        ReflectionTestUtils.setField(cliente, "id", 1L);
        ReflectionTestUtils.setField(emprestimo, "id", 1L);

        // Um emprestimo deve ser registrado antes de testar quaisquer devoluções
        emprestimoRegistrado = emprestimoService.registrarEmprestimo(
                livro.getId(),
                cliente.getId()
        );

        ReflectionTestUtils.setField(emprestimoRegistrado, "id", 1L);
    }

    @Test
    void deveRegistrarDevolucaoSemAtrasoQuandoDadosCorretos() throws LivroNotFoundException, EmprestimoNotFoundException, ClienteNaoEncontrado, LivroNaoDisponivelException {
        Emprestimo emprestimoDevolvido = emprestimoService.registrarDevolucao(
                emprestimoRegistrado.getId()
        );

        // Verifica quantidade de exemplares foi alterada ao devolver livro
        // 14 > 15
        assertEquals(
                livro.getExemplaresDisponiveisEmEstoque(),
                emprestimoDevolvido.getLivro().getExemplaresDisponiveisEmEstoque()
        );
        assertEquals(StatusEmprestimo.DEVOLVIDO, emprestimoDevolvido.getStatus());
        assertEquals(emprestimoDevolvido.getStatus(), emprestimo.getStatus());
    }

    @Test
    void deveGerarMultaCasoDevolucaoComAtraso() throws LivroNotFoundException, EmprestimoNotFoundException {
        // Data com 3 dias de atraso
        LocalDate dataDevolucaoComAtraso = LocalDate.now().minusDays(3);
        emprestimo.setDataDevolucao(dataDevolucaoComAtraso);

        Emprestimo devolvidoComMulta = emprestimoService.registrarDevolucao(
                emprestimo.getId()
        );
        assertNotNull(devolvidoComMulta.getMulta());
        assertEquals(6.0, devolvidoComMulta.getMulta().getValorCalculado());
        assertEquals(emprestimo.getStatus(), devolvidoComMulta.getStatus());
        assertEquals(StatusEmprestimo.DEVOLVIDO, devolvidoComMulta.getStatus());
    }

    @Test
    void deveLancarExcecaoCasoEmprestimoNaoExista() {
        when(emprestimoRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EmprestimoNotFoundException.class, this::execute);
    }

    private void execute() throws LivroNotFoundException, EmprestimoNotFoundException {
        emprestimoService.registrarDevolucao(99L);
    }


    @Test
    void deveLancarExcecaoCasoLivroDevolvidoNaoExista() {
        when(livroRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(LivroNotFoundException.class, () -> {
            emprestimoService.registrarDevolucao(emprestimoRegistrado.getId());
        });
    }
}