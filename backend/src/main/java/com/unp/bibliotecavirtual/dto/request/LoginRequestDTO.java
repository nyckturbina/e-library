package com.unp.bibliotecavirtual.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record LoginRequestDTO(
        @Email(message = "Formato de Email inválido")
        String email,

        @Size(min = 6, max = 100, message = "Tamanho de senha inválida")
        String password
) {
}
