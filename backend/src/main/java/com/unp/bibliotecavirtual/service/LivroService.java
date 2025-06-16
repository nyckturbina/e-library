package com.unp.bibliotecavirtual.service;

import java.util.List;
import java.util.Optional;

import com.unp.bibliotecavirtual.dto.request.LivroRequestDTO;
import com.unp.bibliotecavirtual.dto.request.RateBookRequestDTO;
import com.unp.bibliotecavirtual.exceptions.LivroNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.repository.LivroRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro cadastrar(Livro livro) {
        // Verificar se livro já existe

        return livroRepository.save(livro);
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado com ID: " + id));
    }

    public Livro buscarPorIsbn(String isbn) throws LivroNotFoundException {
        return livroRepository.findByIsbn(isbn)
                .orElseThrow(LivroNotFoundException::new);
    }

    // READ (listar todos)
    public List<Livro> buscarTodos() {
        return livroRepository.findAll();
    }

    public Livro editar(Long id, Livro livroAtualizado) {
        Optional<Livro> existente = livroRepository.findById(id);

        if (existente.isEmpty()) throw new EntityNotFoundException("Livro não encontrado");

        Livro storedBook = existente.get();

        // Devido alguns livros terem sido cadastrado com esses valores vazios
        storedBook.setAvaliacao(Optional.ofNullable(storedBook.getAvaliacao()).orElse(0.0));
        storedBook.setNumeroPaginas(Optional.ofNullable(storedBook.getNumeroPaginas()).orElse(0));

        storedBook.setTitulo(livroAtualizado.getTitulo());
        storedBook.setAutor(livroAtualizado.getAutor());
        storedBook.setGenero(livroAtualizado.getGenero());
        storedBook.setIsbn(livroAtualizado.getIsbn());
        storedBook.setSinopse(livroAtualizado.getSinopse());
        storedBook.setExemplaresDisponiveisEmEstoque(livroAtualizado.getExemplaresDisponiveisEmEstoque());
        storedBook.setNumeroPaginas(livroAtualizado.getNumeroPaginas());
        storedBook.setAvaliacao(livroAtualizado.getAvaliacao());
        storedBook.setTotalAvaliacoes(livroAtualizado.getTotalAvaliacoes());

        return livroRepository.save(storedBook);
    }

    public Livro avaliarLivro(Long bookId, Double rate) throws LivroNotFoundException {
        Optional<Livro> existente = livroRepository.findById(bookId);

        if (existente.isEmpty()) throw new LivroNotFoundException("Livro não encontrado");

        Livro storedBook = existente.get();

        if (storedBook.getAvaliacao() == null || storedBook.getAvaliacao() == 0) {
            storedBook.setAvaliacao(0.0);
            storedBook.setTotalAvaliacoes(0);
        }

        if (storedBook.getTotalAvaliacoes() == null || storedBook.getTotalAvaliacoes() == 0) {
            storedBook.setAvaliacao(0.0);
            storedBook.setTotalAvaliacoes(0);
        }

        storedBook.setAvaliacao(storedBook.getAvaliacao() + rate);
        storedBook.setTotalAvaliacoes(storedBook.getTotalAvaliacoes() + 1);

        return livroRepository.save(storedBook);
    }

    public void deletar(Livro livro) {
        // Deve executar SoftDelete

        Optional<Livro> existente = livroRepository.findById(livro.getId());
        if (existente.isPresent()) {
            livroRepository.delete(livro);
        } else {
            throw new RuntimeException("Livro não encontrado para exclusão");
        }
    }

}