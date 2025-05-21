package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.repository.LivroRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LivroServiceTest {

    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    private Livro livroValido;
    private Livro livroAtualizado;


    @BeforeEach
    void setUp() {
        livroValido = new Livro(
                "Domain-Driven Design",
                "Eric Evans",
                "Tecnologia",
                "978-8550800653",
                "Um livro sobre arquitetura de software",
                10);

        ReflectionTestUtils.setField(livroValido, "id", 1L);

        livroAtualizado = new Livro(
                "Domain-Driven Design - Edição Especial",
                livroValido.getAutor(),
                livroValido.getGenero(),
                livroValido.getIsbn()
        );
        ReflectionTestUtils.setField(livroAtualizado, "id", 1L);
    }

    @Test
    void cadastrar_deveSalvarLivroQuandoDadosValidos() {
        when(livroRepository.save(any(Livro.class))).thenReturn(livroValido);

        Livro resultado = livroService.cadastrar(livroValido);

        assertNotNull(resultado);
        assertEquals(livroValido.getTitulo(), resultado.getTitulo());

        verify(livroRepository, times(1)).save(livroValido);
    }

    @Test
    void buscarTodos_deveRetornarListaDeLivros() {
        List<Livro> livros = List.of(livroValido);
        when(livroRepository.findAll()).thenReturn(livros);

        List<Livro> resultado = livroService.buscarTodos();

        assertFalse(resultado.isEmpty());
        assertEquals(livros.size(), resultado.size());
        verify(livroRepository, times(1)).findAll();
    }

    @Test
    void buscarTodos_deveRetornarListaVaziaQuandoNenhumLivroCadastrado() {
        when(livroRepository.findAll()).thenReturn(List.of());

        List<Livro> resultado = livroService.buscarTodos();

        assertTrue(resultado.isEmpty());
        verify(livroRepository, times(1)).findAll();
    }

    @Test
    void editar_deveAtualizarLivroQuandoExistir() {
        when(livroRepository.findById(anyLong())).thenReturn(Optional.of(livroValido));
        when(livroRepository.save(any(Livro.class))).thenReturn(livroAtualizado);

        Livro resultado = livroService.editar(anyLong(), livroAtualizado);

        assertNotNull(resultado);
        assertEquals("Domain-Driven Design - Edição Especial", resultado.getTitulo());
        verify(livroRepository, times(1)).findById(anyLong());
        verify(livroRepository, times(1)).save(any(Livro.class));
    }

    @Test
    void editar_deveLancarExcecaoQuandoLivroNaoExistir() {
        when(livroRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class,
                () -> livroService.editar(anyLong(), livroAtualizado),
                "Deveria lançar exceção quando livro não existe");

        verify(livroRepository, times(1)).findById(anyLong());
        verify(livroRepository, never()).save(any());
    }

    @Test
    void deletar_deveRemoverLivroQuandoExistir() {
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livroValido));
        doNothing().when(livroRepository).delete(livroValido);

        assertDoesNotThrow(() -> livroService.deletar(livroValido));
        verify(livroRepository, times(1)).findById(1L);
        verify(livroRepository, times(1)).delete(livroValido);
    }

    @Test
    void deletar_deveLancarExcecaoQuandoLivroNaoExistir() {
        when(livroRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> livroService.deletar(livroValido),
                "Deveria lançar exceção quando livro não existe");

        verify(livroRepository, times(1)).findById(1L);
        verify(livroRepository, never()).delete(any());
    }
}