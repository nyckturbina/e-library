package com.unp.bibliotecavirtual.control;

import com.unp.bibliotecavirtual.dto.request.EmprestimoRequestDTO;
import com.unp.bibliotecavirtual.dto.response.loan.EmprestimoResponseDTO;
import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.exceptions.EmprestimoNotFoundException;
import com.unp.bibliotecavirtual.exceptions.LivroNaoDisponivelException;
import com.unp.bibliotecavirtual.exceptions.LivroNotFoundException;
import com.unp.bibliotecavirtual.model.Emprestimo;
import com.unp.bibliotecavirtual.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.unp.bibliotecavirtual.dto.mapper.EmprestimoMapperDTO.toResponse;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    @Autowired
    EmprestimoService emprestimoService;

    @PostMapping
    public ResponseEntity<?> registrarEmprestimo(@RequestBody EmprestimoRequestDTO request) {
        try {
            Emprestimo emprestimo = emprestimoService.registrarEmprestimo(request.livroId(), request.clienteId());
            EmprestimoResponseDTO response = toResponse(emprestimo);
            return ResponseEntity.ok(response);
        } catch (LivroNaoDisponivelException | LivroNotFoundException | ClienteNaoEncontrado exception) {
            return ResponseEntity.status(NOT_FOUND).body(exception.getMessage());
        }
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<?> buscarEmprestimoPorCliente(@PathVariable Long clienteId) {
        try {
            List<Emprestimo> emprestimos = emprestimoService.buscarEmprestimosPorCliente(clienteId);
            List<EmprestimoResponseDTO> emprestimosResponseDTOS = new ArrayList<>();

            emprestimos.forEach(emprestimo -> emprestimosResponseDTOS.add(toResponse(emprestimo)));
            return ResponseEntity.ok(emprestimosResponseDTOS);
        } catch (ClienteNaoEncontrado exception) {
            return ResponseEntity.status(NOT_FOUND).body(exception.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<EmprestimoResponseDTO>> listarTodos() {
        List<Emprestimo> emprestimos = emprestimoService.listarTodos();
        List<EmprestimoResponseDTO> emprestimosResponseDTOS = new ArrayList<>();

        emprestimos.forEach(emprestimo -> emprestimosResponseDTOS.add(toResponse(emprestimo)));
        return ResponseEntity.ok(emprestimosResponseDTOS);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> registrarDevolucao(@PathVariable Long id) {
        try {
            Emprestimo emprestimo = emprestimoService.registrarDevolucao(id);
            EmprestimoResponseDTO response = toResponse(emprestimo);
            return ResponseEntity.ok().body(response);
        } catch (LivroNotFoundException | EmprestimoNotFoundException exception) {
            return ResponseEntity.status(NOT_FOUND).body(exception.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarEmprestimo(@PathVariable Long id) {
        try {
            emprestimoService.deletarEmprestimo(id);
            return ResponseEntity.noContent().build();
        } catch (EmprestimoNotFoundException exception) {
            return ResponseEntity.status(NOT_FOUND).body(exception.getMessage());
        }
    }
}
