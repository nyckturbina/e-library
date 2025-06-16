package com.unp.bibliotecavirtual.dto.response;

public record LivroResponseDTO(
        Long id,
        String titulo,
        String autor,
        String genero,
        String isbn,
        String sinopse,
        Integer quantidadeTotal,
        Integer numeroPaginas,
        Double avaliacao
) {
}
