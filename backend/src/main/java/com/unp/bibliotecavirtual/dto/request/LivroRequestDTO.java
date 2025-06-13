package com.unp.bibliotecavirtual.dto.request;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.ISBN;

public record LivroRequestDTO(
        @NotBlank(message = "O título é obrigatório")
        @Size(min = 2, max = 100, message = "O título deve ter entre 2 e 100 caracteres")
        String titulo,

        @NotBlank(message = "O autor é obrigatório")
        @Size(min = 3, max = 50, message = "O nome do autor deve ter entre 3 e 50 caracteres")
        String autor,

        // @NotBlank(message = "O gênero é obrigatório")
        @Size(max = 30, message = "O gênero deve ter no máximo 30 caracteres")
        String genero,

        @NotBlank(message = "O ISBN é obrigatório")
        @Size(min = 10, max = 13, message = "O ISBN deve ter entre 10 e 13 caracteres")
//        @ISBN(message = "ISBN inválido (formato aceito: ISBN-10 ou ISBN-13)") // International Standard Book Number
        String isbn,

        @Size(max = 500, message = "A sinopse deve ter no máximo 500 caracteres")
        String sinopse,

        @NotNull(message = "A quantidade é obrigatória")
        @PositiveOrZero(message = "A quantidade não pode ser negativa")
        @Max(value = 1000, message = "A quantidade máxima permitida é 1000")
        Integer quantidade,

        @NotNull(message = "O número de páginas é obrigatório")
        @PositiveOrZero(message = "O número de páginas não pode ser negativo")
        @Max(value = 1_000_000, message = "O número de páginas máxima permitido é 1.000.000")
        Integer numeroPaginas,

        @PositiveOrZero(message = "A avaliação não pode ser negativa")
        @Max(value = 10, message = "A avaliação máxima permitida é 10")
        Integer avaliacao
) {
}