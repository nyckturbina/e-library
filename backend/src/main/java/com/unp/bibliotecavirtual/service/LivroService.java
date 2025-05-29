package com.unp.bibliotecavirtual.service;

import java.util.List;
import java.util.Optional;

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

    // READ (listar todos)
    public List<Livro> buscarTodos() {
        return livroRepository.findAll();
    }

    public Livro editar(Long id, Livro livroAtualizado) {
        Optional<Livro> existente = livroRepository.findById(id);

        if (existente.isEmpty()) throw new EntityNotFoundException("Livro não encontrado");

        Livro storedBook = existente.get();

        storedBook.setTitulo(livroAtualizado.getTitulo());
        storedBook.setAutor(livroAtualizado.getAutor());
        storedBook.setGenero(livroAtualizado.getGenero());
        storedBook.setIsbn(livroAtualizado.getIsbn());
        storedBook.setSinopse(livroAtualizado.getSinopse());
        storedBook.setQuantidadeTotal(livroAtualizado.getQuantidadeTotal());

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