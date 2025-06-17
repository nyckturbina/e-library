package com.unp.bibliotecavirtual.control;

import com.unp.bibliotecavirtual.dto.mapper.ClienteMapperDTO;
import com.unp.bibliotecavirtual.dto.request.LoginRequestDTO;
import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.exceptions.auth.SenhaIncorreta;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.unp.bibliotecavirtual.dto.mapper.ClienteMapperDTO.toSafeResponse;

@RestController
@RequestMapping("/login")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping
    public ResponseEntity<?> efetuarLogin(@RequestBody @Valid LoginRequestDTO loginRequest) {
        try {
            Cliente cliente = authService.efetuarLogin(loginRequest.email(), loginRequest.password());
            return ResponseEntity.ok(toSafeResponse(cliente));
        } catch (ClienteNaoEncontrado ex) {
            return ResponseEntity.status(401).body("Email não cadastrado");
        } catch (SenhaIncorreta ex) {
            return ResponseEntity.status(401).body("Senha incorreta");
        }
    }
}
