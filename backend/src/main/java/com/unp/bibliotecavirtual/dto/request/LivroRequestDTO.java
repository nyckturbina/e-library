package com.unp.bibliotecavirtual.dto.request;

public record LivroRequestDTO(
        String titulo,
        String autor,
        String genero,
        String isbn,
        String sinopse,
        Integer quantidade
) {
}
