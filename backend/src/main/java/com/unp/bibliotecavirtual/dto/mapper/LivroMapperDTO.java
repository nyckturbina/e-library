package com.unp.bibliotecavirtual.dto.mapper;

import com.unp.bibliotecavirtual.dto.request.LivroRequestDTO;
import com.unp.bibliotecavirtual.dto.response.LivroResponseDTO;
import com.unp.bibliotecavirtual.model.Livro;

public class LivroMapperDTO {
    public static Livro toEntity(LivroRequestDTO request) {
        return new Livro(
                request.titulo(),
                request.autor(),
                request.genero(),
                request.isbn(),
                request.sinopse(),
                request.quantidade()
        );
    }

    public static LivroResponseDTO toResponse(Livro livro) {
        return new LivroResponseDTO(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getGenero(),
                livro.getIsbn(),
                livro.getSinopse(),
                livro.getExemplaresDisponiveisEmEstoque()
        );
    }
}
