package com.unp.bibliotecavirtual.dto.response.client;

public record SafeClientResponseDTO(
        Long id,
        String nome,
        String cpf,
        boolean deleted
) {
}
