package com.unp.biblioteca.virtual.service;

import com.unp.biblioteca.Repositorio.LivroRepository;
import com.unp.biblioteca.virtual.Modelo.Livro;
import com.unp.biblioteca.virtual.validation.LivroValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private LivroValidator livroValidator;

    // CREATE
    public Livro cadastrar(Livro livro) {
        livroValidator.validarCadastro(livro);
        return livroRepository.save(livro);
    }

    // READ
    public List<Livro> buscarTodos() {
        return livroRepository.findAll();
    }

    public Livro buscarPorId(Long id) {
        livroValidator.validarBusca(id);
        return livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado com ID: " + id));
    }

    // UPDATE
    public Livro editar(Livro livro) {
        livroValidator.validarAtualizacao(livro);
        Optional<Livro> existente = livroRepository.findById(livro.getId());
        if (existente.isPresent()) {
            return livroRepository.save(livro);
        } else {
            throw new RuntimeException("Livro não encontrado para edição");
        }
    }

    // DELETE
    public void deletar(Livro livro) {
        livroValidator.validarExclusao(livro);
        Optional<Livro> existente = livroRepository.findById(livro.getId());
        if (existente.isPresent()) {
            livroRepository.delete(livro);
        } else {
            throw new RuntimeException("Livro não encontrado para exclusão");
        }
    }
}
