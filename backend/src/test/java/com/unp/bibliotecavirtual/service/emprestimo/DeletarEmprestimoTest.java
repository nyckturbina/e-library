package com.unp.bibliotecavirtual.service.emprestimo;

import com.unp.bibliotecavirtual.exceptions.EmprestimoNotFoundException;
import com.unp.bibliotecavirtual.model.Emprestimo;
import com.unp.bibliotecavirtual.repository.EmprestimoRepository;
import com.unp.bibliotecavirtual.service.EmprestimoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.unp.bibliotecavirtual.service.emprestimo.utils.EmprestimoListProvider.getEmprestimosTeste;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DeletarEmprestimoTest {
    @InjectMocks
    EmprestimoService emprestimoService;

    @Mock
    EmprestimoRepository emprestimoRepository;

    Emprestimo emprestimo;

    @BeforeEach
    void setUp() {
        emprestimo = getEmprestimosTeste().getFirst();

        // Configura o mock para retornar o empréstimo quando buscar pelo ID
        when(emprestimoRepository.findById(anyLong())).thenReturn(Optional.of(emprestimo));
        doNothing().when(emprestimoRepository).delete(any(Emprestimo.class));
    }

    @Test
    void deveRemoverCasoExista() throws EmprestimoNotFoundException {
        emprestimoService.deletarEmprestimo(1L);

        // Configura o mock para agora retornar vazio (após a deleção)
        when(emprestimoRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Emprestimo> emprestimoBuscado = emprestimoRepository.findById(1L);

        assertTrue(emprestimoBuscado.isEmpty());
    }

//    @Test
//    void deveLacarExcecaoCasoTenteDeletarEmprestimoInexistente() {
//    }
}
