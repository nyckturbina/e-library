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
import static com.unp.bibliotecavirtual.dto.mapper.ClienteMapperDTO.toSafeResponse;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NOT_FOUND;

/**
 * TO-DO:
 * [] Retorne o StatusCode do Erro "Cliente já existe" ao tentar cadastrar cliente duplicado
 * [] Retorne os StatusCode de Erro nos tratementos de exceção
 * [] Retornar erro caso cadastro com formato inválido
 * [] Retornar exceção + status code para caso Email já existente (unique no banco de dados)
 * [] Retornar exceção + status code para caso CPF já existente (unique no banco de dados)
 * [] Retornar exceção + status code para caso Email formato inválido (note no ClienteRequestDTO)
 * [] Retornar exceção + status code para caso CPF formato inválido (note no ClienteRequestDTO)
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
            return null; // Retorne o StatusCode do Erro "Cliente já existe" ao tentar cadastrar cliente duplicado
        }
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<?> fetchClientByCPF(@PathVariable String cpf) {
        try {
            Cliente usuario = clienteService.buscarPorCPF(cpf);
            return ResponseEntity.ok(toSafeResponse(usuario));
        } catch (ClienteNaoEncontrado ex) {
            return ResponseEntity.status(NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarClienteID(@PathVariable Long id) {
        try {
            Cliente usuario = clienteService.buscarPorId(id);
            return ResponseEntity.ok(toResponse(usuario));
        } catch (ClienteNaoEncontrado ex) {
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
        return ResponseEntity.ok(toResponse(novoCliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarCliente(@PathVariable Long id) {
        try {
            clienteService.buscarPorId(id);
            clienteService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (ClienteNaoEncontrado naoEncontrado) {
            return ResponseEntity.status(NOT_FOUND).body(naoEncontrado.getMessage());
        }
    }
}