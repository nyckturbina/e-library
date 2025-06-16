package com.unp.bibliotecavirtual.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record RateBookRequestDTO(
        @NotNull(message = "O ID do livro é obrigatório")
        Long bookId,

        @NotNull(message = "A avaliação é obrigatória")
        @DecimalMin(value = "1.0", message = "A avaliação mínima permitida é 1")
        @DecimalMax(value = "10.0", message = "A avaliação máxima permitida é 10")
        Double rate
) {
}

