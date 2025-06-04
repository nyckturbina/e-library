package com.unp.bibliotecavirtual.dto.response;

public record ClienteResponseDTO(
        Long id,
        String nome,
        String cpf,
        String email,
        String senha
) {
}