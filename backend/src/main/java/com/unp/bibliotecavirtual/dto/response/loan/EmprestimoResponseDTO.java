package com.unp.bibliotecavirtual.dto.response.loan;

import com.unp.bibliotecavirtual.model.enums.StatusEmprestimo;

import java.time.LocalDate;

public record EmprestimoResponseDTO(
        Long id,
        ClientInfo clienteInfo,
        BookInfo bookInfo,
        LocalDate dataEmprestimo,
        LocalDate dataDevolucao,
        Double valorMulta,
        StatusEmprestimo statusEmprestimo
) {
}
