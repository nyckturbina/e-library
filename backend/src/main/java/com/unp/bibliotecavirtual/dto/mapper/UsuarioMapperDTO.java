package com.unp.bibliotecavirtual.dto.mapper;

import com.unp.bibliotecavirtual.dto.request.UsuarioRequestDTO;
import com.unp.bibliotecavirtual.dto.response.UsuarioResponseDTO;
import com.unp.bibliotecavirtual.model.Usuario;

public class UsuarioMapperDTO {
    public static Usuario toEntity(UsuarioRequestDTO usuarioRequest){
        return new Usuario(
                usuarioRequest.nome(),
                usuarioRequest.email(),
                usuarioRequest.senha()
        );
    }

    public static UsuarioResponseDTO toResponse(Usuario usuario){
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenha()
        );
    }
}
