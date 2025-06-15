package com.unp.bibliotecavirtual.dto.mapper;

import com.unp.bibliotecavirtual.dto.request.ClienteRequestDTO;
import com.unp.bibliotecavirtual.dto.response.ClienteResponseDTO;
import com.unp.bibliotecavirtual.dto.response.client.SafeClientResponseDTO;
import com.unp.bibliotecavirtual.model.Cliente;

public class ClienteMapperDTO {
    public static Cliente toEntity(ClienteRequestDTO request) {
        return new Cliente(
                request.nome(),
                request.cpf(),
                request.email(),
                request.senha()
        );
    }

    public static ClienteResponseDTO toResponse(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getCpf(),
                cliente.getEmail(),
                cliente.getSenha(),
                cliente.isDeleted()
        );
    }

    public static SafeClientResponseDTO toSafeResponse(Cliente cliente) {
        return new SafeClientResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getCpf(),
                cliente.isDeleted()
        );
    }
}