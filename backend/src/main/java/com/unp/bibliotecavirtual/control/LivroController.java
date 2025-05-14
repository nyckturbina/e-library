package com.unp.bibliotecavirtual.control;

import com.unp.bibliotecavirtual.dto.mapper.LivroMapperDTO;
import com.unp.bibliotecavirtual.dto.request.LivroRequestDTO;
import com.unp.bibliotecavirtual.dto.response.LivroResponseDTO;
import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.unp.bibliotecavirtual.dto.mapper.LivroMapperDTO.toEntity;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/livros")
public class LivroController {
    @Autowired
    LivroService service;

    @PostMapping
    public ResponseEntity<LivroResponseDTO> cadastrarLivros(@RequestBody LivroRequestDTO request) {
        Livro livro = toEntity(request);

        service.cadastrar(livro);

        LivroResponseDTO livroRespose = LivroMapperDTO.toResponse(livro);

        return ResponseEntity
                .status(CREATED)
                .body(livroRespose);
    }
}
