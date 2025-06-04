package com.unp.bibliotecavirtual.control;

import com.unp.bibliotecavirtual.dto.mapper.ClienteMapperDTO;
import com.unp.bibliotecavirtual.dto.request.ClienteRequestDTO;
import com.unp.bibliotecavirtual.dto.response.ClienteResponseDTO;
import com.unp.bibliotecavirtual.exceptions.ClienteExistenteException;
import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.repository.ClienteRepository;
import com.unp.bibliotecavirtual.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.unp.bibliotecavirtual.dto.mapper.ClienteMapperDTO.toResponse;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NOT_FOUND;

/**
 * TO-DO:
 * [] Retorne os StatusCode de Erro nos tratementos de exceção
 * [] Retornar erro caso cadastro com formato inválido
 * [] Chamar serviço de cadastro
 **/
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @Autowired
    ClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> cadastrarCliente(@RequestBody @Valid ClienteRequestDTO clienteRequest) {
        Cliente cliente = ClienteMapperDTO.toEntity(clienteRequest);

        try {
            clienteService.cadastrar(cliente);
            ClienteResponseDTO usuarioResponse = toResponse(cliente);
            return ResponseEntity.status(CREATED).body(usuarioResponse);
        } catch (ClienteExistenteException e) {
            System.out.println(e.getStackTrace());
            return null; // Retorne o StatusCode do Erro
        }


    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarClienteID(@PathVariable Long id){
        try {
            Cliente usuario = clienteService.buscarPorId(id);
            return ResponseEntity.ok(ClienteMapperDTO.toResponse(usuario));
        }catch (ClienteNaoEncontrado ex){
            return ResponseEntity.status(NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> buscarTodosCliente() {
        List<Cliente> usuarios = clienteService.buscarTodos();
        List<ClienteResponseDTO> usuarioResponse = usuarios.stream().map(ClienteMapperDTO::toResponse).collect(Collectors.toUnmodifiableList());
        return ResponseEntity.ok(usuarioResponse);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ClienteResponseDTO> editar(@PathVariable Long id, @RequestBody @Valid ClienteRequestDTO usuarioRequest) {
        Cliente usuarioAtualizado = ClienteMapperDTO.toEntity(usuarioRequest);
        Cliente novoCliente = clienteService.editar(id, usuarioAtualizado);
        return ResponseEntity.ok(ClienteMapperDTO.toResponse(novoCliente));
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deletarCliente(@PathVariable Long id){
//        try {
//            clienteService.buscarPorId(id);
//            return ResponseEntity.noContent().build();
//        }catch (ClienteNaoEncontrado naoEncontrado){
//            return ResponseEntity.status(NOT_FOUND).body(naoEncontrado.getMessage());
//        }
//    }
}