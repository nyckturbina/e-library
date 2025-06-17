package com.unp.bibliotecavirtual.dto.mapper;

import com.unp.bibliotecavirtual.dto.request.EmprestimoRequestDTO;
import com.unp.bibliotecavirtual.dto.response.loan.BookInfo;
import com.unp.bibliotecavirtual.dto.response.loan.ClientInfo;
import com.unp.bibliotecavirtual.dto.response.loan.EmprestimoResponseDTO;
import com.unp.bibliotecavirtual.model.Emprestimo;

public class EmprestimoMapperDTO {
    public static Emprestimo toEntity(EmprestimoRequestDTO request) {
        Emprestimo emprestimo = new Emprestimo();
        return emprestimo;
    }

    public static EmprestimoResponseDTO toResponse(Emprestimo emprestimo) {
        return new EmprestimoResponseDTO(
                emprestimo.getId(),
                new ClientInfo(
                        emprestimo.getCliente().getId(),
                        emprestimo.getCliente().getNome(),
                        emprestimo.getCliente().getCpf()
                ),
                new BookInfo(
                        emprestimo.getLivro().getId(),
                        emprestimo.getLivro().getTitulo(),
                        emprestimo.getLivro().getIsbn()
                ),
                emprestimo.getDataEmprestimo(),
                emprestimo.getPrazoDevolucao(),
                emprestimo.getMulta() != null ? emprestimo.getMulta().getValorCalculado() : 0,
                emprestimo.getStatus()

        );
    }
}
