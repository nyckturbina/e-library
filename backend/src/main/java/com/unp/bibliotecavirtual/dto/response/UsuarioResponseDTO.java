package com.unp.bibliotecavirtual.dto.response;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        String senha
) {
}
