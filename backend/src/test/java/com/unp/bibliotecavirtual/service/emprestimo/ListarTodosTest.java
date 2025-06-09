package com.unp.bibliotecavirtual.service.emprestimo;

import com.unp.bibliotecavirtual.model.Emprestimo;
import com.unp.bibliotecavirtual.repository.EmprestimoRepository;
import com.unp.bibliotecavirtual.service.EmprestimoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static com.unp.bibliotecavirtual.service.emprestimo.utils.EmprestimoListProvider.getEmprestimosTeste;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ListarTodosTest {
    @InjectMocks
    EmprestimoService emprestimoService;

    @Mock
    EmprestimoRepository emprestimoRepository;

    List<Emprestimo> emprestimos;

    @BeforeEach
    void setUp() {
        emprestimos = getEmprestimosTeste();
        when(emprestimoService.listarTodos()).thenReturn(emprestimos);
    }

    @Test
    void deveListarTodosOsEmprestimosAtivos() {
        var emprestimosListados = emprestimoService.listarTodos();
        assertEquals(emprestimos, emprestimosListados);
    }
}
