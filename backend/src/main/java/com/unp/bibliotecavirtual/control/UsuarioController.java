package com.unp.bibliotecavirtual.control;

import com.unp.bibliotecavirtual.dto.mapper.UsuarioMapperDTO;
import com.unp.bibliotecavirtual.dto.request.UsuarioRequestDTO;
import com.unp.bibliotecavirtual.dto.response.UsuarioResponseDTO;
import com.unp.bibliotecavirtual.model.Usuario;
import com.unp.bibliotecavirtual.repository.UsuarioRepository;
import com.unp.bibliotecavirtual.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.unp.bibliotecavirtual.dto.mapper.UsuarioMapperDTO.toEntity;
import static com.unp.bibliotecavirtual.dto.mapper.UsuarioMapperDTO.toResponse;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> cadastrarUsuario(@RequestBody @Valid UsuarioRequestDTO usuarioRequest){
        Usuario usuario = toEntity(usuarioRequest);
        usuarioService.cadastrar(usuario);
        UsuarioResponseDTO usuarioResponse = toResponse(usuario);
        return ResponseEntity.status(CREATED).body(usuarioResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarUsuarioID(@PathVariable Long id){
        if (!usuarioRepository.existsById(id)){
            return ResponseEntity.status(NOT_FOUND).body("Usuário não encontrado");
        }
        Usuario usuario = usuarioService.buscarPorId(id);
        UsuarioResponseDTO usuarioResponse = toResponse(usuario);
        return ResponseEntity.status(OK).body(usuarioResponse);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> buscarTodosUsuario(){
        List<Usuario> usuarios = usuarioService.buscarTodos();
        List<UsuarioResponseDTO> usuarioResponse = usuarios.stream().map(UsuarioMapperDTO::toResponse).collect(Collectors.toUnmodifiableList());
        return ResponseEntity.ok(usuarioResponse);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody @Valid UsuarioRequestDTO usuarioRequest) {
        if (!usuarioRepository.existsById(id)){
            return ResponseEntity.status(NOT_FOUND).body("Usuário não encontrado");
        }

        Usuario usuarioAtualizado = toEntity(usuarioRequest);
        usuarioAtualizado.setId(id);
        Usuario novoUsuario = usuarioService.editar(usuarioAtualizado);
        UsuarioResponseDTO response = UsuarioMapperDTO.toResponse(novoUsuario);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Long id){
        if (!usuarioRepository.existsById(id)){
            return ResponseEntity.status(NOT_FOUND).body("Usuário não encontrado");
        }
        Usuario usuario = usuarioService.buscarPorId(id);
        usuarioService.deletar(usuario);
        return ResponseEntity.noContent().build();
    } 
}
