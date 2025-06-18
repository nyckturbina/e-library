package com.unp.bibliotecavirtual.dto.mapper;

import com.unp.bibliotecavirtual.dto.request.LivroRequestDTO;
import com.unp.bibliotecavirtual.dto.response.LivroResponseDTO;
import com.unp.bibliotecavirtual.model.Livro;

public class LivroMapperDTO {
    public static Livro toEntity(LivroRequestDTO request) {
        Long avaliacao = request.avaliacao() != null ? request.avaliacao() : 0L;

        return new Livro(
                request.titulo(),
                request.autor(),
                request.genero(),
                request.isbn(),
                request.sinopse(),
                request.quantidade(),
                request.numeroPaginas(),
                avaliacao
        );
    }

    public static LivroResponseDTO toResponse(Livro livro) {
        double mediaAvaliacao = 0.0;
        if (livro.getTotalAvaliacoes() != null && livro.getTotalAvaliacoes() > 0) {
            mediaAvaliacao = (double) livro.getAvaliacao() / livro.getTotalAvaliacoes();
        }

        return new LivroResponseDTO(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getGenero(),
                livro.getIsbn(),
                livro.getSinopse(),
                livro.getExemplaresDisponiveisEmEstoque(),
                livro.getNumeroPaginas(),
                mediaAvaliacao
        );
    }
}
