package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro cadastrar(Livro livro) {
        // Validar se não é nulo
        if (livro == null) {
            throw new NullPointerException("Livro não pode ser nulo");
        }

        // Validar se já existe no estoque

        return livroRepository.save(livro);
    }

    // READ (listar todos)
    public List<Livro> buscarTodos() {
        return livroRepository.findAll();
    }

    public Livro editar(Livro livro) {
        // Verificar se todos os campos obrigatórios estão sendo preenchidos

        Optional<Livro> existente = livroRepository.findById(livro.getId());
        if (existente.isPresent()) {
            return livroRepository.save(livro); // atualiza os dados
        } else {
            throw new RuntimeException("Livro não encontrado para edição");
        }
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