package com.unp.bibliotecavirtual.service.livro;

import com.unp.bibliotecavirtual.exceptions.LivroNotFoundException;
import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.repository.LivroRepository;
import com.unp.bibliotecavirtual.service.LivroService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BuscarPorISBN {
    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    @Test
    void deveRetornarLivroQuandoIsbnExiste() throws LivroNotFoundException {
        // Arrange
        String isbn = "1234567890";
        Livro livroEsperado = new Livro();
        livroEsperado.setIsbn(isbn);
        livroEsperado.setTitulo("Livro de Teste");

        when(livroRepository.findByIsbn(isbn)).thenReturn(Optional.of(livroEsperado));

        // Act
        Livro livroRetornado = livroService.buscarPorIsbn(isbn);

        // Assert
        assertNotNull(livroRetornado);
        assertEquals(isbn, livroRetornado.getIsbn());
        assertEquals("Livro de Teste", livroRetornado.getTitulo());
    }

    @Test
    void deveLancarExcecaoQuandoIsbnNaoExiste() {
        // Arrange
        String isbn = "9999999999";

        when(livroRepository.findByIsbn(isbn)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(LivroNotFoundException.class, () -> {
            livroService.buscarPorIsbn(isbn);
        });
    }
}
