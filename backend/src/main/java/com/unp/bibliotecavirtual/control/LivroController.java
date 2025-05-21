package com.unp.bibliotecavirtual.control;

import com.unp.bibliotecavirtual.dto.mapper.LivroMapperDTO;
import com.unp.bibliotecavirtual.dto.request.LivroRequestDTO;
import com.unp.bibliotecavirtual.dto.response.LivroResponseDTO;
import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.unp.bibliotecavirtual.dto.mapper.LivroMapperDTO.*;
import static com.unp.bibliotecavirtual.dto.mapper.LivroMapperDTO.toEntity;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/livros")
public class LivroController {
    @Autowired
    LivroService service;

    @PostMapping
    public ResponseEntity<LivroResponseDTO> cadastrarLivros(@RequestBody @Valid LivroRequestDTO request) {
        Livro livro = toEntity(request);
        service.cadastrar(livro);
        LivroResponseDTO livroRespose = toResponse(livro);
        return ResponseEntity.status(CREATED).body(livroRespose);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroResponseDTO> buscarPorId(@PathVariable Long id) {
        Livro livro = service.buscarPorId(id);
        LivroResponseDTO response = toResponse(livro);
        return ResponseEntity.status(FOUND).body(response);
    }

    @GetMapping
    public ResponseEntity<List<LivroResponseDTO>> buscarTodos() {
        List<Livro> livros = service.buscarTodos();
        List<LivroResponseDTO> response = livros.stream()
                .map(LivroMapperDTO::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<LivroResponseDTO> editar(
            @PathVariable Long id, @RequestBody @Valid LivroRequestDTO request
    ) {
        Livro livroAtualizado = toEntity(request);

        Livro novoLivro = service.editar(id, livroAtualizado);
        LivroResponseDTO response = toResponse(novoLivro);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Livro livro = service.buscarPorId(id); // Verifica se existe
        service.deletar(livro);
        return ResponseEntity.noContent().build();
    }
}