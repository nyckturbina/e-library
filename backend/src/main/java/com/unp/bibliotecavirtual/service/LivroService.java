package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.unp.bibliotecavirtual.service.LivroValidator.validarBuscaPorId;
import static com.unp.bibliotecavirtual.service.LivroValidator.validarCadastro;
import static com.unp.bibliotecavirtual.service.LivroValidator.validarIdNulo;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro cadastrar(Livro livro) {
        // Validar se não é nulo
        // Validar se já existe no estoque

        validarCadastro(livro);

        return livroRepository.save(livro);
    }

    public Livro buscarPorId(Long id) {
        validarBuscaPorId(id);
        return livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado com ID: " + id));
    }

    // READ (listar todos)
    public List<Livro> buscarTodos() {
        return livroRepository.findAll();
    }

    public Livro editar(Livro livro) {
        // Verificar se todos os campos obrigatórios estão sendo preenchidos
        validarIdNulo(livro);

        Optional<Livro> existente = livroRepository.findById(livro.getId());
        if (existente.isPresent()) {
            return livroRepository.save(livro); // atualiza os dados
        } else {
            throw new RuntimeException("Livro não encontrado para edição");
        }
    }

    public void deletar(Livro livro) {
        // Deve executar SoftDelete
        validarIdNulo(livro);

        Optional<Livro> existente = livroRepository.findById(livro.getId());
        if (existente.isPresent()) {
            livroRepository.delete(livro);
        } else {
            throw new RuntimeException("Livro não encontrado para exclusão");
        }
    }
}